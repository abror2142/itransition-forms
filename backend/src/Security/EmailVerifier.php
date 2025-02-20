<?php

namespace App\Security;

use App\Entity\User;
use App\Entity\VerificationToken;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use SymfonyCasts\Bundle\VerifyEmail\Exception\VerifyEmailExceptionInterface;
use SymfonyCasts\Bundle\VerifyEmail\VerifyEmailHelperInterface;

class EmailVerifier
{
    public function __construct(
        private VerifyEmailHelperInterface $verifyEmailHelper,
        private MailerInterface $mailer,
        private EntityManagerInterface $entityManager
    ) {
    }

    public function sendEmailConfirmation(User $user, TemplatedEmail $email): void
    {
        $token = bin2hex(random_bytes(32));
    
        $verification = new VerificationToken();
       
        $verification->setToken($token);
        $verification->setOwner($user);

        $this->entityManager->persist($verification);
        $this->entityManager->flush();

        $context = $email->getContext();
        $context['token'] = $token;

        $email->context($context);

        $this->mailer->send($email);
    }

    /**
     * @throws VerifyEmailExceptionInterface
     */
    public function handleEmailConfirmation(User $user): void
    {
        $user->setIsVerified(true);

        $this->entityManager->persist($user);
        $this->entityManager->flush();
    }
}
