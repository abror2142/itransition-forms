<?php

namespace App\Controller;

use App\Entity\Tag;
use Doctrine\ORM\EntityManagerInterface;
use Elastica\Query;
use FOS\ElasticaBundle\Finder\FinderInterface;
use Proxies\__CG__\App\Entity\Topic;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Elastica\Query\MultiMatch;
use Symfony\Component\HttpFoundation\Request;
// use FOS\ElasticaBundle\Finder\PaginatedFinderInterface;
use Symfony\Component\Serializer\SerializerInterface;

final class SearchController extends AbstractController
{
    private $finder;
    private SerializerInterface $serializer;
    private EntityManagerInterface $entityManager;

    public function __construct(SerializerInterface $serializer, EntityManagerInterface $entityManager)
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
    public function index(Request $request): Response
    {       
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
