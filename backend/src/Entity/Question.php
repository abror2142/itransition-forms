<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORm;
use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\Collection;
use App\Entity\ElementAttribute;
use App\Entity\ElementChild;
use App\Entity\Element;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ApiResource(
    normalizationContext: ['groups' => ['question:read'], 'enable_max_depth' => true],
    denormalizationContext: ['groups' => ['question:write']]
)]
class Question 
{
    public function __construct()
    {
        $this->options = new ArrayCollection();
        $this->attributes = new ArrayCollection();
        $this->answers = new ArrayCollection();
    }

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORm\Column]
    #[Groups(['form:read', 'question:read'])]
    private ?int $id = null;

    #[ORM\Column(type: "text", nullable: true)]
    #[Groups(['form:read', 'question:read'])]
    private ?string $title = null;

    #[ORM\Column(type: "text", nullable: true)]
    #[Groups(['form:read', 'question:read'])]
    private ?string $description = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['form:read', 'question:read'])]
    private ?string $image = null;

    #[ORM\Column]
    #[Groups(['form:read', 'question:read'])]
    private ?bool $required = null;

    #[ORM\Column()]
    #[Groups(['form:read', 'question:read'])]
    private ?int $sequence = null;

    #[ORM\ManyToOne(targetEntity: Form::class, inversedBy: "questions")]
    private ?Form $form = null;

    #[ORM\ManyToOne(targetEntity: Element::class, inversedBy: "questions")]
    #[Groups(['form:read', 'question:read'])]
    private ?Element $questionType = null;


    #[ORM\OneToMany(targetEntity: ElementAttribute::class, mappedBy: "question")]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['form:read', 'question:read'])]
    private Collection $attributes;

    #[ORM\OneToMany(targetEntity: ElementChild::class, mappedBy: 'question')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['form:read', 'question:read'])]
    private Collection $options;

    /**
     * @var Collection<int, Answer>
     */
    #[ORM\OneToMany(targetEntity: Answer::class, mappedBy: 'question', orphanRemoval: true)]
    private Collection $answers;


    public function getId() {
        return $this->id;
    }

    public function getTitle() {
        return $this->title;
    }

    public function setTitle(string $title) {
        $this->title = $title;
        return $this;
    }

    public function getImage() {
        return $this->image;
    }

    public function setImage(?string $image) {
        $this->image = $image;
        return $this;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription(?string $description) {
        $this->description = $description;
        return $this;
    }

    public function getRequired() {
        return $this->required;
    }

    public function setRequired(?bool $required) {
        $this->required = $required;
        return $this;
    }

    public function getSequence() {
        return $this->sequence;
    }

    public function setSequence(int $sequence) {
        $this->sequence = $sequence;
        return $this;
    }

    public function getForm() {
        return $this->form;
    }

    public function setForm(?Form $form) {
        $this->form = $form;
        return $this;
    }

    public function getQuestionType() {
        return $this->questionType;
    }

    public function setQuestionType(?Element $questionType) {
        $this->questionType = $questionType;
        return $this;
    }

    public function getAttributes() {
        return $this->attributes;
    }

    public function addAttribute(ElementAttribute $elementAttribute) {
        if(!$this->attributes->contains($elementAttribute)) {
            $this->attributes[] = $elementAttribute;
            $elementAttribute->setQuestion($this);
        }
    }

    public function removeAttribute(ElementAttribute $elementAttribute) {
        if($this->attributes->removeElement($elementAttribute)) {
            if($elementAttribute->getQuestion() == $this) {
                $elementAttribute->setQuestion(null);
            }
        }
    }

    public function getOptions() {
        return $this->options;
    }

    public function addOption(ElementChild $elementChild) {
        if(!$this->options->contains($elementChild)) {
            $this->options[] = $elementChild;
            $elementChild->setQuestion($this);
        }
    }

    public function removeOption(ElementChild $elementChild) {
        if($this->options->removeElement($elementChild)) {
            if($elementChild->getQuestion() == $this) {
                $elementChild->setQuestion(null);
            }
        }
    }

    public function updateOptions(Collection $newOptions) {
        foreach ($this->options as $option) {
            if(!$newOptions->contains($option)){
                $this->removeOption($option);
            }
        }
        foreach ($newOptions as $newOption) {
            if(!$this->options->contains($newOption)){
                $this->addOption($newOption);
            }
        }
    }

    #[Groups(['form:read'])]
    public function getType(): string
    {
        return 'question';
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
            $answer->setQuestion($this);
        }

        return $this;
    }

    public function removeAnswer(Answer $answer): static
    {
        if ($this->answers->removeElement($answer)) {
            // set the owning side to null (unless already changed)
            if ($answer->getQuestion() === $this) {
                $answer->setQuestion(null);
            }
        }

        return $this;
    }
}