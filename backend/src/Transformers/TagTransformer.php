<?php

namespace App\Transformers;

use App\Entity\Tag;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Doctrine\Common\Collections\ArrayCollection;

class TagTransformer {
    private EntityManagerInterface $entityManager;
    private ValidatorInterface $validator;

    public function __construct(EntityManagerInterface $entityManager, ValidatorInterface $validator) 
    {
        $this->entityManager = $entityManager;
        $this->validator = $validator;
    }

    public function transform(array $tagDtos) {
        $tags = new ArrayCollection();

        foreach ($tagDtos as $tagDto) {
            $errors = $this->validator->validate($tagDto);
            if(count($errors) > 0) {
                throw new \InvalidArgumentException("Invalid tag name" . (string)$errors);
            }
            $tag = $this->entityManager->getRepository(Tag::class)->findOneBy(["name" => $tagDto['name']]);
            if(!$tag) {
                $tag = new Tag();
                $tag->setName($tagDto['name']);
                $tag->setCreatedAt();
                $this->entityManager->persist($tag);
                $this->entityManager->flush();
            }
            $tags[] = $tag;
        }
        return $tags;
    }

}