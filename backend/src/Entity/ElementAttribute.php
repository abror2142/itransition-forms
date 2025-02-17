<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Entity\Question;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ApiResource(
    normalizationContext: ['groups' => ['elementAttribute:read']],
    denormalizationContext: ['groups' => ['question:write']]
)]
class ElementAttribute 
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['form:read', 'elementAttribute:read'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['form:read', 'elementAttribute:read'])]
    private ?string $name = null;

    #[ORM\Column]
    #[Groups(['form:read', 'elementAttribute:read'])]
    private ?string $value = null;

    #[ORM\ManyToOne(targetEntity: Question::class, inversedBy: "attributes")]
    private ?Question $question = null;

    public function getId() {
        return $this->id;
    }

    public function getName() {
        return $this->name;
    }

    public function setName(string $name) {
        $this->name = $name;
        return $this;
    }

    public function getValue() {
        return $this->value;
    }

    public function setValue(string $value) {
        $this->value = $value;
        return $this;
    }

    public function getQuestion() {
        return $this->question;
    }

    public function setQuestion(?Question $question) {
        $this->question = $question;
        return $this;
    }
}