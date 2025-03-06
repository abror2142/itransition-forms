<?php

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class TicketDto {
    public ?string $templateName = null;
    public ?string $summary = null;

    // birthDate
    #[Assert\NotBlank]
    #[Assert\NotNull]    
    public ?string $link = null;

    #[Assert\Choice(['High', 'Medium', 'Low'])]
    public ?string $priority = null;

}