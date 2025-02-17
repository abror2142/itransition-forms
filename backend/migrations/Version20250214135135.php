<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250214135135 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE image_field ADD image VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE image_field ADD caption VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE image_field RENAME COLUMN image_url TO title');
        $this->addSql('ALTER TABLE image_field RENAME COLUMN "order" TO sequence');
        $this->addSql('ALTER TABLE text_field RENAME COLUMN "order" TO sequence');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE text_field RENAME COLUMN sequence TO "order"');
        $this->addSql('ALTER TABLE image_field ADD image_url VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE image_field DROP title');
        $this->addSql('ALTER TABLE image_field DROP image');
        $this->addSql('ALTER TABLE image_field DROP caption');
        $this->addSql('ALTER TABLE image_field RENAME COLUMN sequence TO "order"');
    }
}
