<?php 

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class UserDto {
    public function __construct(

        public int $id,

  
        public string $email
    ) {}
}
