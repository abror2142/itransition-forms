<?php

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class QuestionType {
    public int $id;
    public string $name;
}

class QuestionFieldDto {
    public function __construct(

        #[Assert\NotBlank(message: "Question type must be valid!")]
        public QuestionType $questionType,

        #[Assert\NotBlank(message: "Question title is required!")]
        public string $title,

        public ?string $image = null,
        
        public ?string $description = null,
        
        #[Assert\Valid]
        public array $options = [],

        public ?bool $required = null,

        #[Assert\NotBlank(message: "Valid order required!")]
        public int $sequence
    ){
    }
}