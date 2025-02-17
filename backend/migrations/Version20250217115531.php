<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250217115531 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE checkbox_answers (answer_id INT NOT NULL, element_child_id INT NOT NULL, PRIMARY KEY(answer_id, element_child_id))');
        $this->addSql('CREATE INDEX IDX_B1978D4DAA334807 ON checkbox_answers (answer_id)');
        $this->addSql('CREATE INDEX IDX_B1978D4DB193BCB6 ON checkbox_answers (element_child_id)');
        $this->addSql('ALTER TABLE checkbox_answers ADD CONSTRAINT FK_B1978D4DAA334807 FOREIGN KEY (answer_id) REFERENCES answer (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE checkbox_answers ADD CONSTRAINT FK_B1978D4DB193BCB6 FOREIGN KEY (element_child_id) REFERENCES element_child (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE answer ADD answer_multiple_choice_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE answer ADD answer_integer INT DEFAULT NULL');
        $this->addSql('ALTER TABLE answer ADD answer_text VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE answer ADD answer_paragraph TEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE answer DROP content');
        $this->addSql('ALTER TABLE answer ADD CONSTRAINT FK_DADD4A25C0E4B16D FOREIGN KEY (answer_multiple_choice_id) REFERENCES element_child (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_DADD4A25C0E4B16D ON answer (answer_multiple_choice_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE checkbox_answers DROP CONSTRAINT FK_B1978D4DAA334807');
        $this->addSql('ALTER TABLE checkbox_answers DROP CONSTRAINT FK_B1978D4DB193BCB6');
        $this->addSql('DROP TABLE checkbox_answers');
        $this->addSql('ALTER TABLE answer DROP CONSTRAINT FK_DADD4A25C0E4B16D');
        $this->addSql('DROP INDEX IDX_DADD4A25C0E4B16D');
        $this->addSql('ALTER TABLE answer ADD content JSON NOT NULL');
        $this->addSql('ALTER TABLE answer DROP answer_multiple_choice_id');
        $this->addSql('ALTER TABLE answer DROP answer_integer');
        $this->addSql('ALTER TABLE answer DROP answer_text');
        $this->addSql('ALTER TABLE answer DROP answer_paragraph');
    }
}
