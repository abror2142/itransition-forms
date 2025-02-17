<?php

namespace App\Entity;

use App\Repository\FormTypeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Metadata\ApiResource;

#[ORM\Entity(repositoryClass: FormTypeRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['type:read']],
    denormalizationContext: ['groups' => ['type:write']]
)]
class FormType
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['type:read', 'meta:read', 'form:read'])]
    private ?int $id = null;
    
    #[ORM\Column(length: 255)]
    #[Groups(['type:read', 'meta:read', 'form:read'])]
    private ?string $name = null;

    #[ORM\OneToMany(targetEntity: Form::class, mappedBy: 'type')]
    private Collection $forms;

    public function __construct() {
        $this->forms = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

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
            $form->setType($this);
        }
        return $this;
    }

    public function removeForm(Form $form) {
        if($this->forms->removeElement($form)){
            if($form->getType() === $this){
                $form->setType(null);
            }
        }
    }
}
