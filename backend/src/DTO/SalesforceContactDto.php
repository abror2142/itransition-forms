<?php

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class SalesforceContactDto {
    // contactId
    public ?string $contactId = null;

    // birthDate
    public ?string $birthDate = null;

    // contactDescription
    public ?string $contactDescription = null;

    // contactEmail
    public ?string $contactEmail = null;

    // contactFirstName
    public ?string $contactFirstName = null;

    // contactHomePhone
    public ?string $contactHomePhone = null;

    // contactLastName
    #[Assert\NotBlank]
    #[Assert\NotNull]
    public ?string $contactLastName = null;

    // contactMobile
    public ?string $contactMobile = null;

    // contactPhone
    public ?string $contactPhone = null;

    // department
    public ?string $department = null;
}