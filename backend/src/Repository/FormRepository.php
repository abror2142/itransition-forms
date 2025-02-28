<?php 

namespace App\Repository;

use App\Entity\Form;
use App\Entity\User;
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

    public function findMostPopular() {
        $conn = $this->getEntityManager()->getConnection();

        $sql = '
            select 
                r.form_id,
                count(r.form_id) as response
            from response r
            join form f 
            on f.id = r.form_id
            group by r.form_id, f.title
            order by response desc
            limit 5;
        ';

        $resultSet = $conn->executeQuery($sql);
        return $resultSet->fetchAllAssociative();
    }

    public function findLatestByUser(User $user, int $limit=14) {
        $qb = $this->createQueryBuilder('f')
            ->where('f.owner = :user')
            ->orderBy('f.createdAt', 'DESC')
            ->setMaxResults($limit)
            ->setParameter('user', $user);
        $query = $qb->getQuery();
        return $query->execute();
    }
    

    public function findFormsWithResponseCount(int $userId, int $limit=10) {
    
        $conn = $this->getEntityManager()->getConnection();

        $sql = '
            SELECT 
                f.id, 
                f.title,
                f.topic_id,
                f.description,
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
            limit :limit;
        ';
        
        $resultSet = $conn->executeQuery($sql, ['user' => $userId, 'limit' => $limit]);
        return $resultSet->fetchAllAssociative();
    }

    public function formCreationCountByData(int $userId){
        $conn = $this->getEntityManager()->getConnection();

        $sql = '
            select 
                COUNT(f.id) as count,
                date(f.created_at) as date
            from form f
            where owner_id = :user
            group by date(f.created_at)
            order by date;
        ';

        $resultSet = $conn->executeQuery($sql, ['user' => $userId]);
        return $resultSet->fetchAllAssociative();
    }

}