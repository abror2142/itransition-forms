<?php

namespace App\Controller;

use App\Entity\Form;
use App\Entity\Response as Respond;
use App\Entity\User;
use App\Service\CleanHtmlTags;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

final class DashboardController extends AbstractController
{
    private Security $security;
    private EntityManagerInterface $entityManager;
    private SerializerInterface $serializer;

    public function __construct(
        EntityManagerInterface $entityManager,
        Security $security,
        SerializerInterface $serializer,
    ){
        $this->security = $security;
        $this->entityManager = $entityManager;
        $this->serializer = $serializer;
    }

    #[Route('api/dashboard', name: 'app_dashboard', methods: ['GET'])]
    public function index(CleanHtmlTags $cleanHtmlTags): Response
    {
        $user = $this->security->getUser();
        if(!$user) 
            return new JsonResponse(['error' => "User not found!"], Response::HTTP_NOT_FOUND);
        $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $user->getUserIdentifier()]);

        $repository = $this->entityManager->getRepository(Form::class);
        $forms = $repository->findFormsWithResponseCount($user->getId());
        $forms = $cleanHtmlTags->clean($forms, "title");

        $repository = $this->entityManager->getRepository(Respond::class);
        $answers = $repository->findResponseWithAnswersByUser($user->getId());
        $answers = $cleanHtmlTags->clean($answers, 'form_title');

        $data = [
            'forms' => $forms,
            'answers' => $answers,
        ];
        return new JsonResponse($data, Response::HTTP_OK);
    }
}
