<?php

namespace Jira;

use Jira\ApiFunctions;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class HttpFunctions {
    private ApiFunctions $apiFunctions;
    private HttpClientInterface $http;

    public function contentTypeOptions (string $json) { 
        return [
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => 'Basic ' . $this->getAuthBasic()
            ],
            'body' => $json
        ];
    }
    
    public function __construct(ApiFunctions $apiFunctions)
    {
        $this->apiFunctions = $apiFunctions;
        $this->http = HttpClient::create([
            'headers' => [
                'Authorization' => 'Basic ' . $this->getAuthBasic() 
            ]
        ]);
    }

    public function getUser(string $email)
    {
        $url = $this->apiFunctions->getUserByEmailUrl($email);
        $resp = $this->http->request('GET', $url);
        $respData = json_decode($resp->getContent());
        if($respData)
            return $respData[0];
        return $respData;
    }

    public function getTicket(string $id) 
    {
        $url = $this->apiFunctions->getTicketUrl($id);
        $resp = $this->http->request('GET', $url);
        $respData = json_decode($resp->getContent());
        return $respData;
    }

    public function getUserTickets(string $email) 
    {
        $url = $this->apiFunctions->getTicketsByEmailUrl($email);
        $resp = $this->http->request('GET', $url);
        $respData = json_decode($resp->getContent());
        return $respData;
    }

    public function createUser(string $json)
    {
        $url = $this->apiFunctions->createUserUrl();
        $http = HttpClient::create($this->contentTypeOptions($json));
        $resp = $http->request('POST', $url);
        $respData = json_decode($resp->getContent());
        return $respData;
    }

    public function createTicket(string $json)
    {
        $url = $this->apiFunctions->createTicketUrl();
        $http = HttpClient::create($this->contentTypeOptions($json));
        $resp = $http->request('POST', $url);
        $respData = json_decode($resp->getContent());
        return $respData;
    }
    
    public function getAuthBasic()
    {
        $username = $this->apiFunctions->getJiraUsername();
        $password = $this->apiFunctions->getJiraToken();
        return base64_encode("$username:$password");
    }
}