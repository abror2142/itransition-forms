<?php

namespace App\Entity;

use App\Repository\AnswerRepository;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\ElementChild;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: ['groups' => ['answer:read']],
    denormalizationContext: ['groups' => ['answer:write']]
)]
#[ORM\Entity(repositoryClass: AnswerRepository::class)]
class Answer
{
    public function __construct(){
        $this->options = new ArrayCollection();
    }

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['answer:read', 'response:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'answers')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Question $question = null;

    #[ORM\ManyToOne(inversedBy: 'answers')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Response $response = null;

    #[ORM\Column(type: 'integer', nullable: true)]
    #[Groups(['answer:read', 'response:read'])]
    private ?int $answerInteger;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['answer:read', 'response:read'])]
    private ?string $answerText = null;

    #[ORM\Column(type: 'text', nullable: true)]
    private ?string $answerParagraph = null;
    #[Groups(['answer:read', 'response:read'])]

    #[ORM\ManyToOne(inversedBy: 'answers')]
    private ?ElementChild $answerMultipleChoice = null;

    #[ORM\ManyToMany(targetEntity: ElementChild::class, inversedBy: "answers")]
    #[ORM\JoinTable(name: "checkbox_answers")]
    private Collection $options;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getResponse(): ?Response
    {
        return $this->response;
    }

    public function setResponse(?Response $response): static
    {
        $this->response = $response;

        return $this;
    }

    public function getQuestion(): ?Question
    {
        return $this->question;
    }

    public function setQuestion(?Question $question): static
    {
        $this->question = $question;
        return $this;
    }

    public function getAnswerInteger()
    {
        return $this->answerInteger;
    }

    public function setAnswerInteger(?int $answerInteger)
    {
        $this->answerInteger = $answerInteger;
        return $this;
    }

    public function getAnswerText()
    {
        return $this->answerText;
    }

    public function setAnswerText(?string $answerText)
    {
        $this->answerText = $answerText;
        return $this;
    }
    
    public function getAnswerParagraph()
    {
        return $this->answerParagraph;
    }

    public function setAnswerParagraph(?string $answerParagraph)
    {
        $this->answerParagraph = $answerParagraph;

        return $this;
    }

    public function getAnsweMultipleChoicer()
    {
        return $this->answerMultipleChoice;
    }

    public function setAnswerMultipleChoice(?ElementChild $answerMultipleChoice)
    {
        $this->answerMultipleChoice= $answerMultipleChoice;
        return $this;
    }
    
    public function getOptions() {
        return $this->options;
    }

    public function addOption(ElementChild $newOption) {
        if(!$this->options->contains($newOption)){
            $this->options->add($newOption);
            $newOption->addAnswer($this);
        }
        return $this;
    }

    public function removeOption(ElementChild $option) {
        if($this->options->removeElement($option)){
            $option->removeAnswer($this);
        }
        return $this;
    }

}
