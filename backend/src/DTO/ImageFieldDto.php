<?php 

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class ImageFieldDto {
    public function __construct(
            
        #[Assert\NotBlank(message: "Image title is required!")]
        public string $title,

        #[Assert\NotBlank()]
        public string $image,
        
        public ?string $caption = null,

        #[Assert\NotBlank(message: "Valid order required!")]
        public int $sequence
    ){
    }
}