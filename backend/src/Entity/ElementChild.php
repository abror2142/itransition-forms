<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\Question;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity]
#[ApiResource(
    normalizationContext: ['groups' => ['elementChild:read'], 'enable_max_depth' => true],
    denormalizationContext: ['groups' => ['elementChild:write']]
)]
class ElementChild
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['form:read', 'elementChild:read'])]
    private ?int $id = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['elementChild:read'])]
    private ?string $type = null;

    #[ORM\Column]
    #[Groups(['form:read'])]
    private ?string $content = null;

    #[ORM\ManyToOne(targetEntity: Question::class, inversedBy: "options")]
    private ?Question $question = null;

    public function getId() {
        return $this->id;
    }

    public function getType() {
        return $this->type;
    }

    public function setType(string $type) {
        $this->type = $type;
        return $this;
    }

    public function getContent() {
        return $this->content;
    }

    public function setContent(string $content) {
        $this->content = $content;
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