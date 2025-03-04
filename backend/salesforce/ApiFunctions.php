<?php

namespace Salesforce;

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class ApiFunctions {
    protected $params;

    public function __construct(ParameterBagInterface $params)
    {
        $this->params = $params;
    }

    // SALESFORCE_CLIENT_ID
    public function getCientId() 
    {
        return $this->params->get('salesforce_client_id');
    }

    // SALESFORCE_CLIENT_SECRET
    public function getClientSecret()
    {
        return $this->params->get('salesforce_client_secret');
    }

    // SALESFORCE_DOMAIN
    public function getTokenUrl()
    {
        return $this->params->get('salesforce_domain') . '/services/oauth2/token';
    }

    public function getQueryUrl(string $q)
    {
        return $this->params->get('salesforce_domain') . "/services/data/v62.0/query?q={$q}";
    }

    public function getAccountUrl()
    {
        return $this->params->get('salesforce_domain') . '/services/data/v62.0/sobjects/Account';
    }

    public function getAccountUpdateUrl(string $id)
    {
        return $this->params->get('salesforce_domain') . '/services/data/v62.0/sobjects/Account/' . $id;
    }

    public function getContactUrl()
    {
        return $this->params->get('salesforce_domain') . '/services/data/v62.0/sobjects/Contact';
    }

    public function getContactUpdateUrl(string $id)
    {
        return $this->params->get('salesforce_domain') . '/services/data/v62.0/sobjects/Contact/' . $id;
    }
}