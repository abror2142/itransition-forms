<?php 

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;


class OptionDto {
    public ?string $id = null;

    #[Assert\NotBlank(message: "Option must have valid text!")]
    public string $content;
}