<?php 

declare(strict_types=1);

namespace App\Enum;

enum UserStatus: string
{
   case Blocked = 'BLOCKED';
   case Active = 'ACTIVE';
   case Suspended = 'SUSPENDED';
}