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
use Symfony\Component\HttpFoundation\Request;
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

    #[Route('/api/dashboard/answers', name: 'app_dashboard', methods: ['GET'])]
    public function index(CleanHtmlTags $cleanHtmlTags, Request $request): Response
    {
        $user = $this->security->getUser();
        if(!$user) 
            return new JsonResponse(['error' => "User not found!"], Response::HTTP_NOT_FOUND);
        $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $user->getUserIdentifier()]);
        
        $limit = $request->query->get('limit', 5);
        
        $repository = $this->entityManager->getRepository(Respond::class);
        $answers = $repository->findResponseWithAnswersByUser($user->getId(), $limit);
        $answers = $cleanHtmlTags->clean($answers, 'form_title');

        return new JsonResponse($answers, Response::HTTP_OK);
    }

    #[Route('/api/dashboard/forms', name: 'app_dashboard_forms', methods: ['GET'])]
    public function getForms(CleanHtmlTags $cleanHtmlTags, Request $request): Response
    {
        $user = $this->security->getUser();
        if(!$user) 
            return new JsonResponse(['error' => "User not found!"], Response::HTTP_NOT_FOUND);
        $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $user->getUserIdentifier()]);

        $limit = $request->query->get('limit', 5);

        $repository = $this->entityManager->getRepository(Form::class);
        $forms = $repository->findFormsWithResponseCount($user->getId(), $limit);
        $forms = $cleanHtmlTags->clean($forms, "title");

        return new JsonResponse($forms, Response::HTTP_OK);
    }
}
