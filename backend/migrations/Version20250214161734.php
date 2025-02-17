<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250214161734 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE form_users (user_id INT NOT NULL, form_id INT NOT NULL, PRIMARY KEY(user_id, form_id))');
        $this->addSql('CREATE INDEX IDX_97C4012AA76ED395 ON form_users (user_id)');
        $this->addSql('CREATE INDEX IDX_97C4012A5FF69B7D ON form_users (form_id)');
        $this->addSql('ALTER TABLE form_users ADD CONSTRAINT FK_97C4012AA76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE form_users ADD CONSTRAINT FK_97C4012A5FF69B7D FOREIGN KEY (form_id) REFERENCES form (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE form_users DROP CONSTRAINT FK_97C4012AA76ED395');
        $this->addSql('ALTER TABLE form_users DROP CONSTRAINT FK_97C4012A5FF69B7D');
        $this->addSql('DROP TABLE form_users');
    }
}
