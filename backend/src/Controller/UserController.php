<?php

namespace App\Controller;

use App\Entity\Form;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Gedmo\Timestampable\TimestampableListener;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Routing\Attribute\Route;

final class UserController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private SerializerInterface $serializer;
    private Security $security;

    public function __construct(EntityManagerInterface $entityManager, SerializerInterface $serializer, Security $security){
        $this->entityManager = $entityManager;
        $this->serializer = $serializer;
        $this->security = $security;
    }

    #[Route('/api/dashboard/user/profile', name: 'app_user_profile', methods: ['GET'])]
    public function index(): Response
    {   
        $user = $this->security->getUser();
        if(!$user)
            return new JsonResponse(['error' => 'User not found'], Response::HTTP_NOT_FOUND);
        
        $userData = $this->entityManager->getRepository(User::class)->findOneBy(['email'=>$user->getUserIdentifier()]);
        $data = $this->serializer->serialize($userData, 'json', ['groups' => ['user:profile']]);
        return new JsonResponse($data, Response::HTTP_OK);
    }

    #[Route('/api/user/update/image', name: 'app_user_update_image', methods: ['POST'])]
    public function updateImage(Request $request)
    {
        $user = $this->security->getUser();
        if(!$user)
            return new JsonResponse(['error' => 'User nor found!']);
        
        # Add Timestampable listener
        $listener = new TimestampableListener();
        $em = $this->entityManager;
        $em->getEventManager()->addEventSubscriber($listener);
        
        $currentUser = $em->getRepository(User::class)->findOneBy(['email' => $user->getUserIdentifier()]);
        if(!$currentUser)
            return  new JsonResponse(['error' => 'User nor found!']);

        $image = $request->getPayload()->get('image');
        if(!$image)
            return new JsonResponse(['error' => 'Image url not found in request!'], Response::HTTP_BAD_REQUEST);

        $currentUser->setImage(image: $image);
        $em->persist($currentUser);
        $em->flush();

        return new JsonResponse(['success' => "Image updated!"], 200);
    }

    #[Route('/api/user/update/info', name: 'app_user_update_info', methods: ['POST'])]
    public function updateInfo(Request $request)
    {
        $user = $this->security->getUser();
        if(!$user)
            return new JsonResponse(['error' => 'User nor found!']);
        
        $currentUser = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $user->getUserIdentifier()]);
        if(!$currentUser)
            return  new JsonResponse(['error' => 'User nor found!']);

        $fullName = $request->getPayload()->get('fullName');
        if(!$fullName)
            return new JsonResponse(['error' => 'Full Name not found in request!'], Response::HTTP_BAD_REQUEST);

        $currentUser->setFullName($fullName);
        $this->entityManager->persist($currentUser);
        $this->entityManager->flush();

        return new JsonResponse(['success' => "Full Name updated!"], 200);
    }
}
