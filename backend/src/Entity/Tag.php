<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use App\Entity\Form;
use Symfony\Component\Serializer\Annotation\Groups;
use DateTimeImmutable;


#[ApiResource(
    normalizationContext: ['groups' => ['tag:read']],
    denormalizationContext: ['groups' => ['tag:write']]
)]
#[ORM\Entity]
class Tag 
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['meta:read', 'tag:read', 'form:read'])]
    private ?int $id = null;
    
    #[ORM\Column(length: 50)]
    #[Assert\NotBlank]
    #[Groups(['meta:read', 'tag:write', 'tag:read', 'form:read'])]
    private ?string $name = null;

    #[ORM\Column(type: 'text', nullable: true)]
    #[Groups(['tag:write', 'tag:read'])]
    private ?string $description = null;

    #[ORM\Column]
    #[Assert\NotNull]
    private ?DateTimeImmutable $createdAt = null;

    #[ORM\ManyToMany(targetEntity: Form::class, inversedBy: "tags")]
    #[ORM\JoinTable(name: "form_tags")]
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

    public function getDescription()
    {
        return $this->description;
    }

    public function setDescription(string $description)
    {
        $this->descripton = $description;
        return $this;
    }

    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    public function setCreatedAt()
    {
        $this->createdAt = new DateTimeImmutable();
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
            $form->addTag($this);
        }
        return $this;
    }

    public function removeForm(Form $form)
    {
        if($this->forms->removeElement($form)){
            $form->removeTag($this);
        }
    } 

}
