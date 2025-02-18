<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\FormRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\Tag;
use App\Entity\Topic;
use App\Entity\Question;
use App\Entity\Response;
use App\Entity\Comment;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Validator\Constraints as Assert;
use DateTimeImmutable;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: FormRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['form:read'], 'enable_max_depth' => true],
    denormalizationContext: ['groups' => ['form:write']]
)]
class Form
{
    public function __construct()
    {
        $this->tags = new ArrayCollection();
        $this->imageFields = new ArrayCollection();
        $this->questions = new ArrayCollection();
        $this->textFields = new ArrayCollection();
        $this->responses = new ArrayCollection();
        $this->users = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->formLikes = new ArrayCollection();
    }  

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['form:read', 'form:card'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'forms')]
    #[Groups(['form:read', 'form:card'])]
    private ?User $owner = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Length(
        max: 255
    )]
    #[Groups(['form:read', 'form:card'])]
    private ?string $title = null;

    #[ORM\Column(length: 255, nullable: true, type: "text")]
    #[Groups(['form:read'])]
    private ?string $description = null;

    #[ORM\Column]
    #[Groups(['form:read', 'form:card'])]
    private ?DateTimeImmutable $createdAt = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['form:read'])]
    private ?\DateTime $updatedAt = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['form:read', 'form:card'])]
    private ?string $image = null;

    #[ORM\ManyToMany(targetEntity: Tag::class, mappedBy: "forms")]
    #[Groups(['form:read'])]
    private Collection $tags;

    #[ORM\ManyToMany(targetEntity: User::class, mappedBy: "forms")]
    #[Groups(['form:read'])]
    private Collection $users;

    #[ORM\ManyToOne(targetEntity: Topic::class, inversedBy: "forms")]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['form:read'])]
    private ?Topic $topic = null;

    #[ORM\OneToMany(targetEntity: ImageField::class, mappedBy: "form")]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['form:read'])]
    private Collection $imageFields;

    #[ORM\OneToMany(targetEntity: TextField::class, mappedBy: 'form')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['form:read'])]
    private Collection $textFields;

    #[ORM\OneToMany(targetEntity: Question::class, mappedBy: "form")]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['form:read'])]
    private Collection $questions;

    #[ORM\ManyToOne(targetEntity: FormType::class, inversedBy: 'forms')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['form:read'])]
    private ?FormType $type = null;

    #[ORM\OneToMany(targetEntity:Response::class, mappedBy: 'form')]
    #[ORM\JoinColumn(nullable: true)]
    private Collection $responses;

    #[ORM\OneToMany(targetEntity: Comment::class, mappedBy: "form")]
    #[ORM\JoinColumn(nullable: true)]
    private Collection $comments;

    /**
     * @var Collection<int, FormLike>
     */
    #[ORM\OneToMany(targetEntity: FormLike::class, mappedBy: 'form')]
    private Collection $formLikes; 

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): static
    {
        $this->owner = $owner;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getCreatedAt(): ?DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(): static
    {
        $this->createdAt = new DateTimeImmutable();
        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeInterface $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): static
    {
        $this->image = $image;

        return $this;
    }

    public function getTags()
    {
        return $this->tags;
    }

    public function addTag(Tag $tag) 
    {
        if(!$this->tags->contains($tag)){
            $this->tags->add($tag);
            $tag->addForm($this);
        }
    }

    public function removeTag(Tag $tag)
    {
        if($this->tags->removeElement($tag)){
            $tag->removeForm($this);
        }
    }

    public function updateTags(Collection $newTags) 
    {
        foreach ($this->tags as $tag) {
            if(!$newTags->contains($tag)){
                $this->removeTag($tag);
            }
        }
        foreach ($newTags as $newTag) {
            if(!$this->tags->contains($newTag)) {
                $this->addTag($newTag);
            }
        }
    }

    public function getUsers()
    {
        return $this->users;
    }

    public function addUser(User $user) 
    {
        if(!$this->users->contains($user)){
            $this->users->add($user);
            $user->addForm($this);
        }
    }

    public function removeUser(User $user)
    {
        if($this->users->removeElement($user)){
            $user->removeForm($this);
        }
    }

    public function updateUsers(Collection $newUsers) 
    {
        foreach ($this->users as $user) {
            if(!$newUsers->contains($user)){
                $this->removeUser($user);
            }
        }
        foreach ($newUsers as $newUser) {
            if(!$this->users->contains($newUser)) {
                $this->addUser($newUser);
            }
        }
    }

    public function getTopic()
    {
        return $this->topic;
    }

    public function setTopic(?Topic $topic)
    {
        $this->topic = $topic;
        return $this;
    }

    public function getType()
    {
        return $this->type;
    }

    public function setType(?FormType $type)
    {
        $this->type = $type;
        return $this;
    }

    public function getImageFields() {
        return $this->imageFields;
    }

    public function addImageField(ImageField $imageField){
        if(!$this->imageFields->contains($imageField)){
            $this->imageFields->add($imageField);
            $imageField->setForm($this);
        }
        return $this;
    }

    public function removeImageField(Imagefield $imageField) {
        if($this->imageFields->removeElement($imageField)){
            if($imageField->getForm() === $this) {
                $imageField->setForm(null);
            }
        }
    }

    public function updateImageFields(Collection $newImageFields){
        foreach ($this->imageFields as $imageField) {
            if(!$newImageFields->contains($imageField)){
                $this->removeImageField($imageField);
            }
        }
        foreach ($newImageFields as $newImageField) {
            if($this->imageFields->contains($newImageField)){
                $this->addImageField($newImageField);
            }
        }
    }

    public function getTextFields() {
        return $this->textFields;
    }

    public function addTextField(TextField $textField){
        if(!$this->textFields->contains($textField)){
            $this->textFields->add($textField);
            $textField->setForm($this);
        }
    }

    public function removeTextField(TextField $textField) {
        if($this->textFields->removeElement($textField)){
            if($textField->getForm() === $this) {
                $textField->setForm(null);
            }
        }
    }

    public function updateTextFields(Collection $newTextFields){
        foreach ($this->textFields as $textField) {
            if(!$newTextFields->contains($textField)){
                $this->removeTextField($textField);
            }
        }
        foreach ($newTextFields as $newTextField) {
            if(!$this->textFields->contains($newTextField)){
                $this->addTextField($newTextField);
            }
        }
    }

    public function getQuestions() {
        return $this->questions;
    }

    public function addQuestion(Question $question){
        if(!$this->questions->contains($question)){
            $this->questions->add($question);
            $question->setForm($this);
        }
    }

    public function removeQuestion(Question $question) {
        if($this->questions->removeElement($question)){
            if($question->getForm() === $this) {
                $question->setForm(null);
            }
        }
    }

    public function updateQuestionFields(Collection $newQuestions) {
        foreach ($this->questions as $question) {
            if(!$newQuestions->contains($question)){
                $this->removeQuestion($question);
            }
        }
        foreach ($newQuestions as $newQuestion) {
            if(!$this->questions->contains($newQuestion)){
                $this->addQuestion($newQuestion);
            }
        }
    }

    public function getResponses() {
        return $this->responses;
    }

    public function addResponse(Response $newResponse) {
        if(!$this->responses->contains($newResponse)){
            $this->responses->add($newResponse);
            return $this;
        }
    }
    public function removeResponse(Response $response) {
        if($this->responses->removeElement($response)){
            $response->setForm(null);
        }
        return $this;
    }

    public function getComments () {
        return $this->comments;
    }

    public function addComment(Comment $comment){
        if(!$this->comments->contains($comment)) {
            $this->comments->add($comment);
        }
        return $this;
    }

    public function removeComment(Comment $comment) {
        if($this->comments->removeElement($comment)) {
            $comment->setForm(null);
        }
        return $this;
    }

    /**
     * @return Collection<int, FormLike>
     */
    public function getFormLikes(): Collection
    {
        return $this->formLikes;
    }

    public function addFormLike(FormLike $formLike): static
    {
        if (!$this->formLikes->contains($formLike)) {
            $this->formLikes->add($formLike);
            $formLike->setForm($this);
        }

        return $this;
    }

    public function removeFormLike(FormLike $formLike): static
    {
        if ($this->formLikes->removeElement($formLike)) {
            // set the owning side to null (unless already changed)
            if ($formLike->getForm() === $this) {
                $formLike->setForm(null);
            }
        }

        return $this;
    }
}
