<?php

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class SalesforceAccountDto {
    // accountId
    public ?string $accountId = null;

    // accountDescription
    public ?string $accountDescription = null;

    // accountFax
    public ?string $accountFax = null;

    // accountName
    #[Assert\NotBlank]
    #[Assert\NotNull]
    public ?string $accountName = null;

    // accountNumber
    public ?string $accountNumber = null;

    // accountPhone
    public ?string $accountPhone = null;

    // accountWebsite
    public ?string $accountWebsite = null;

    // annualRevenue
    public ?string $annualRevenue = null;
}