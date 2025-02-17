<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250214153842 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE form ADD type_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE form ADD CONSTRAINT FK_5288FD4FC54C8C93 FOREIGN KEY (type_id) REFERENCES form_type (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_5288FD4FC54C8C93 ON form (type_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE form DROP CONSTRAINT FK_5288FD4FC54C8C93');
        $this->addSql('DROP INDEX IDX_5288FD4FC54C8C93');
        $this->addSql('ALTER TABLE form DROP type_id');
    }
}
