<?php 

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class TextFieldDto {
    public function __construct(

        #[Assert\NotBlank(message: "Image title is required!")]
        public string $title,
        
        public ?string $description = null,

        #[Assert\NotBlank(message: "Valid order required!")]
        public int $sequence
    ){
    }
}