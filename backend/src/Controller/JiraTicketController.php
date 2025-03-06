<?php

namespace App\Controller;

use App\Entity\User;
use Jira\HttpFunctions;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\DTO\TicketDto;

class JiraTicketController extends AbstractController {
    private Security $security;
    private SerializerInterface $serializer;
    private ValidatorInterface $validator;
    private EntityManagerInterface $entityManager;
    private HttpFunctions $http;

    public function __construct(
            Security $security, 
            SerializerInterface $serializer, 
            ValidatorInterface $validator,
            EntityManagerInterface $entityManager,
            HttpFunctions $http,
    )
    {
        $this->security = $security;
        $this->serializer = $serializer;
        $this->validator = $validator;
        $this->entityManager = $entityManager;
        $this->http = $http;
    }

    #[Route('/api/jira/user/tickets', name: 'app_jira_tickets', methods: ['GET'])]
    public function getJiraTickets() 
    {
        $currentUser = $this->security->getUser();
        if(!$currentUser)
            return new JsonResponse(['error' => 'User not found!'], Response::HTTP_NOT_FOUND);

        $email = $currentUser->getUserIdentifier();

        $tickets = $this->http->getUserTickets($email);

        return new JsonResponse($tickets, Response::HTTP_OK);
    }

    #[Route('/api/jira/user/ticket', name: 'app_jira_ticket', methods: ['GET'])]
    public function getJiraTicket(Request $request) 
    {
        $currentUser = $this->security->getUser();
        if(!$currentUser)
            return new JsonResponse(['error' => 'User not found!'], Response::HTTP_NOT_FOUND);

        $email = $currentUser->getUserIdentifier();

        $ticketId = $request->query->get('ticket');

        if(!$ticketId)
            return new JsonResponse(['error' => 'Ticket should be present as query!'], Response::HTTP_BAD_REQUEST);

        $ticket = $this->http->getTicket($ticketId);

        return new JsonResponse($ticket, Response::HTTP_OK);
    }

    #[Route('/api/jira/ticket', name: 'app_jira_ticket_create', methods: ['POST'])]
    public function createAccount(Request $request) {
        $userData = $this->security->getUser();
        if(!$userData)
            return new JsonResponse(['error' => 'User not found!'], Response::HTTP_NOT_FOUND);

        $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $userData->getUserIdentifier()]);

        $json = $request->getContent();
        try {
            $ticketDto = $this->serializer->deserialize($json, TicketDto::class, 'json');
        } catch (\Exception $e) {
            return new JsonResponse([
                'error' => 'Invalid JSON data.',
                'details' => $e->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }

        $errors = $this->validator->validate($ticketDto) ?: [];
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()] = $error->getMessage();
            }
            return new JsonResponse(['errors' => $errorMessages], Response::HTTP_BAD_REQUEST);
        }

        $email = $user->getEmail();

        $jiraUser = $this->http->getUser($email);
        if(!$jiraUser) 
            $jiraUser = $this->createJiraUser($email, $user->getFullName());

        $accountId = $jiraUser->accountId;
        
        if(!$accountId)
            return new JsonResponse(['error' => 'Account Id is not available!'], Response::HTTP_BAD_REQUEST);

        $data = $this->makeTicketData($ticketDto, $accountId);
        $json = json_encode($data);
        $resp = $this->http->createTicket($json);

        return new JsonResponse(['success' => 'Created', "resp" => $resp], Response::HTTP_OK);
    }



    public function createJiraUser(string $email, string $fullName)
    {
        $data = [
            "emailAddress" => $email,
            "displayName" => $fullName,
            "products" => [] 
        ];
        $json = json_encode($data);
        $resp = $this->http->createUser($json);
        return $resp;
    }

      public function makeTicketData(TicketDto $form, string $accountId)
    {
        $ticket = [
            "fields" => [
                "project" => [
                    "key" => "KAN"
                ],
                "priority" => [
                    "name" => $form->priority,
                ],
                "summary" => $form->summary,
                "customfield_10039" => $form->link,
                "issuetype" => [
                    "name" => "Task"
                ],
                "reporter" => [
                    "id" => $accountId
                ]
            ]    
        ];
        if($form->templateName){
            $ticket['fields']['"customfield_10040'] = [
                "type" => "doc",
                "version" => 1,
                "content" => [
                    [
                        "type" => "paragraph",
                        "content" => [
                            [
                                "type" => "text",
                                "text" => $form->templateName
                            ]
                        ],
                    ]
                ]
            ];
        }
        return $ticket;
    }

}