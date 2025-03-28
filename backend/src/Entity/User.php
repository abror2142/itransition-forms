<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Enum\UserRole;
use App\Enum\UserStatus;
use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use App\Entity\Response;
use Gedmo\Mapping\Annotation as Gedmo;
use Doctrine\DBAL\Types\Types;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]
#[UniqueEntity(fields: ['email'], message: 'There is already an account with this email')]
#[ApiResource(
    normalizationContext: ['groups' => ['meta:read']],
    denormalizationContext: ['groups' => ['user:write']]
)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    public function __construct() {
        $this->forms = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->formLikes = new ArrayCollection();
        $this->verificationTokens = new ArrayCollection();   
    }

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['user:read', 'meta:read', 'form:read', 'comment:read', 'user:profile'])]
    private ?int $id = null;

    #[ORM\Column(length: 180)]
    #[Groups(['user:read', 'meta:read', 'user:profile'])]
    private ?string $email = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['user:read', 'meta:read', 'form:read', 'comment:read', 'user:profile'])]
    private ?string $fullName = null;

    #[ORM\ManyToMany(targetEntity: Form::class, inversedBy: "users")]
    #[ORM\JoinTable(name: "form_users")]
    private Collection $forms;

    #[ORM\OneToMany(targetEntity: Response::class, mappedBy: 'user', cascade: ['persist', 'remove'])]
    private Collection $responses;    

    #[ORM\Column(nullable: true, enumType:UserStatus::class)]
    #[Groups(['user:read', 'meta:read', 'user:profile'])]
    private UserStatus $status = UserStatus::Active;

    #[ORM\Column(nullable: true)]
    #[Groups(['user:profile', 'user:read', 'meta:read'])]
    public ?string $image = null;

    /**
     * @var list<string> The user roles
     */
    #[ORM\Column]
    #[Groups(['user:read', 'meta:read', 'user:profile'])]
    private array $roles = [UserRole::User];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    /**
     * @var Collection<int, Comment>
     */
    #[ORM\OneToMany(targetEntity: Comment::class, mappedBy: 'owner')]
    private Collection $comments;

    /**
     * @var Collection<int, FormLike>
     */
    #[ORM\OneToMany(targetEntity: FormLike::class, mappedBy: 'owner')]
    private Collection $formLikes;

    /**
     * @var Collection<int, VerificationToken>
     */
    #[ORM\OneToMany(targetEntity: VerificationToken::class, mappedBy: 'owner', orphanRemoval: true)]
    private Collection $verificationTokens;

    #[ORM\Column(nullable: true)]
    #[Groups(['user:read', 'meta:read', 'user:profile'])]
    private bool $isVerified = false;

    #[ORM\Column(nullable: true)]
    #[Groups(['user:profile'])]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(type: Types::DATETIME_IMMUTABLE, nullable: true)]
    #[Gedmo\Timestampable(on: 'update')]
    #[Groups(['user:profile'])]
    public ?\DateTimeImmutable $updatedAt = null;

    #[ORM\Column(nullable: true, length:50)]
    public ?string $salesAccountId = null;

    #[ORM\Column(nullable: true, length:100)]
    public ?string $odooToken = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getFullName() {
        return $this->fullName;
    }

    public function setFullName(string $fullName) 
    {
        $this->fullName = $fullName;
        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     *
     * @return list<string>
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    public function getStatus () {
        return $this->status;
    }

    public function setStatus (UserStatus $status) {
        $this->status = $status;
        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    public function getImage()
    {
        return $this->image;
    }

    public function setImage(?string $image)
    {
        $this->image = $image;
        return $this;
    }

    public function getIsVerified(): bool
    {
        return $this->isVerified;
    }

    public function setIsVerified(bool $isVerified): static
    {
        $this->isVerified = $isVerified;

        return $this;
    }


    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getForms() 
    {
        return $this->forms;
    }

    public function addForm(Form $form)
    {
        if(!$this->forms->contains($form)){
            $this->forms->add($form);
            $form->addUser($this);
        }
        return $this;
    }

    public function removeForm(Form $form)
    {
        if($this->forms->removeElement($form)){
            $form->removeUser($this);
        }
    } 

    public function getResponses(){
        return $this->responses;
    }

    public function addResponse(Response $newResponse){
        if(!$this->responses->contains($newResponse)){
            $this->responses->add($newResponse);
        }
    }

    public function removeResponse(Response $response){
        if($this->responses->removeElement($response)){
            $response->setOwner(null);
        }
    }

    /**
     * @return Collection<int, Comment>
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): static
    {
        if (!$this->comments->contains($comment)) {
            $this->comments->add($comment);
            $comment->setOwner($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): static
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getOwner() === $this) {
                $comment->setOwner(null);
            }
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
            $formLike->setOwner($this);
        }

        return $this;
    }

    public function removeFormLike(FormLike $formLike): static
    {
        if ($this->formLikes->removeElement($formLike)) {
            // set the owning side to null (unless already changed)
            if ($formLike->getOwner() === $this) {
                $formLike->setOwner(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, VerificationToken>
     */
    public function getVerificationTokens(): Collection
    {
        return $this->verificationTokens;
    }

    public function addVerificationToken(VerificationToken $verificationToken): static
    {
        if (!$this->verificationTokens->contains($verificationToken)) {
            $this->verificationTokens->add($verificationToken);
            $verificationToken->setOwner($this);
        }

        return $this;
    }

    public function removeVerificationToken(VerificationToken $verificationToken): static
    {
        if ($this->verificationTokens->removeElement($verificationToken)) {
            // set the owning side to null (unless already changed)
            if ($verificationToken->getOwner() === $this) {
                $verificationToken->setOwner(null);
            }
        }
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

    public function getSalesAccountId() 
    {
        return $this->salesAccountId;
    }

    public function setSalesAccountId(string $salesAccountId)
    {
        $this->salesAccountId = $salesAccountId;
        return $this;
    }

    public function getOdooToken() 
    {
        return $this->odooToken;
    }

    public function setOdooToken(string $odooToken)
    {
        $this->odooToken = $odooToken;
        return $this;
    }
}
