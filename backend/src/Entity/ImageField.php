<?php 

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity]
#[ApiResource(
    normalizationContext: ['groups' => ['image:read']],
    denormalizationContext: ['groups' => ['image:write']]
)]
class ImageField
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['form:read', 'image:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Form::class, inversedBy: "imageFields")]
    private ?Form $form;

    #[ORM\Column]
    #[Groups(['form:read', 'image:read'])]
    private string $title;

    #[ORM\Column]
    #[Groups(['form:read', 'image:read'])]
    private string $image;

    #[ORM\Column(nullable: True)]
    #[Groups(['form:read', 'image:read'])]
    private ?string $caption = null;

    #[ORM\Column]
    #[Groups(['form:read', 'image:read'])]
    private ?int $sequence = null;

    public function getId(){
        return $this->id;
    }

    public function getForm(){
        return $this->form;
    }

    public function setForm(?Form $form){
        $this->form = $form;
        return $this;
    }

    public function getImage(){
        return $this->image;
    }

    public function setImage(string $image){
        $this->image = $image;
        return $this;
    }
    public function getTitle(){
        return $this->title;
    }

    public function setTitle(string $title){
        $this->title = $title;
        return $this;
    }

    public function getCaption(){
        return $this->caption;
    }

    public function setCaption(?string $caption){
        $this->caption = $caption;
        return $this;
    }

    public function getSequence(){
        return $this->sequence;
    }

    public function setSequence(int $sequence){
        $this->sequence = $sequence;
        return $this;
    }

    #[Groups(['form:read'])]
    public function getType(): string
    {
        return 'image';
    }

}