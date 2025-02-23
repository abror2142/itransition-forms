<?php 

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class UserIdDto {
    public function __construct(
        #[Assert\All([
            new Assert\NotBlank(),
            new Assert\Type('integer'),
        ])]
        public array $users,

        #[Assert\NotBlank()]
        #[Assert\Choice(['block', 'unblock', 'delete', 'admin-up', 'admin-down'])]
        public string $action,
    ) {}
}
