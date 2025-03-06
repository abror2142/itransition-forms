<?php 

namespace Jira;

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class ApiFunctions {
    private ParameterBagInterface $params;

    public function __construct(ParameterBagInterface $params)
    {
        $this->params = $params;
    }

    public function getJiraUsername()
    {
        return $this->params->get('jira_username');
    }

    public function getJiraToken()
    {
        return $this->params->get('jira_token');
    }

    public function getJiraDomain()
    {
        return $this->params->get('jira_domain');
    }

    public function getUserByEmailUrl(string $email)
    {
        $path = "/rest/api/latest/user/search?query=$email";
        return $this->getJiraDomain() . $path;
    }

    public function createUserUrl()
    {
        $path = "/rest/api/latest/user";
        return $this->getJiraDomain() . $path;
    }

    public function getTicketsByEmailUrl(string $email)
    {
        $path = "/rest/api/3/search?jql=reporter='$email'";
        return $this->getJiraDomain() . $path;
    }

    public function createTicketUrl()
    {
        $path = "/rest/api/3/issue";
        return $this->getJiraDomain() . $path;
    }

    public function getTicketUrl(string $id)
    {
        $path = "/rest/api/3/issue/$id";
        return $this->getJiraDomain() . $path;
    }
}