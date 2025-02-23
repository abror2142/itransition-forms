<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\VerificationTokenRepository;
use App\Security\EmailVerifier;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mime\Address;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

use Symfony\Component\HttpFoundation\JsonResponse;

class RegistrationController extends AbstractController
{
    public function __construct(private EmailVerifier $emailVerifier)
    {
    }

    #[Route('/register', name: 'app_register', methods: ['POST'])]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager): Response
    {
        $user = new User();
        $email = $request->getPayload()->get('email', null);
        $plainPassword = $request->getPayload()->get('password', null);
        $full_name = $request->getPayload()->get('fullName', null);
        
        $user->setEmail($email);
        $user->setFullName($full_name);
        $user->setPassword($userPasswordHasher->hashPassword($user, $plainPassword));

        $entityManager->persist($user);
        $entityManager->flush();

        // generate a signed url and email it to the user
        $this->emailVerifier->sendEmailConfirmation($user,
            (new TemplatedEmail())
                ->from(new Address('abror2142@gmail.com', 'Abrorbek Ismoilov'))
                ->to((string) $user->getEmail())
                ->subject('Please Confirm your Email')
                ->htmlTemplate('registration/confirmation_email.html.twig')
        );
        
        $successMessage = [
            "message" => [
                "User successfully created!",
                "Confirmation email sent to $email .",
                "Please check your Mail Box!"
            ]
        ];

        return new JsonResponse($successMessage, 200);
    }

    #[Route('/verify/email', name: 'app_verify_email', methods: ['POST'])]
    public function verifyUserEmail(
        Request $request, 
        EntityManagerInterface $entityManager,
        VerificationTokenRepository $verificationTokenRepository,
        ): Response
    {
        $token = $request->getPayload()->get('token');

        if (null === $token) {
            return new JsonResponse(['message' => "Token is not provided!"], Response::HTTP_BAD_REQUEST);
        }

        $verificationToken = $verificationTokenRepository->findOneBy(['token'=> $token]);

        if (null === $verificationToken || null === $verificationToken->getOwner()) {
            return new JsonResponse(['message' => 'User not found!'], Response::HTTP_BAD_REQUEST);
        }
        
        $user = $verificationToken->getOwner();

        // validate email confirmation link, sets User::isVerified=true and persists
        try {
            $user->setIsVerified(true);
            $entityManager->persist($user);
            $entityManager->flush();
        } catch (Exception $e) {
           return new JsonResponse(['message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }

        return new JsonResponse(['message' => 'Confirmed! Your account is verified now!'], Response::HTTP_ACCEPTED);
    }
}
