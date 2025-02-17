<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use App\Entity\Form;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity]
#[ApiResource(
    normalizationContext: ['groups' => ['topic:read']],
    denormalizationContext: ['groups' => ['write']]
)]
class Topic
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['meta:read', 'topic:read', 'form:read'])]
    private ?int $id;

    #[ORM\Column]
    #[Groups(['meta:read', 'write', 'topic:read', 'form:read'])]
    private ?string $name;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\OneToMany(targetEntity: Form::class, mappedBy: "topic", cascade: ["persist", "remove"])]
    private Collection $forms;

    public function __construct()
    {
        $this->forms = new ArrayCollection();
    }

    public function getId()
    {
        return $this->id;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName(string $name) 
    {
        $this->name = $name;
        return $this;
    }

    public function getCreatedAt() 
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt)
    {
        $this->createdAt = $createdAt;
        return $this;
    }

    public function getForms()
    {
        return $this->forms;
    }

    public function addForm(Form $form)
    {
        if(!$this->forms->contains($form)){
            $this->forms->add($form);
            $form->setTopic($this);
        }
        return $this;
    }

    public function removeForm(Form $form) {
        if($this->forms->removeElement($form)){
            if($form->getTopic() === $this){
                $form->setTopic(null);
            }
        }
    }
}