<?php 

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;
use App\DTO\TypeDto;
use App\DTO\TopicDto;

class FormInfoValidationDto {
        #[Assert\NotBlank()]
        #[Assert\Type(['string', 'integer'])]
        public string | int $id;

        #[Assert\NotBlank(message: "Form title Must be defined!")]
        public string $title;
        
        public ?string $description = null;

        #[Assert\Valid]
        public TypeDto $type;

        public ?string $image = null;
        
        #[Assert\All(
            new Assert\Collection(
                fields: [
                    'id' => [
                        new Assert\Type(['integer'])
                    ],
                    'name' => [
                        new Assert\NotBlank(),
                        new Assert\Type('string')
                    ],
                    '__isNew__' => [
                        new Assert\Optional()
                    ]
                ],
                allowExtraFields: false,
                allowMissingFields: false
            )
        )]
        #[Assert\Valid]
        public array $tags = [];

        #[Assert\All(
            new Assert\Collection(
                fields: [
                    'id' => [
                        new Assert\NotBlank(),
                        new Assert\Type(['integer', 'string'])
                    ],
                    'email' => [
                        new Assert\NotBlank(),
                        new Assert\Email()
                    ]
                ],
                allowExtraFields: false,
                allowMissingFields: false
            )
        )]
        public array $users;

        #[Assert\NotBlank(message: "Topic must be provided")]
        #[Assert\NotNull(message: "Topic can't be null!")]
        #[Assert\Valid]
        public TopicDto $topic;
}