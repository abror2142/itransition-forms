<?php

namespace App\Repository;

use App\Entity\RefreshToken;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method RefreshToken|null find($id, $lockMode = null, $lockVersion = null)
 * @method RefreshToken|null findOneBy(array $criteria, array $orderBy = null)
 * @method RefreshToken[]    findAll()
 * @method RefreshToken[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RefreshTokenRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
         parent::__construct($registry, RefreshToken::class);
    }

    /**
     * Finds the user identifier associated with the given refresh token.
     *
     * @param string $token The refresh token value
     * @return string|null The username (or user identifier) if found; null otherwise
     */
    public function findUserByToken(string $token): ?string
    {
         // Look for a RefreshToken entity by its "refreshToken" property
         $refreshToken = $this->findOneBy(['refreshToken' => $token]);

         if (!$refreshToken) {
             return null;
         }

         // Assuming your entity (or its parent) has a getUsername() method
         return $refreshToken->getUsername();
    }
}
