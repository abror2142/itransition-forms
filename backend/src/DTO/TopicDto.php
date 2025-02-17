<?php 

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class TopicDto {
    #[Assert\NotBlank()]
    public int $id;
    
    #[Assert\NotBlank()]
    public string $name;
}