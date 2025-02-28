<?php

namespace App\Controller;

use App\Entity\Form;
use App\Entity\Tag;
use App\Entity\Topic;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;

final class SearchController extends AbstractController
{
    private $finder;
    private SerializerInterface $serializer;
    private EntityManagerInterface $entityManager;


    public function __construct(EntityManagerInterface $entityManager, SerializerInterface $serializer)
    {
        // $this->finder = $finder;
        $this->serializer = $serializer;
        $this->entityManager = $entityManager;
    }

    #[Route('/api/search/meta', name: 'app_search_meta', methods: 'GET')]
    public function searchPageMeta()
    {
        $tagsData = $this->entityManager->getRepository(Tag::class)->findAll();
        $tags = $this->serializer->serialize($tagsData, 'json', ['groups' => ['tag:read']]);
        $topicsData = $this->entityManager->getRepository(Topic::class)->findAll();
        $topics = $this->serializer->serialize($topicsData, 'json', ['groups' => ['topic:read']]);

        $data = [
            "tags" => $tags,
            "topics" => $topics
        ];

        return new JsonResponse($data, Response::HTTP_OK);
    }

    #[Route('/api/search', name: 'app_search', methods: 'GET')]
    public function searchForms(Request $request): Response
    {       
        if($request->query->has('tag')){
            $tagName = $request->query->get('tag');
            $tag = $this->entityManager->getRepository(Tag::class)->findOneBy(['name' => $tagName]);
            if(!$tag)
                return new JsonResponse(['error' => 'Tag not foud'], Response::HTTP_BAD_REQUEST);

            $formsData = $tag->getForms();
            $forms = $this->serializer->serialize($formsData, 'json', ['groups' => ['form:card', 'user:read']]);
            return new JsonResponse($forms, Response::HTTP_OK);
        }

        if($request->query->has('topic')){
            $topicName = $request->query->get('topic');
            $topic = $this->entityManager->getRepository(Topic::class)->findOneBy(['name' => $topicName]);
            if(!$topic)
                return new JsonResponse(['error' => 'Topic not foud'], Response::HTTP_BAD_REQUEST);

            $formsData = $this->entityManager->getRepository(Form::class)->findBy(['topic' => $topic]);
            $forms = $this->serializer->serialize($formsData, 'json', ['groups' => ['form:card', 'user:read']]);
            return new JsonResponse($forms, Response::HTTP_OK);
        }
        return new JsonResponse([], Response::HTTP_OK);
        // $term = $request->query->get('q');
        // if($term) {
        //     $results = $this->finder->find($term);
        //     $json = $this->serializer->serialize($results, 'json', ['groups' => ['form:search']]);
        //     return new JsonResponse($json, Response::HTTP_OK);
        // } else {
        //     return new JsonResponse(['message' => "Query is Empty"], Response::HTTP_BAD_REQUEST);
        // }
    }


}
