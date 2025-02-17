<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250211115314 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE element_child ALTER type DROP NOT NULL');
        $this->addSql('ALTER TABLE question ADD image VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE question RENAME COLUMN text TO title');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE element_child ALTER type SET NOT NULL');
        $this->addSql('ALTER TABLE question DROP image');
        $this->addSql('ALTER TABLE question RENAME COLUMN title TO text');
    }
}
