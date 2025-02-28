<?php

namespace App\Controller;

set_time_limit(600);

use App\Entity\Answer;
use App\Entity\Element;
use App\Entity\ElementChild;
use App\Entity\Form;
use App\Entity\FormType;
use App\Entity\ImageField;
use App\Entity\Question;
use App\Entity\TextField;
use App\Entity\User;
use App\Entity\Topic;
use App\Entity\Tag;
use App\Entity\Response as Respond;
use ApiPlatform\Validator\ValidatorInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\DTO\FormValidationDto;
use App\DTO\AnswerDto;
use App\Transformers\TagTransformer;

final class FormController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private SerializerInterface $serializer;
    private Security $security;
    private ValidatorInterface $validator;
    public function __construct(
        EntityManagerInterface $entityManager,
        SerializerInterface $serializer,
        Security $security,
        ValidatorInterface $validator,
    ) {
        $this->entityManager = $entityManager;
        $this->serializer = $serializer;
        $this->security = $security;
        $this->validator = $validator;
    }

    #[Route('/api/form-meta', name: 'app_form_meta', methods: ['GET'])]
    public function getMetaData(EntityManagerInterface $entityManager, SerializerInterface $serializer)
    {
        $topics = $entityManager->getRepository(Topic::class)->findAll();
        $tags = $entityManager->getRepository(Tag::class)->findAll();
        $users = $entityManager->getRepository(User::class)->findAll();
        $types = $entityManager->getRepository(FormType::class)->findAll();
        $data = ["topics" => $topics, "tags" => $tags, "users" => $users, "types" => $types];
        $json = $serializer->serialize($data, 'json', ['groups' => ['meta:read']]);
        return new JsonResponse($json, 200);
    }

    #[Route('/api/form/{id}/answer', name: 'app_form_answer', methods: ['POST'], requirements: ['id' => '\d+'])]
    public function answer(int $id, Request $request) {
        $user = $this->security->getUser();
        if (!$user) {
            return new JsonResponse(['message' => "Credentials are not founnd!"]);
        }

        $form = $this->entityManager->getRepository(Form::class)->findOneBy(['id' => $id]);
        if (!$form) {
            return new JsonResponse(['error' => "Form not Found!"], Response::HTTP_NOT_FOUND);
        }

        // $responses = $this->entityManager->getRepository(Respond::class)->count(['owner' => $user, 'form' => $form]);
        // if($responses > 0)
        //     return new JsonResponse(['error' => 'You have already filled this form!'], Response::HTTP_BAD_REQUEST);
        
        $json = $request->getContent();
        try {
            $answerDto = $this->serializer->deserialize($json, AnswerDto::class, 'json');
        } catch (\Exception $e) {
            return new JsonResponse([
                'error' => 'Invalid JSON data.',
                'details' => $e->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }

        $errors = $this->validator->validate($answerDto) ?: [];
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()] = $error->getMessage();
            }
            return new JsonResponse(['errors' => $errorMessages], Response::HTTP_BAD_REQUEST);
        }
        
        $response = new Respond();
        $response->setForm($form);
        $response->setOwner($user);
        $response->setCreatedAt();

        $this->entityManager->persist($response);
        $this->entityManager->flush();

        foreach ($answerDto->answers as $questionId => $answerContent) {
            $question = $this->entityManager->getRepository(Question::class)->findOneBy(['id' => $questionId]);
            
            $typeId = $question->getQuestionType();
            $type = $this->entityManager->getRepository(Element::class)->findOneBy(['id' => $typeId]);

            $answer = new Answer();
            $answer->setQuestion($question);
            $answer->setResponse($response);
            
            if($type->getName() == "Multiple Choice"){
                $option = $this->entityManager->getRepository(ElementChild::class)->findOneBy(['id' => $answerContent]);
                $answer->setAnswerMultipleChoice($option);
            }else if($type->getName() == "Text"){
                $answer->setAnswerText($answerContent);
            }else if($type->getName() == "Paragraph"){
                $answer->setAnswerParagraph($answerContent);
            }else if($type->getName() == "Integer"){
                $answer->setAnswerInteger($answerContent); 
            }else if($type->getName() == "Checkbox"){
                foreach ($answerContent as $optionId) {
                    $option = $this->entityManager->getRepository(ElementChild::class)->findOneBy(['id' => $optionId]);
                    $answer->addOption($option);
                }
            } 
            
            $this->entityManager->persist($answer);
            $this->entityManager->flush();
        }       

        return new JsonResponse(['message' => "Rescieved!"]);        
    }


    #[Route('/api/form/{id}/update', name: 'app_form_update', methods: ['PUT'], requirements: ['id' => '\d+'])]
    public function update(int $id, Request $request, TagTransformer $tagTransformer)
    {   

        $user = $this->security->getUser();
        if (!$user) {
            return new JsonResponse(['message' => "Credentials are not founnd!"]);
        }

        // Check for permission!!!
        $json = $request->getContent();
        try {
            $formDataDto = $this->serializer->deserialize($json, FormValidationDto::class, 'json');
        } catch (\Exception $e) {
            return new JsonResponse([
                'error' => 'Invalid JSON data.',
                'details' => $e->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }

        $errors = $this->validator->validate($formDataDto) ?: [];
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()] = $error->getMessage();
            }
            return new JsonResponse(['errors' => $errorMessages], Response::HTTP_BAD_REQUEST);
        }

        // I have Clean data now.
        $form = $this->entityManager->getRepository(Form::class)->findOneBy(['id' => $formDataDto->formInfo->id]);
        if (!$form) {
            return new JsonResponse(['error' => "Form not Found!"], Response::HTTP_NOT_FOUND);
        }


        $topic = $this->entityManager->getRepository(Topic::class)->findOneBy(["id" => $formDataDto->formInfo->topic->id]);
        if (!$topic) {
            return new JsonResponse(['message' => 'Topic must be valid!']);
        }

        $type = $this->entityManager->getRepository(FormType::class)->findOneBy(["id" => $formDataDto->formInfo->type->id]);
        if (!$type) {
            return new JsonResponse(['message' => 'Type must be valid!']);
        }
        $form->setTopic($topic);
        $form->setType($type);
        $form->setTitle($formDataDto->formInfo->title);
        $form->setDescription($formDataDto->formInfo->description);
        $form->setCreatedAt();
        $form->setImage($formDataDto->formInfo->image);

        // Update tags to newly given tags
        $form->updateTags($tagTransformer->transform($formDataDto->formInfo->tags));

        $users = new ArrayCollection();
        foreach ($formDataDto->formInfo->users as $user) {
            $u = $this->entityManager->getRepository(User::class)->findOneBy(["id" => $user['id']]);
            if ($u) {
                $users[] = $u;
            }
        }
        $form->updateUsers($users);
        $this->entityManager->persist($form);
        $this->entityManager->flush();

        // Now time for Questions!
        $questionFields = new ArrayCollection();
        $imageFields = new ArrayCollection();
        $textFields = new ArrayCollection();
        foreach ($formDataDto->formFields as $formField) {
            if ($formField['type'] == 'question') {
                $options = new ArrayCollection();
                $questionEntity = null;
                if(is_numeric($formField['id'])){
                    $questionEntity = $this->entityManager->getRepository(Question::class)->findOneBy(['id' => $formField['id']]);
                }
                if (!$questionEntity) {
                    $questionEntity = new Question();
                    $questionEntity->setForm($form);
                }
                $questionEntity->setTitle($formField['title']);
                $questionEntity->setSequence($formField['sequence']);
                $questionEntity->setDescription($formField['description']);
                $questionEntity->setImage($formField['image']);
                $questionEntity->setRequired($formField['required']);

                $element = $this->entityManager->getRepository(Element::class)->findOneBy(['id' => $formField['questionType']['id']]);
                $questionEntity->setQuestionType($element);

                $this->entityManager->persist($questionEntity);
                $this->entityManager->flush();

                foreach ($formField['options'] as $option) {
                    $newOption = null;
                    if(is_numeric($option['id'])){
                        $newOption = $this->entityManager->getRepository(ElementChild::class)->findOneBy(['id' => $option['id']]);
                    }
                    if (!$newOption) {
                        $newOption = new ElementChild();
                        $newOption->setQuestion($questionEntity);
                    }
                    $newOption->setContent($option['content']);
                    $this->entityManager->persist($newOption);
                    $this->entityManager->flush();
                    $questionEntity->addOption($newOption);
                    $options[] = $newOption;
                }
                $questionEntity->updateOptions($options);
                $this->entityManager->persist($questionEntity);
                $this->entityManager->flush();
                $questionFields[] = $questionEntity;
            } else if ($formField['type'] == 'image') {
                $image = $this->entityManager->getRepository(ImageField::class)->findOneBy(['id' => $formField['id']]);

                if (!$image) {
                    $image = new ImageField();  // Create one!
                    $image->setForm($form);
                }
                $image->setImage($formField['image']);
                $image->setTitle($formField['title']);
                $image->setCaption($formField['caption']);
                $image->setSequence($formField['sequence']);

                $this->entityManager->persist($image);
                $this->entityManager->flush();
                $imageFields[] = $image;

            } else if ($formField['type'] == 'text') {
                $text = $this->entityManager->getRepository(TextField::class)->findOneBy(['id' => $formField['id']]);
                if (!$text) {
                    $text = new TextField();
                    $text->setForm($form);
                }
                $text->setTitle($formField['title']);
                $text->setDescription($formField['description']);
                $text->setSequence($formField['sequence']);

                $this->entityManager->persist($text);
                $this->entityManager->flush();
                $textFields[] = $text;
            } else {
                return new JsonResponse(['message' => 'Unsupported form field type given!']);
            }
        }
        $this->entityManager->persist($form);
        $this->entityManager->flush();

        $form->updateQuestionFields($questionFields);
        $form->updateImageFields($imageFields);
        $form->updateTextFields($textFields);

        $this->entityManager->persist($form);
        $this->entityManager->flush();
        return new JsonResponse([]);
    }

    #[Route('/api/form/{id}/', name: 'app_form_view', methods: ['GET'], requirements: ['id' => '\d+'])]
    public function show(int $id)
    {
        $form = $this->entityManager->getRepository(Form::class)->findOneBy(['id' => $id]);
        $formData = $this->serializer->normalize($form, '[]', ['groups' => 'form:read']);

        $form = [
            "formInfo" => [
                "id" => $formData['id'],
                "title" => $formData['title'],
                "description" => $formData['description'],
                "type" => $formData['type'],
                "image" => $formData['image'],
                "tags" => $formData['tags'],
                "users" => $formData['users'],
                "topic" => $formData['topic'],
                "owner" => $formData['owner']
            ],
            "formFields" => [
                ...$formData['questions'],
                ...$formData['imageFields'],
                ...$formData['textFields'],
            ]
        ];
        $json = json_encode($form);
        return new JsonResponse($json, 200);
    }

    #[Route('/api/form-create', name: 'app_form_create', methods: ['POST'])]
    public function create(
        Request $request,
        SerializerInterface $serializer,
        ValidatorInterface $validator,
        Security $security,
        TagTransformer $tagTransformer
    ): JsonResponse {
        $user = $security->getUser();
        if (!$user) {
            return new JsonResponse(['message' => "Credentials are not founnd!"]);
        }

        $json = $request->getContent();
        try {
            $formDataDto = $serializer->deserialize($json, FormValidationDto::class, 'json');
        } catch (\Exception $e) {
            return new JsonResponse([
                'error' => 'Invalid JSON data.',
                'details' => $e->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }

        $errors = $validator->validate($formDataDto) ?: [];
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()] = $error->getMessage();
            }
            return new JsonResponse(['errors' => $errorMessages], Response::HTTP_BAD_REQUEST);
        }

        // Setting Topic for form;
        $topic = $this->entityManager->getRepository(Topic::class)->findOneBy(["id" => $formDataDto->formInfo->topic->id]);
        if (!$topic) {
            return new JsonResponse(['message' => 'Topic must be valid!']);
        }

        $type = $this->entityManager->getRepository(FormType::class)->findOneBy(["id" => $formDataDto->formInfo->type->id]);
        if (!$type) {
            return new JsonResponse(['message' => 'Type must be valid!']);
        }
        
        $form = new Form();
        $form->setTopic($topic)
            ->setType($type)
            ->setTitle($formDataDto->formInfo->title)
            ->setDescription($formDataDto->formInfo->description)
            ->setCreatedAt()
            ->setImage($formDataDto->formInfo->image)
            ->setOwner($user);

        // Update tags to newly given tags
        $form->updateTags($tagTransformer->transform($formDataDto->formInfo->tags));

        $users = new ArrayCollection();
        foreach ($formDataDto->formInfo->users as $userData) {
            $u = $this->entityManager->getRepository(User::class)->find(["id" => $userData['id']]);
            if ($u) {
                $users[] = $u;
            }
        }

        $form->updateUsers($users);
        $this->entityManager->persist($form);

        // Now time for Questions!
        foreach ($formDataDto->formFields as $formField) {
            $this->processFormField($formField, $form);

        }
      
        $this->entityManager->persist($form);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Recieved!']);
    }

    #[Route('/api/form/all', name: 'app_form_all', methods: ['GET'])]
    public function getAll(EntityManagerInterface $entityManager, SerializerInterface $serializer)
    {
        $forms = $entityManager->getRepository(Form::class)->findAll();
        $data = $serializer->serialize($forms, 'json', [
            'groups' => ['form:read']
        ]);
        return new JsonResponse($data, Response::HTTP_ACCEPTED);
    }

    #[Route('/api/form/{id}/delete', name: 'app_form_delete', methods: ['DELETE'], requirements: ['id' => '\d+'])]
    public function deletePost(int $id, Request $request) {
        $user = $this->security->getUser();
        if(!$user)
            return new JsonResponse(['error' => "User not Found!"]);

        $form = $this->entityManager->getRepository(Form::class)->findOneBy(['id' => $id]);
        if(!$form)
            return new JsonResponse(['error' => "Form not Found!", Response::HTTP_NOT_FOUND]);
    
        if($form->getOwner() != $user || !in_array('ROLE_ADMIN', $user->getRoles()))
            return new JsonResponse(['error' => "You don't have permission to delete this form."]);
        
        $this->entityManager->remove($form);
        return new JsonResponse(['success' => 'Successfully deleted.']);
    }

    public function processFormField (array $formField, Form $form) {
        switch ($formField['type']) {
            case 'question':
                $this->saveQuestion($formField, $form);
                break;
            case 'image':
                $this->saveImageField($formField, $form);
                break;
            case 'text':
                $this->saveTextField($formField, $form);
                break;
            default:
                throw new \InvalidArgumentException('Unsupported field type: ' . $formField['type']);
        }
    }

    public function saveQuestion (array $formField, $form) {
        $element = $this->entityManager->getRepository(Element::class)->findOneBy(['id' => $formField['questionType']['id']]);
           
        $questionEntity = new Question();  // Create new! 
        $questionEntity->setForm($form)
            ->setTitle($formField['title'])
            ->setSequence($formField['sequence'])
            ->setDescription($formField['description'])
            ->setImage($formField['image'])
            ->setRequired($formField['required'])
            ->setQuestionType($element);
        
        $this->entityManager->persist($questionEntity);
        
        foreach ($formField['options'] as $option) {
            $this->saveOption($questionEntity, $option);
        }

        $this->entityManager->persist($questionEntity);
    }

    public function saveOption (Question $question, array $optionData) {
        $newOption = new ElementChild();
        $newOption->setQuestion($question);
        $newOption->setContent($optionData['content']);
        $this->entityManager->persist($newOption);
    }

    public function saveImageField (array $formField, Form $form) {
        $image = new ImageField();
        $image->setForm($form)
            ->setImage($formField['image'])
            ->setTitle($formField['title'])
            ->setCaption($formField['caption'])
            ->setSequence($formField['sequence']);
        $this->entityManager->persist($image);
    }

    public function saveTextField (array $formField, $form) {
        $text = new TextField()
            ->setForm($form)
            ->setTitle($formField['title'])
            ->setDescription($formField['description'])
            ->setSequence($formField['sequence']);
        $this->entityManager->persist($text);
    }
}