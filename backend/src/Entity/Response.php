<?php

namespace App\Entity;

use App\Repository\ResponseRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ResponseRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['response:read'], 'enable_max_depth' => true],
    denormalizationContext: ['groups' => ['response:write']]
)]
class Response
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['response:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'responses')]
    #[ORM\JoinColumn(nullable: true)]
    private ?User $owner;

    #[ORM\ManyToOne(targetEntity: Form::class, inversedBy: 'responses')]
    #[ORM\JoinColumn(nullable: true)]
    private ?Form $form;

    #[ORM\Column]
    #[Groups(['response:read'])]
    private ?\DateTimeImmutable $createdAt = null;

    /**
     * @var Collection<int, Answer>
     */
    #[ORM\OneToMany(targetEntity: Answer::class, mappedBy: 'response', orphanRemoval: true, cascade: ['persist', 'remove'])]
    #[Groups(['response:read'])]
    private Collection $answers;

    public function __construct()
    {
        $this->answers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOwner()
    {
        return $this->owner;
    }

    public function setOwner(?User $owner)
    {
        $this->owner = $owner;

        return $this;
    }

    public function getForm()
    {
        return $this->form;
    }

    public function setForm(?Form $form)
    {
        $this->form = $form;

        return $this;
    }

    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    public function setCreatedAt()
    {
        $this->createdAt = new \DateTimeImmutable();

        return $this;
    }

    /**
     * @return Collection<int, Answer>
     */
    public function getAnswers(): Collection
    {
        return $this->answers;
    }

    public function addAnswer(Answer $answer): static
    {
        if (!$this->answers->contains($answer)) {
            $this->answers->add($answer);
            $answer->setResponse($this);
        }

        return $this;
    }

    public function removeAnswer(Answer $answer): static
    {
        if ($this->answers->removeElement($answer)) {
            // set the owning side to null (unless already changed)
            if ($answer->getResponse() === $this) {
                $answer->setResponse(null);
            }
        }

        return $this;
    }
}
