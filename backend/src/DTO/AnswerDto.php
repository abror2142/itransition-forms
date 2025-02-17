<?php 

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class AnswerDto {
    #[Assert\NotBlank()]
    #[Assert\Type(['string', 'integer'])]
    public string | int $formId;    
    
    #[Assert\NotBlank()]
    public ?array $answers;
}