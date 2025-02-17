<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Core\User\UserInterface;

final class AuthController extends AbstractController
{
    #[Route('/api/user', name: 'app_auth', methods: ['GET'])]
    public function user(Request $request): JsonResponse
    {
       $user = $this->getUser();
       
       return new JsonResponse([
           'id' => $user->getId(),
           'email' => $user->getUserIdentifier(),
           'roles' => $user->getRoles(),
       ]);
    }
}
