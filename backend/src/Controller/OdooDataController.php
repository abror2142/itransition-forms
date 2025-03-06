<?php

namespace App\Controller;

use App\Entity\Form;
use App\Entity\Question;
use App\Service\Analytics;
use App\Entity\User;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\SecurityBundle\Security;

final class OdooDataController extends AbstractController
{
    private $finder;
    private SerializerInterface $serializer;
    private EntityManagerInterface $entityManager;
    private Security $security;

    public function __construct(EntityManagerInterface $entityManager, SerializerInterface $serializer, Security $security)
    {
        $this->serializer = $serializer;
        $this->entityManager = $entityManager;
        $this->security = $security;
    }

    #[Route('/api/odoo/token', name: 'app_odoo_token', methods: 'GET')]
    public function getOdooToken() {
        $user = $this->security->getUser();
        if(!$user)
            return new JsonResponse(['error' => 'User not Found'], Response::HTTP_FORBIDDEN);

        $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $user->getUserIdentifier()]);
        $token = $user->getOdooToken();

        return new JsonResponse(['token' => $token], Response::HTTP_OK);
    }

    #[Route('/api/odoo/token/refresh', name: 'app_odoo_token_refresh', methods: 'POST')]
    public function getOdooTokenRefresh() {
        $user = $this->security->getUser();
        if(!$user)
            return new JsonResponse(['error' => 'User not Found'], Response::HTTP_FORBIDDEN);

        $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $user->getUserIdentifier()]);
        $newToken = bin2hex(random_bytes(32));
        $user->setOdooToken($newToken);

        $this->entityManager->flush();
        return new JsonResponse(['token' => $user->getOdooToken()], Response::HTTP_OK);
    }

    #[Route('/api/odoo/template', name: 'app_odoo_template', methods: 'GET')]
    public function searchPageMeta(Request $request)
    {
        $token = $request->query->get('token');

        $user = $this->entityManager->getRepository(User::class)->findOneBy(['odooToken' => $token]);

        if(!$user)
            return new JsonResponse(['error' => 'User with this token not found!'], Response::HTTP_NOT_FOUND);

        $forms = $this->entityManager->getRepository(Form::class)->findBy(['owner' => $user]);
        
        $analyticsService = new Analytics();

        $formData = [];

        foreach ($forms as $form) {
            $analytics = $analyticsService->getAnalytics($form);
            $questions = $form->getQuestions();
            $questionAnalytics = $this->merge($questions, $analytics);
            $data = [
                'id' => $form->getId(),
                'title' => $form->getTitle(),
                'author' => $form->getOwner()->getFullName(),
                'questions' => $questionAnalytics
            ];
            $formData[] = $data;   
        }
        return new JsonResponse($formData, Response::HTTP_OK);
    }

    public function merge (Collection $questions, array $analytics){
        $questionAnalytics = [];
        foreach ($questions as $question) {
            $data = [
                "id" => $question->getId(),
                "title" => strip_tags($question->getTitle()),
                "type" => $question->getQuestionType()->getName(),
                "numberOfAnswers" => count($question->getAnswers()),
                "aggregation" => $this->processAnalytics($question, $analytics)
            ];
            $questionAnalytics[] = $data;
        }
        return $questionAnalytics;
    }

    public function processAnalytics (Question $question, array $analytics) {
        $id = $question->getId();
        $type = $question->getQuestionType()->getName();

        if(!isset($id, $analytics))
            return "No data found!";
        $aggregation = "";

        switch ($type) {
            case 'Multiple Choice':
                $aggregation = "Most choosen: " . $this->getOptionAnalytics($question, $analytics[$id]);
                break;

            case 'Checkbox':
                $aggregation = "Most choosen: " . $this->getOptionAnalytics($question, $analytics[$id]);
                break;

            case 'Paragraph':
                $aggregation = "Most common word: " . $analytics[$id];
                break;

            case 'Text':
                $aggregation = "Most common word: " . $analytics[$id];
                break;

            case 'Integer':
                $aggregation = "Avarage: " . $analytics[$id];
                break;
            
            default:
                $aggregation = "No data found";
                break;
        }
        return $aggregation;
    }

    public function getOptionAnalytics (Question $question, array $analytics)
    {
        $options = $question->getOptions();
        arsort($analytics);
        $arrayKeys = array_keys($analytics);
        $most = $arrayKeys[0];
        foreach ($options as $option) {
            if($option->getId() == $most)
                return $option->getContent();
        }
        return "No info found";
    }
}
