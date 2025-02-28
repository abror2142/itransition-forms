<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Response;

final class AuthController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    #[Route('/api/user', name: 'app_auth', methods: ['GET'])]
    public function user(Request $request): JsonResponse
    {
        $userData = $this->getUser();
        $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $userData->getUserIdentifier()]);
        
        if (!$user)
            return new JsonResponse(['message' => 'User not found!'], Response::HTTP_NOT_FOUND);

        return new JsonResponse([
            'id' => $user->getId(),
            'fullName' => $user->getFullName(),
            'roles' => $user->getRoles(),
            'image' => $user->getImage()
        ]);
    }
}
