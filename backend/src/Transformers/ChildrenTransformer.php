<?php

namespace App\Transformers;

use App\Entity\ElementChild;
use App\Entity\Tag;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Doctrine\Common\Collections\ArrayCollection;

class ChildrenTransformer {
    private EntityManagerInterface $entityManager;
    private ValidatorInterface $validator;

    public function __construct(EntityManagerInterface $entityManager, ValidatorInterface $validator) 
    {
        $this->entityManager = $entityManager;
        $this->validator = $validator;
    }

    public function transform(array $childrenDtos) {
        $children = new ArrayCollection();

        foreach ($childrenDtos as $childDto) {
            $errors = $this->validator->validate($childDto);
            if(count($errors) > 0) {
                throw new \InvalidArgumentException("Invalid tag name" . (string)$errors);
            }
            
                $child = new ElementChild();
                $child->setName($childDto['name']);
                $this->entityManager->persist($tag);
                $this->entityManager->flush();
            
            $children[] = $child;
        }
        return $children;
    }

}