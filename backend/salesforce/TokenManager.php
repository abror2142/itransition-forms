<?php

namespace Salesforce;

use Salesforce\HttpFunctions;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\SalesforceToken;
use Symfony\Component\HttpClient\HttpClient;

class TokenManager {
    private $apiFunctions;
    private $entityManager;

    private $client;

    public function __construct(ApiFunctions $apiFunctions, EntityManagerInterface $entityManager)
    {   
        $this->apiFunctions = $apiFunctions;
        $this->entityManager = $entityManager;
        $this->client = HttpClient::create();
    }

    public function getToken()
    {
        $tokenData = $this->entityManager->getRepository(SalesforceToken::class)->findLatest();
        if(!$tokenData){
            $token = $this->fetchToken();
            $this->storeToken($token);
        } else {
            $token = $tokenData[0]->getToken();
            $isActive = $tokenData[0]->isActive();
            if(!$isActive){
                $token = $this->fetchToken();
                $this->storeToken($token);
                return $token;
            }
        }
        return $token;
    }

    public function storeToken(string $token)
    {
        $salesforceToken = new SalesforceToken();
        $salesforceToken->setToken($token);
        $salesforceToken->setCreatedAt(new \DateTimeImmutable());
        $salesforceToken->setIsActive(true);

        $this->entityManager->persist($salesforceToken);
        $this->entityManager->flush();
    }

    public function fetchToken()
    {
        $tokenUrl = $this->apiFunctions->getTokenUrl();
        $params = [
            'query' => [
                'grant_type' => 'client_credentials',
                'client_id' => $this->apiFunctions->getCientId(),
                'client_secret' => $this->apiFunctions->getClientSecret()
            ]
        ];
        $resp = $this->client->request('GET', $tokenUrl, $params);
        $data = json_decode($resp->getContent());
        $token = $data->access_token;
        return $token;
    }
}