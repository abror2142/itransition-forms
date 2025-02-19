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
    public function createSearchQueryBuilder()
    {
        return $this->createQueryBuilder('f')
            ->select('f, c, q, tf, if')
            ->leftJoin('f.comments', 'c')
            ->leftJoin('f.questions', 'q')
            ->leftJoin('f.textFields', 'tf')
            ->leftJoin('f.imageFields', 'if');
    }
}