<?php

namespace App\Controller;

use App\Entity\FormLike;
use App\Entity\Form;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

final class FormLikeController extends AbstractController
{
    private Security $security;
    private EntityManagerInterface $entityManager;
    private SerializerInterface $serializer;

    public function __construct(
        Security $security,
        EntityManagerInterface $entityManager,
        SerializerInterface $serializer
    ) {
        $this->security = $security;
        $this->entityManager = $entityManager;
        $this->serializer = $serializer;
    }

    #[Route('api/form/{id}/like/create', name: 'app_form_like_create', methods: ['POST'], requirements: ['id' => '\d+'])]
    public function create(int $id): Response
    {
        $user = $this->security->getUser();
        if(!$user)
            return new JsonResponse(['error' => 'User not Found!'], Response::HTTP_NOT_FOUND);

        $form = $this->entityManager->getRepository(Form::class)->findOneBy(['id' => $id]);
        if(!$form)
            return new JsonResponse(['error' => 'Form not found!'], Response::HTTP_NOT_FOUND);

        $like = $this->entityManager->getRepository(FormLike::class)->findOneBy(['form' => $form, 'owner'=> $user]);
        if($like){
            $this->entityManager->remove($like);
            $this->entityManager->flush();
            return new JsonResponse(['messega' => 'Deleted'], Response::HTTP_NO_CONTENT);
        }else{
            $like = new FormLike();
            $like->setForm($form);
            $like->setOwner($user);
            $like->setCreatedAt(new \DateTimeImmutable());

            $this->entityManager->persist($like);
            $this->entityManager->flush();        
            return new JsonResponse(['messgae' => 'Like created!'], Response::HTTP_CREATED);
        }
    }

    #[Route('/form/{id}/like/count', name: 'app_form_like_count', methods: ['GET'], requirements: ['id' => '\d+'])]
    public function index(int $id): Response
    {
        $form = $this->entityManager->getRepository(Form::class)->findOneBy(['id' => $id]);
        if(!$form)
            return new JsonResponse(['error' => 'Form not found!'], Response::HTTP_NOT_FOUND);
    
        $formLikes = $this->entityManager->getRepository(FormLike::class)->count(['form' => $form]);

        $data = ['formLikes' => $formLikes];
        return new JsonResponse($data, Response::HTTP_OK);
    }

    #[Route('/api/form/{id}/like/check', name: 'app_form_like_check', methods: ['GET'], requirements: ['id' => '\d+'])]
    public function check(int $id): Response
    {
        $user = $this->security->getUser();
        
        $form = $this->entityManager->getRepository(Form::class)->findOneBy(['id' => $id]);
        if(!$form)
            return new JsonResponse(['error' => 'Form not found!'], Response::HTTP_NOT_FOUND);
        
        if($user){
            $userLike = $this->entityManager->getRepository(FormLike::class)->findOneBy(['owner' => $user, 'form' => $form]);        
            $liked = $userLike ? true : false;
        }

        $data = ['liked' => $liked];
        return new JsonResponse($data, Response::HTTP_OK);

    }
}
