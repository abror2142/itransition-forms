<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
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
    public function __construct() {
        $this->answers = new ArrayCollection();
    }
    
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['form:read', 'elementChild:read', 'answer:read'])]
    private ?int $id = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['elementChild:read'])]
    private ?string $type = null;

    #[ORM\Column]
    #[Groups(['form:read'])]
    private ?string $content = null;

    #[ORM\ManyToOne(targetEntity: Question::class, inversedBy: "options")]
    private ?Question $question = null;

    #[ORM\ManyToMany(targetEntity: Answer::class, mappedBy: "options")]
    private Collection $answers;

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

    public function getAnswers(){
        return $this->answers;
    }

    public function addAnswer(Answer $newAnswer){
        if(!$this->answers->contains($newAnswer)){
            $this->answers->add($newAnswer);
            $newAnswer->addOption($this);
        }
        return $this;
    }

    public function removeAnswer(Answer $answer){
        if($this->answers->removeElement($answer)){
            $answer->removeOption($this);
        }
        return $this;
    }

}