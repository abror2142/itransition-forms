<?php

namespace App\Controller;

use App\Entity\Comment;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\DTO\CommentDto;
use App\Entity\Form;


final class CommentController extends AbstractController
{
    private Security $security;
    private EntityManagerInterface $entityManager;
    private ValidatorInterface $validator;
    private SerializerInterface $serializer;

    public function __construct(
        Security $security,
        EntityManagerInterface $entityManager,
        ValidatorInterface $validator,
        SerializerInterface $serializer,
    ) {
        $this->security = $security;
        $this->entityManager = $entityManager;
        $this->validator = $validator;
        $this->serializer = $serializer;
    }


    #[Route('/api/form/{id}/comment', name: 'app_comment', methods: ['GET'])]
    public function index(int $id, Request $request): Response
    {  
        $form = $this->entityManager->getRepository(Form::class)->findOneBy(['id' => $id]);
        if(!$form){
            return new JsonResponse(['error' => 'Form not found!'], Response::HTTP_NOT_FOUND);
        }
        $comments = $this->entityManager->getRepository(Comment::class)->findBy(['form' => $form]);
        $json = $this->serializer->serialize($comments, 'json', ['groups' => ['comment:read']]);
        return new JsonResponse($json, Response::HTTP_OK);
    }

    #[Route('/api/comment', name: 'app_comment_create', methods: ['POST'])]
    public function create(Request $request) {
        
        $user = $this->security->getUser();
        if(!$user){
            return new JsonResponse(['error' => "User not found!", Response::HTTP_BAD_REQUEST]);
        }

        $json = $request->getContent();
        try {
            $commentDto = $this->serializer->deserialize($json, CommentDto::class, 'json');
        } catch (\Exception $e) {
            return new JsonResponse([
                'error' => 'Invalid JSON data.',
                'details' => $e->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }

        $errors = $this->validator->validate($commentDto) ?: [];
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()] = $error->getMessage();
            }
            return new JsonResponse(['errors' => $errorMessages], Response::HTTP_BAD_REQUEST);
        }

        $form = $this->entityManager->getRepository(Form::class)->findOneBy(['id' => $commentDto->formId]);
        if(!$form){
            return new JsonResponse(['error' => 'Appropriate form not found!'], Response::HTTP_NOT_FOUND);
        }

        
        $comment = new Comment();
        
        $comment->setOwner($user);
        $comment->setForm($form);
        $comment->setContent($commentDto->content);
        $comment->setCreatedAt();
        $comment->setUpdatedAt(new \DateTime());
        
        $this->entityManager->persist($comment);
        $this->entityManager->flush();
            // dd($commentDto->parentId);
        $parent = null;
        if($commentDto->parentId){
            $parent = $this->entityManager->getRepository(Comment::class)->findOneBy(['id' => $commentDto->parentId]);
            if(!$parent){
                return new JsonResponse(['error' => 'Comment being replied is not found!', Response::HTTP_NOT_FOUND]);
            }
        }

        if($parent){
            $comment->setParent($parent);
        }

        $this->entityManager->persist($comment);
        $this->entityManager->flush();
        
        return new JsonResponse(['message' => 'created!']);
    }
}
