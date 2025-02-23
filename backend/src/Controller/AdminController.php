<?php

namespace App\Controller;

use App\Enum\UserRole;
use App\Entity\User;
use App\Enum\UserStatus;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use App\DTO\UserIdDto;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

final class AdminController extends AbstractController
{
    private Security $security;
    private EntityManagerInterface $entityManager;
    private SerializerInterface $serializer;
    private ValidatorInterface $validator;

    public function __construct(
        Security $security,
        EntityManagerInterface $entityManager,
        SerializerInterface $serializer,
        ValidatorInterface $validator,
    ) {
        $this->security = $security;
        $this->entityManager = $entityManager;
        $this->serializer = $serializer;
        $this->validator = $validator;
    }

    #[Route('/api/admin/users', name: 'app_admin_users_block', methods: ['POST'])]
    public function index(Request $request): Response
    {
        $userIdentifier = $this->security->getUser()->getUserIdentifier();
        $currentUser = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $userIdentifier]);

        if(!in_array(UserRole::Admin->value, $currentUser->getRoles())){
            return new JsonResponse(['error' => 'You must have admin role to perform this operation!'], Response::HTTP_FORBIDDEN);
        }

        $json = $request->getContent();
        try {
            $usersDto = $this->serializer->deserialize($json, UserIdDto::class, 'json');
        } catch (\Exception $e) {
            return new JsonResponse([
                'error' => 'Invalid JSON data.',
                'details' => $e->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }

        $errors = $this->validator->validate($usersDto) ?: [];
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()] = $error->getMessage();
            }
            return new JsonResponse(['errors' => $errorMessages], Response::HTTP_BAD_REQUEST);
        }

        $userIds = $usersDto->users;
        
        // dd($currentUser->getId(), $userIds);
        $action = $usersDto->action;
        foreach ($userIds as $userId) {
            $user = $this->entityManager->getRepository(User::class)->findOneBy(['id' => $userId]);
            if($user){
                if($action === 'block'){
                    $user->setStatus(UserStatus::Blocked);
                    $this->entityManager->persist($user);
                } else if($action === 'unblock') {
                    $user->setStatus(UserStatus::Active);
                    $this->entityManager->persist($user);
                } else if($action === 'delete') {
                    $this->entityManager->remove($user);
                } else if($action === 'admin-down'){
                    if(in_array(UserRole::Admin->value, $user->getRoles())){
                        $user->setRoles([UserRole::User->value]);
                        $this->entityManager->persist($user);
                    }
                } else if($action === 'admin-up'){
                    if(!in_array(UserRole::Admin->value, $user->getRoles())){
                        $user->setRoles([UserRole::User->value, UserRole::Admin->value]);
                        $this->entityManager->persist($user);
                    }   
                }
                $this->entityManager->flush();
            }
        }

        if($action === 'admin-down' && in_array($currentUser->getId(), $userIds)){
            return $this->redirectToRoute('api_token_invalidate');
        }

        return new JsonResponse(['message' => "Users $action ed!"], Response::HTTP_OK);
    }
}
