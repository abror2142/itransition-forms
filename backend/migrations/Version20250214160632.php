<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250214160632 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE question DROP CONSTRAINT fk_b6f7494e1f1f2a24');
        $this->addSql('DROP INDEX idx_b6f7494e1f1f2a24');
        $this->addSql('ALTER TABLE question RENAME COLUMN element_id TO question_type_id');
        $this->addSql('ALTER TABLE question ADD CONSTRAINT FK_B6F7494ECB90598E FOREIGN KEY (question_type_id) REFERENCES element (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_B6F7494ECB90598E ON question (question_type_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE question DROP CONSTRAINT FK_B6F7494ECB90598E');
        $this->addSql('DROP INDEX IDX_B6F7494ECB90598E');
        $this->addSql('ALTER TABLE question RENAME COLUMN question_type_id TO element_id');
        $this->addSql('ALTER TABLE question ADD CONSTRAINT fk_b6f7494e1f1f2a24 FOREIGN KEY (element_id) REFERENCES element (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_b6f7494e1f1f2a24 ON question (element_id)');
    }
}
