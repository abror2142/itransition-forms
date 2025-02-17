<?php 

namespace App\Entity;

use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Entity\Question;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ApiResource]
class Element
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['form:read', 'element:read'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['form:read', 'element:read'])]
    private ?string $name = null;

    #[ORM\Column]
    #[Groups(['element:read'])]
    private ?string $type = null;

    #[ORM\OneToMany(targetEntity: Question::class, mappedBy: "type")]
    private Collection $questions;

    public function __construct() {
        $this->attributes = new ArrayCollection();
    }

    public function getId(){
        return $this->id;
    }

    public function getName() {
        return $this->name;
    }

    public function setName(string $name) {
        $this->name = $name;
        return $this;
    }

    public function getType() {
        return $this->type;
    }

    public function setType(string $type) {
        $this->type = $type;
        return $this;
    }

    public function getQuestions()
    {
        return $this->questions;
    }

    public function addQuestion(Question $question)
    {
        if(!$this->questions->contains($question)){
            $this->questions->add($question);
            $question->setQuestionType($this);
        }
        return $this;
    }

    public function removeQuestion(Question $question) {
        if($this->questions->removeElement($question)){
            if($question->getQuestionType() === $this){
                $question->setQuestionType(null);
            }
        }
    }
}