<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250211095022 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE element_attribute_question (element_attribute_id INT NOT NULL, question_id INT NOT NULL, PRIMARY KEY(element_attribute_id, question_id))');
        $this->addSql('CREATE INDEX IDX_316578DD1E2B57F7 ON element_attribute_question (element_attribute_id)');
        $this->addSql('CREATE INDEX IDX_316578DD1E27F6BF ON element_attribute_question (question_id)');
        $this->addSql('ALTER TABLE element_attribute_question ADD CONSTRAINT FK_316578DD1E2B57F7 FOREIGN KEY (element_attribute_id) REFERENCES element_attribute (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE element_attribute_question ADD CONSTRAINT FK_316578DD1E27F6BF FOREIGN KEY (question_id) REFERENCES question (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE element_attribute_element DROP CONSTRAINT fk_dbd21fa81e2b57f7');
        $this->addSql('ALTER TABLE element_attribute_element DROP CONSTRAINT fk_dbd21fa81f1f2a24');
        $this->addSql('DROP TABLE element_attribute_element');
        $this->addSql('ALTER TABLE element DROP CONSTRAINT fk_41405e391e27f6bf');
        $this->addSql('DROP INDEX uniq_41405e391e27f6bf');
        $this->addSql('ALTER TABLE element DROP question_id');
        $this->addSql('ALTER TABLE element_child DROP CONSTRAINT fk_e69120b01f1f2a24');
        $this->addSql('DROP INDEX idx_e69120b01f1f2a24');
        $this->addSql('ALTER TABLE element_child RENAME COLUMN element_id TO question_id');
        $this->addSql('ALTER TABLE element_child ADD CONSTRAINT FK_E69120B01E27F6BF FOREIGN KEY (question_id) REFERENCES question (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_E69120B01E27F6BF ON element_child (question_id)');
        $this->addSql('ALTER TABLE form ALTER updated_at DROP NOT NULL');
        $this->addSql('ALTER TABLE question ADD element_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE question ADD CONSTRAINT FK_B6F7494E1F1F2A24 FOREIGN KEY (element_id) REFERENCES element (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_B6F7494E1F1F2A24 ON question (element_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE TABLE element_attribute_element (element_attribute_id INT NOT NULL, element_id INT NOT NULL, PRIMARY KEY(element_attribute_id, element_id))');
        $this->addSql('CREATE INDEX idx_dbd21fa81f1f2a24 ON element_attribute_element (element_id)');
        $this->addSql('CREATE INDEX idx_dbd21fa81e2b57f7 ON element_attribute_element (element_attribute_id)');
        $this->addSql('ALTER TABLE element_attribute_element ADD CONSTRAINT fk_dbd21fa81e2b57f7 FOREIGN KEY (element_attribute_id) REFERENCES element_attribute (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE element_attribute_element ADD CONSTRAINT fk_dbd21fa81f1f2a24 FOREIGN KEY (element_id) REFERENCES element (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE element_attribute_question DROP CONSTRAINT FK_316578DD1E2B57F7');
        $this->addSql('ALTER TABLE element_attribute_question DROP CONSTRAINT FK_316578DD1E27F6BF');
        $this->addSql('DROP TABLE element_attribute_question');
        $this->addSql('ALTER TABLE question DROP CONSTRAINT FK_B6F7494E1F1F2A24');
        $this->addSql('DROP INDEX IDX_B6F7494E1F1F2A24');
        $this->addSql('ALTER TABLE question DROP element_id');
        $this->addSql('ALTER TABLE element ADD question_id INT NOT NULL');
        $this->addSql('ALTER TABLE element ADD CONSTRAINT fk_41405e391e27f6bf FOREIGN KEY (question_id) REFERENCES question (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE UNIQUE INDEX uniq_41405e391e27f6bf ON element (question_id)');
        $this->addSql('ALTER TABLE element_child DROP CONSTRAINT FK_E69120B01E27F6BF');
        $this->addSql('DROP INDEX IDX_E69120B01E27F6BF');
        $this->addSql('ALTER TABLE element_child RENAME COLUMN question_id TO element_id');
        $this->addSql('ALTER TABLE element_child ADD CONSTRAINT fk_e69120b01f1f2a24 FOREIGN KEY (element_id) REFERENCES element (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_e69120b01f1f2a24 ON element_child (element_id)');
        $this->addSql('ALTER TABLE form ALTER updated_at SET NOT NULL');
    }
}
