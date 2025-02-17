<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ApiResource(
    normalizationContext: ['groups' => ['text:read']],
    denormalizationContext: ['groups' => ['text:write']]
)]
class TextField 
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['form:read', 'text:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Form::class, inversedBy: "textFields")]
    private ?Form $form;

    #[ORM\Column(nullable: true)]
    #[Groups(['form:read', 'text:read'])]
    private ?string $title = null;

    #[ORM\Column(nullable: true, type: "text")]
    #[Groups(['form:read', 'text:read'])]
    private ?string $description = null;

    #[ORM\Column]
    #[Groups(['form:read', 'text:read'])]
    private ?int $sequence = null;

    public function getId(){
        return $this->id;
    }

    public function getForm(){
        return $this->form;
    }

    public function setForm(?Form $form) {
        $this->form = $form;
        return $this;
    }

    public function getTitle(){
        return $this->title;
    }

    public function setTitle(?string $title) {
        $this->title = $title;
        return $this;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription(?string $description) {
        $this->description = $description;
        return $this;
    }

    public function getSequence() {
        return $this->sequence;
    }

    public function setSequence(?int $sequence) {
        $this->sequence = $sequence;
        return $this;
    }

    #[Groups(['form:read'])]
    public function getType(): string
    {
        return 'text';
    }
}