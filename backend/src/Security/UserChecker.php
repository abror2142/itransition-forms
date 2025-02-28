<?php 

namespace App\Security;

use App\Enum\UserStatus;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAccountStatusException;
use Symfony\Component\Security\Core\User\UserCheckerInterface;

class UserChecker implements UserCheckerInterface {
    public function checkPreAuth(\Symfony\Component\Security\Core\User\UserInterface $user): void
    {
        if (!$user instanceof \App\Entity\User) {
            return;
        }

        if($user->getStatus() == UserStatus::Blocked || $user->getStatus() == UserStatus::Suspended){
            throw new CustomUserMessageAccountStatusException("Your account is blocked!");
        }

        if(!$user->getIsVerified()){
            throw new CustomUserMessageAccountStatusException("Your account is not verified!");
        }
    }

    public function checkPostAuth(\Symfony\Component\Security\Core\User\UserInterface $user): void
    {

    }
}