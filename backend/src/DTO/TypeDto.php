<?php 

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class TypeDto {
    #[Assert\NotBlank()]
    public int $id;
    
    #[Assert\NotBlank()]
    #[Assert\Choice(['Public', 'Private', 'Protected'])]
    public string $name;
}