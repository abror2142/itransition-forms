<?php 

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class CommentDto {
    #[Assert\NotBlank()]
    #[Assert\Type(['integer'])]
    public int $formId;    
    
    #[Assert\NotBlank()]
    public ?string $content;

    public ?int $parentId;
}