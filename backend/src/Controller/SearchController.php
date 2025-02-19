<?php

namespace App\Controller;

use Elastica\Query;
use FOS\ElasticaBundle\Finder\FinderInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Elastica\Query\MultiMatch;
use Symfony\Component\HttpFoundation\Request;
use FOS\ElasticaBundle\Finder\PaginatedFinderInterface;
use Symfony\Component\Serializer\SerializerInterface;

final class SearchController extends AbstractController
{
    private $finder;
    private SerializerInterface $serializer;

    public function __construct(PaginatedFinderInterface $finder, SerializerInterface $serializer)
    {
        $this->finder = $finder;
        $this->serializer = $serializer;
    }

    #[Route('/search', name: 'app_search', methods: 'GET')]
    public function index(Request $request): Response
    {       
        $term = $request->query->get('q');
        if($term) {
            $results = $this->finder->find($term);
            $json = $this->serializer->serialize($results, 'json', ['groups' => ['form:search']]);
            return new JsonResponse($json, Response::HTTP_OK);
        } else {
            return new JsonResponse(['message' => "Query is Empty"], Response::HTTP_BAD_REQUEST);
        }
    }
}
