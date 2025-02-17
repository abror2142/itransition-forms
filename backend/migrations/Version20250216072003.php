<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250216072003 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE answer (id SERIAL NOT NULL, response_id INT NOT NULL, question_id INT NOT NULL, content JSON NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_DADD4A25FBF32840 ON answer (response_id)');
        $this->addSql('CREATE INDEX IDX_DADD4A251E27F6BF ON answer (question_id)');
        $this->addSql('CREATE TABLE response (id SERIAL NOT NULL, owner_id INT DEFAULT NULL, form_id INT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_3E7B0BFB7E3C61F9 ON response (owner_id)');
        $this->addSql('CREATE INDEX IDX_3E7B0BFB5FF69B7D ON response (form_id)');
        $this->addSql('COMMENT ON COLUMN response.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE answer ADD CONSTRAINT FK_DADD4A25FBF32840 FOREIGN KEY (response_id) REFERENCES response (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE answer ADD CONSTRAINT FK_DADD4A251E27F6BF FOREIGN KEY (question_id) REFERENCES question (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE response ADD CONSTRAINT FK_3E7B0BFB7E3C61F9 FOREIGN KEY (owner_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE response ADD CONSTRAINT FK_3E7B0BFB5FF69B7D FOREIGN KEY (form_id) REFERENCES form (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE answer DROP CONSTRAINT FK_DADD4A25FBF32840');
        $this->addSql('ALTER TABLE answer DROP CONSTRAINT FK_DADD4A251E27F6BF');
        $this->addSql('ALTER TABLE response DROP CONSTRAINT FK_3E7B0BFB7E3C61F9');
        $this->addSql('ALTER TABLE response DROP CONSTRAINT FK_3E7B0BFB5FF69B7D');
        $this->addSql('DROP TABLE answer');
        $this->addSql('DROP TABLE response');
    }
}
