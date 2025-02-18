<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250218102918 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE form_like (id SERIAL NOT NULL, form_id INT DEFAULT NULL, owner_id INT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_384244A45FF69B7D ON form_like (form_id)');
        $this->addSql('CREATE INDEX IDX_384244A47E3C61F9 ON form_like (owner_id)');
        $this->addSql('COMMENT ON COLUMN form_like.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE form_like ADD CONSTRAINT FK_384244A45FF69B7D FOREIGN KEY (form_id) REFERENCES form (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE form_like ADD CONSTRAINT FK_384244A47E3C61F9 FOREIGN KEY (owner_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE form_like DROP CONSTRAINT FK_384244A45FF69B7D');
        $this->addSql('ALTER TABLE form_like DROP CONSTRAINT FK_384244A47E3C61F9');
        $this->addSql('DROP TABLE form_like');
    }
}
