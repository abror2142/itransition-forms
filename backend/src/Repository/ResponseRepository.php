<?php

namespace App\Repository;

use App\Entity\Response;
use App\Entity\Form;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Response>
 */
class ResponseRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Response::class);
    }

    public function findResponseWithAnswersByUser (int $userId, int $offset=0, int $limit=10) {
        $conn = $this->getEntityManager()->getConnection();

        $sql = '
            select 
                r.id, 
                r.created_at, 
                f.id as form_id, 
                f.title as form_title, 
                u.email 
            from response r
            join form f
            on r.form_id = f.id
            join "user" u
            on r.owner_id = u.id
            where r.owner_id = :user
            limit :limit
            offset :offset;
        ';

        $result = $conn->executeQuery($sql, ['user' => $userId, 'limit' => $limit, 'offset' => $offset]);
        return $result->fetchAllAssociative();
    }

    public function findResponseWithDates (Form $form) {
        $conn = $this->getEntityManager()->getConnection();

        $sql = '
            select 
                count(r.id) as fillings,
                r.created_at::timestamp::date as date
            from response r
            where r.form_id = :form_id
            group by r.created_at::timestamp::date
            order by date;
        ';

        $result = $conn->executeQuery($sql, ['form_id' => $form->getId()]);
        return $result->fetchAllAssociative();
    }

}
