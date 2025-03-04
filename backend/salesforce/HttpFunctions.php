<?php

namespace Salesforce;

use Salesforce\ApiFunctions;
use Salesforce\TokenManager;
use Symfony\Component\HttpClient\HttpClient;

class HttpFunctions {
    private $apiFunctions;
    private $client;
    private TokenManager $tokenManager;

    public function __construct(ApiFunctions $apiFunctions, TokenManager $tokenManager)
    {   
        $this->apiFunctions = $apiFunctions;
        $this->client = HttpClient::create();
        $this->tokenManager = $tokenManager;
    }

    public function getContactInfo(string $salesAccountId)
    {
        $token = $this->tokenManager->getToken();
        $q = "SELECT+Id,FirstName,LastName,Email,MobilePhone,Phone,HomePhone,BirthDate,Description,Department+FROM+Contact+WHERE+AccountId+='{$salesAccountId}'";
        $url = $this->apiFunctions->getQueryUrl($q);
        $resp = $this->client->request('GET', $url, [
            'headers' => ['Authorization' => "Bearer $token"]
        ]);
        $data = json_decode($resp->getContent());
        return $data;
    }

    public function getAccountInfo(string $salesAccountId)
    {
        $token = $this->tokenManager->getToken();
        $q = "SELECT+Id,Name,AccountNumber,AnnualRevenue,Phone,Fax,Website,Description+FROM+Account+WHERE+Id='{$salesAccountId}'";
        $url = $this->apiFunctions->getQueryUrl($q);
        $resp = $this->client->request('GET', $url, [
            'headers' => ['Authorization' => "Bearer $token"]
        ]);
        $data = json_decode($resp->getContent());
        return $data;
    }

    public function saveAccount(string $json)
    {
        $token = $this->tokenManager->getToken();
        $url = $this->apiFunctions->getAccountUrl();
        $resp = $this->client->request('POST', $url, [
            'headers' => [
                'Authorization' => "Bearer $token",
                'Content-Type' => 'application/json'
            ],
            'body' => $json
        ]);
        $respData = json_decode($resp->getContent());
        $accountId = $respData->id;
        return $accountId;
    }

    public function saveContact(string $json)
    {
        $token = $this->tokenManager->getToken();
        $url = $this->apiFunctions->getContactUrl();
        $resp = $this->client->request('POST', $url, [
            'headers' => [
                'Authorization' => "Bearer $token",
                'Content-Type' => 'application/json'
            ],
            'body' => $json
        ]);
        $respData = json_decode($resp->getContent());
        $contactId = $respData->id;
        return $contactId;
    }

    public function updateAccount(string $id, string $json)
    {
        $token = $this->tokenManager->getToken();
        $url = $this->apiFunctions->getAccountUPdateUrl($id);
        $resp = $this->client->request('PATCH', $url, [
            'headers' => [
                'Authorization' => "Bearer $token",
                'Content-Type' => 'application/json'
            ],
            'body' => $json
        ]);
        $respData = json_decode($resp->getContent());
        return $respData;
    }

    public function updateContact(string $id, string $json)
    {
        $token = $this->tokenManager->getToken();
        $url = $this->apiFunctions->getContactUpdateUrl(id: $id);
        $resp = $this->client->request('PATCH', $url, [
            'headers' => [
                'Authorization' => "Bearer $token",
                'Content-Type' => 'application/json'
            ],
            'body' => $json
        ]);
        return $resp;
    }

}
