<?php

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Context\ExecutionContextInterface;

#[Assert\Callback('validateFormFields')]
class FormValidationDto {
    public function __construct(FormInfoValidationDto $formInfo, array $formFields = []) {
        $this->formInfo = $formInfo;
        $this->formFields = $formFields;
    }

    #[Assert\NotNull(message: "Form info must be provided!")]
    #[Assert\Valid]
    public FormInfoValidationDto $formInfo;

    #[Assert\All([
        new Assert\Collection([
            'id' => [
                new Assert\NotBlank(),
                new Assert\Type(['string', 'integer'])
            ],
            'type' => [
                new Assert\NotBlank(),
                new Assert\Type('string'),
                new Assert\Choice(['question', 'text', 'image'])
            ],
            'title' => [
                new Assert\NotBlank(),
                new Assert\Type('string')
            ],
            'description' => new Assert\Optional([
                new Assert\Type('string'),
                new Assert\Length(max: 1000)
            ]),
            'image' => [
                new Assert\Optional()
            ],
            "required" => [
                new Assert\Optional()
            ],
            'questionType' => new Assert\Optional([
                new Assert\Optional(),
                new Assert\Collection([
                    'id' => [
                        new Assert\Type('integer'),
                        new Assert\Choice([1, 2, 3, 4, 5])
                    ],
                    'name' => [
                        new Assert\Type('string'),
                        new Assert\Choice(['Multiple Choice', 'Checkbox', 'Paragraph', 'Text', 'Integer'])
                    ]
                ]
            )]), 
            'options' => new Assert\Optional([
                new Assert\Type('array'),
                new Assert\All([
                    new Assert\Collection([
                        'id' => [
                            new Assert\Type(['string', 'integer'])
                        ],
                        'content' => [
                            new Assert\NotBlank(),
                            new Assert\Type('string'),
                        ]
                    ])
                ])
            ]),
            'attributes' => new Assert\Optional([
                new Assert\Type('array')
            ]),
            'sequence' => [
                new Assert\NotBlank(),
                new Assert\NotNull(),
                new Assert\Type('integer'),
            ],
            'caption' => new Assert\Optional([
                new Assert\Type("string")
            ])
        ])
    ])]
    #[Assert\Valid]
    public array $formFields = [];

    public function validateFormFields(ExecutionContextInterface $context): void
    {
        foreach ($this->formFields as $index => $field) {
            if (isset($field['type']) && in_array($field['type'], ['image'])) {
                if (empty($field['image'])) {
                    $context->buildViolation('Image must not be blank for image field.')
                        ->atPath("formFields[$index].image")
                        ->addViolation();
                }
            }
            if (isset($field['type']) && in_array($field['type'], ['question'])) {
                if (!isset($field['required'])) {
                    $context->buildViolation('Required must not be blank for question field.')
                        ->atPath("formFields[$index].question")
                        ->addViolation();
                }
            }
            if (isset($field['type']) && in_array($field['type'], ['question'])) {
                if (empty($field['questionType'])) {
                    $context->buildViolation('Question Type must not be blank for question field.')
                        ->atPath("formFields[$index].questionType")
                        ->addViolation();
                }
            }
            if (isset($field['type']) && in_array($field['type'], ['question', 'text'])) {
                if (isset($field['caption'])) {
                    $context->buildViolation('Caption must not be set for question and text fields.')
                        ->atPath("formFields[$index].caption")
                        ->addViolation();
                }
            }
            if (isset($field['type']) && in_array($field['type'], ['image', 'text'])) {
                if (isset($field['questionType'])) {
                    $context->buildViolation('Question type must not be set for question and text fields.')
                        ->atPath("formFields[$index].caption")
                        ->addViolation();
                }
            }
        }
    }
}
