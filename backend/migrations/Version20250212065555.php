<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250212065555 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE element_attribute_question DROP CONSTRAINT fk_316578dd1e2b57f7');
        $this->addSql('ALTER TABLE element_attribute_question DROP CONSTRAINT fk_316578dd1e27f6bf');
        $this->addSql('DROP TABLE element_attribute_question');
        $this->addSql('ALTER TABLE element_attribute ADD question_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE element_attribute ADD CONSTRAINT FK_5271C1D01E27F6BF FOREIGN KEY (question_id) REFERENCES question (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_5271C1D01E27F6BF ON element_attribute (question_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE TABLE element_attribute_question (element_attribute_id INT NOT NULL, question_id INT NOT NULL, PRIMARY KEY(element_attribute_id, question_id))');
        $this->addSql('CREATE INDEX idx_316578dd1e27f6bf ON element_attribute_question (question_id)');
        $this->addSql('CREATE INDEX idx_316578dd1e2b57f7 ON element_attribute_question (element_attribute_id)');
        $this->addSql('ALTER TABLE element_attribute_question ADD CONSTRAINT fk_316578dd1e2b57f7 FOREIGN KEY (element_attribute_id) REFERENCES element_attribute (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE element_attribute_question ADD CONSTRAINT fk_316578dd1e27f6bf FOREIGN KEY (question_id) REFERENCES question (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE element_attribute DROP CONSTRAINT FK_5271C1D01E27F6BF');
        $this->addSql('DROP INDEX IDX_5271C1D01E27F6BF');
        $this->addSql('ALTER TABLE element_attribute DROP question_id');
    }
}
