<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Salesforce\HttpFunctions;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Salesforce\TokenManager;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\DTO\SalesforceAccountDto;
use App\DTO\SalesforceContactDto;

class SalesforceController extends AbstractController {

    private TokenManager $tokenManager;
    private Security $security;
    private SerializerInterface $serializer;
    private ValidatorInterface $validator;
    private EntityManagerInterface $entityManager;
    private HttpFunctions $http;

    public function __construct(
            TokenManager $tokenManager, 
            Security $security, 
            SerializerInterface $serializer, 
            ValidatorInterface $validator,
            EntityManagerInterface $entityManager,
            HttpFunctions $http,
    )
    {
        $this->tokenManager = $tokenManager;
        $this->security = $security;
        $this->serializer = $serializer;
        $this->validator = $validator;
        $this->entityManager = $entityManager;
        $this->http = $http;
    }

    #[Route('/api/salesforce/account', name: 'app_salesforce_account_create', methods: ['POST'])]
    public function createAccount(Request $request) {
        $userData = $this->security->getUser();
        if(!$userData)
            return new JsonResponse(['error' => 'User not found!'], Response::HTTP_NOT_FOUND);

        $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $userData->getUserIdentifier()]);
        if($user->getSalesAccountId())
            return new JsonResponse(['error' => 'User already have Salesforce Account!'], Response::HTTP_BAD_REQUEST);

        $json = $request->getContent();
        try {
            $accountDto = $this->serializer->deserialize($json, SalesforceAccountDto::class, 'json');
        } catch (\Exception $e) {
            return new JsonResponse([
                'error' => 'Invalid JSON data.',
                'details' => $e->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }

        $errors = $this->validator->validate($accountDto) ?: [];
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()] = $error->getMessage();
            }
            return new JsonResponse(['errors' => $errorMessages], Response::HTTP_BAD_REQUEST);
        }

        $accountData = $this->makeAccountData($accountDto);
        $json = json_encode($accountData);
        $accountId = $this->http->saveAccount( $json);
        
        if(!$accountId)
            return new JsonResponse(['error' => 'Cant create'], Response::HTTP_SERVICE_UNAVAILABLE);
        $this->saveAccountId($user, $accountId);

        return new JsonResponse(['success' => 'Created'], Response::HTTP_OK);
    }

    #[Route('/api/salesforce/account', name: 'app_salesforce_account_update', methods: ['PATCH'])]
    public function updateAccount(Request $request) {
        $userData = $this->security->getUser();
        if(!$userData)
            return new JsonResponse(['error' => 'User not found!'], Response::HTTP_NOT_FOUND);

        $json = $request->getContent();
        try {
            $accountDto = $this->serializer->deserialize($json, SalesforceAccountDto::class, 'json');
        } catch (\Exception $e) {
            return new JsonResponse([
                'error' => 'Invalid JSON data.',
                'details' => $e->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }

        $errors = $this->validator->validate($accountDto) ?: [];
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()] = $error->getMessage();
            }
            return new JsonResponse(['errors' => $errorMessages], Response::HTTP_BAD_REQUEST);
        }

        if(!$accountDto->accountId)
            return new JsonResponse(['error' => 'To update you must provide Account Id'], Response::HTTP_BAD_REQUEST);
        
        $accountData = $this->makeAccountData($accountDto);
        $json = json_encode($accountData);
        $accountId = $accountDto->accountId;

        $this->http->updateAccount($accountId, $json);

        return new JsonResponse(['success' => 'Updated!'], Response::HTTP_OK);
    }

    #[Route('/api/salesforce/account', name: 'app_salesforce_account_get', methods: ['GET'])]
    public function getFormAccountInfo() 
    {
        $currentUser = $this->security->getUser();
        if(!$currentUser)
            return new JsonResponse(['error' => 'User not found!'], Response::HTTP_NOT_FOUND);

        $user = $this->entityManager->getRepository(User::class)->findOneBy(criteria: ['email' => $currentUser->getUserIdentifier()]);
        
        $salesAccountId = $user->getSalesAccountId();

        if($salesAccountId){
            $accountRecords = $this->http->getAccountInfo($salesAccountId)->records;
            if(!$accountRecords || !$accountRecords[0])
                return new JsonResponse(['error' => 'No record found'], Response::HTTP_NOT_FOUND);
            return new JsonResponse($accountRecords[0], Response::HTTP_OK);
        }
        return new JsonResponse([], Response::HTTP_OK);
    }

    #[Route('/api/salesforce/contact', name: 'app_salesforce_contact_create', methods: ['POST'])]
    public function createContact(Request $request) {
        $userData = $this->security->getUser();
        if(!$userData)
            return new JsonResponse(['error' => 'User not found!'], Response::HTTP_NOT_FOUND);

        $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $userData->getUserIdentifier()]);
        if(!$user->getSalesAccountId())
            return new JsonResponse(['error' => 'User must have an Account to create Contact!'], Response::HTTP_BAD_REQUEST);

        $json = $request->getContent();
        try {
            $contactDto = $this->serializer->deserialize($json, SalesforceContactDto::class, 'json');
        } catch (\Exception $e) {
            return new JsonResponse([
                'error' => 'Invalid JSON data.',
                'details' => $e->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }

        $errors = $this->validator->validate($contactDto) ?: [];
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()] = $error->getMessage();
            }
            return new JsonResponse(['errors' => $errorMessages], Response::HTTP_BAD_REQUEST);
        }

        $contactData = $this->makeContactData($contactDto);
        $contactData['AccountId'] =$user->getSalesAccountId();

        $json = json_encode($contactData);
        $contactId = $this->http->saveContact($json);

        return new JsonResponse(['success' => 'Created'], Response::HTTP_OK);
    }

    #[Route('/api/salesforce/contact', name: 'app_salesforce_contact_update', methods: ['PATCH'])]
    public function updateContact(Request $request) {
        $userData = $this->security->getUser();
        if(!$userData)
            return new JsonResponse(['error' => 'User not found!'], Response::HTTP_NOT_FOUND);

        $json = $request->getContent();
        try {
            $contactDto = $this->serializer->deserialize($json, SalesforceContactDto::class, 'json');
        } catch (\Exception $e) {
            return new JsonResponse([
                'error' => 'Invalid JSON data.',
                'details' => $e->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }

        $errors = $this->validator->validate($contactDto) ?: [];
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()] = $error->getMessage();
            }
            return new JsonResponse(['errors' => $errorMessages], Response::HTTP_BAD_REQUEST);
        }

        if(!$contactDto->contactId)
            return new  JsonResponse(['error' => 'To update contact you need to provide contact Id.']);

        $contactData = $this->makeContactData($contactDto);
        $json = json_encode($contactData);
        $contactId = $contactDto->contactId;
        $this->http->updateContact($contactId, $json);

        return new JsonResponse(['success' => 'Updated!'], Response::HTTP_OK);
    }

    #[Route('/api/salesforce/contact', name: 'app_salesforce_contact_get', methods: ['GET'])]
    public function getFormContactInfo() 
    {
        $currentUser = $this->security->getUser();
        if(!$currentUser)
            return new JsonResponse(['error' => 'User not found!'], Response::HTTP_NOT_FOUND);

        $user = $this->entityManager->getRepository(User::class)->findOneBy(criteria: ['email' => $currentUser->getUserIdentifier()]);
        
        $salesAccountId = $user->getSalesAccountId();

        if($salesAccountId){
            $contactRecords = $this->http->getContactInfo($salesAccountId)->records;
            if(!$contactRecords || !$contactRecords[0])
                return new JsonResponse(['error' => 'No record found'], Response::HTTP_NOT_FOUND);
            return new JsonResponse($contactRecords[0], Response::HTTP_OK);
        }
        return new JsonResponse([], Response::HTTP_OK);
    }

    public function saveAccountId(User $user, string $accountId)
    {
        $user->setSalesAccountId($accountId);
        $this->entityManager->persist($user);
        $this->entityManager->flush();
    }

    public function makeAccountData(SalesforceAccountDto $form)
    {
        $account = [
            "Name" => $form->accountName,
            "AccountNumber" => $form->accountNumber || null,
            "AnnualRevenue" => $form->annualRevenue || null,
            "Phone" => $form->accountPhone || null,
            "Fax" => $form->accountFax || null,
            "Website" => $form->accountWebsite || null,
            "Description" => $form->accountDescription || null
        ];
        return $account;
    }

    public function makeContactData(SalesforceContactDto $form)
    {
        $account = [
            "FirstName" => $form->contactFirstName || null,
            "LastName" => $form->contactLastName,
            "Email" => $form->contactEmail || null,
            "MobilePhone" => $form->contactMobile,
            "Phone" => $form->contactPhone || null,
            "HomePhone" => $form->contactHomePhone || null,
            "Birthdate" => $form->birthDate || null,
            "Description" => $form->contactDescription || null,
            "Department" => $form->department || null
        ];
        return $account;
    }


    public function validateData()
    {

    }

}