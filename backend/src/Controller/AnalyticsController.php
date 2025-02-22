<?php

namespace App\Controller;

use App\Entity\Form;
use App\Service\Analytics;
use App\Entity\Response as Respond;
use Doctrine\ORM\EntityManagerInterface;
use Proxies\__CG__\App\Entity\Question;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

final class AnalyticsController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private Security $security;
    private SerializerInterface $serializer;

    public function __construct (
        EntityManagerInterface $entityManager,
        Security $security,
        SerializerInterface $serializer,
    ) {
        $this->entityManager = $entityManager;
        $this->security = $security;
        $this->serializer = $serializer;
    }

    #[Route('/api/form/{id}/analytics', name: 'app_analytics', methods: ['GET'], requirements: ['id' => '\d+'])]
    public function index(int $id): Response
    {
        $form = $this->entityManager->getRepository(Form::class)->findOneBy(['id' => $id]);
        if(!$form)
            return new JsonResponse(['error' => 'Form not found!'], Response::HTTP_NOT_FOUND);

        $user = $this->security->getUser();
        if(!$user)
            return new JsonResponse(['error' => 'User not found!'], Response::HTTP_NOT_FOUND);


        $form = $this->entityManager->getRepository(Form::class)->findOneBy(['id' => $id]);
        
        $analyticsService = new Analytics();
        $analytics = $analyticsService->getAnalytics($form);

        $formData = $this->serializer->normalize($form, '[]', ['groups' => 'form:read']);

        $form = [
            "formInfo" => [
                "id" => $formData['id'],
                "title" => $formData['title'],
                "description" => $formData['description'],
                "type" => $formData['type'],
                "image" => $formData['image'],
                "tags" => $formData['tags'],
                "users" => $formData['users'],
                "topic" => $formData['topic'],
                "owner" => $formData['owner']
            ],
            "formFields" => [
                ...$formData['questions'],
                ...$formData['imageFields'],
                ...$formData['textFields'],
            ],
            "analytics" => $analytics
        ];

        $json = json_encode($form);
        return new JsonResponse($json, 200);
    }

    #[Route('/api/form/{id}/fillings-by-date', name: 'app_form_filling_analytics', methods: ['GET'], requirements: ['id' => '\d+'])]
    public function fillingsByDate (int $id) {
        $form = $this->entityManager->getRepository(Form::class)->findOneBy(['id' => $id]);
        if(!$form)
            return new JsonResponse(['error' => 'Form not found!'], Response::HTTP_NOT_FOUND);

        $user = $this->security->getUser();
        if(!$user)
            return new JsonResponse(['error' => 'User not found!'], Response::HTTP_NOT_FOUND);

        $responseDates = $this->entityManager->getRepository(Respond::class)->findResponseWithDates($form);
       
        return new  JsonResponse($responseDates, Response::HTTP_OK); 
    }

    #[Route('/api/form/{id}/fillings-total', name: 'app_form_filled_analytics', methods: ['GET'], requirements: ['id' => '\d+'])]
    public function fillingsTotal (int $id) {
        $form = $this->entityManager->getRepository(Form::class)->findOneBy(['id' => $id]);
        if(!$form)
            return new JsonResponse(['error' => 'Form not found!'], Response::HTTP_NOT_FOUND);

        $user = $this->security->getUser();
        if(!$user)
            return new JsonResponse(['error' => 'User not found!'], Response::HTTP_NOT_FOUND);
        $total = $form->getUsers()->count();
        $filled = $form->getResponses()->count();
        
        $data = [
            "total" => $total,
            "filled" => $filled
        ];

        
        return new  JsonResponse($data, Response::HTTP_OK); 
    }
}
