<?php 

namespace App\Repository;

use App\Entity\Form;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class FormRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Form::class);
    }

    public function findLatest(int $limit=5) {
        $qb = $this->createQueryBuilder('f')
            ->orderBy('f.createdAt', 'DESC')
            ->setMaxResults($limit);
        $query = $qb->getQuery();
        return $query->execute();
    }

    public function findFormsWithResponseCount(int $userId) {
        $conn = $this->getEntityManager()->getConnection();

        $sql = '
           SELECT 
                f.id, 
                f.title,
                f.topic_id,
                t."name" as topic_name,
                f.type_id ,
                ft."name" as type_name,
                COUNT(distinct r.id) as response_count, 
                COUNT(distinct fu.user_id) as user_count, 
                f.created_at
            FROM form f
            left join response r
            on r.form_id = f.id
            left join form_users fu 
            on fu.form_id = f.id
            join form_type ft 
            on ft.id = f.type_id 
            join topic t 
            on t.id = f.topic_id
            GROUP BY f.id, f.title, f.topic_id, t."name", f.type_id, ft."name", f.created_at
            having f.owner_id = :user
            order by f.created_at DESC
        ';

        $resultSet = $conn->executeQuery($sql, ['user' => $userId]);
        return $resultSet->fetchAllAssociative();
    }

}