<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250210192058 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE element (id SERIAL NOT NULL, question_id INT NOT NULL, name VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_41405E391E27F6BF ON element (question_id)');
        $this->addSql('CREATE TABLE element_attribute (id SERIAL NOT NULL, name VARCHAR(255) NOT NULL, value VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE element_attribute_element (element_attribute_id INT NOT NULL, element_id INT NOT NULL, PRIMARY KEY(element_attribute_id, element_id))');
        $this->addSql('CREATE INDEX IDX_DBD21FA81E2B57F7 ON element_attribute_element (element_attribute_id)');
        $this->addSql('CREATE INDEX IDX_DBD21FA81F1F2A24 ON element_attribute_element (element_id)');
        $this->addSql('CREATE TABLE element_child (id SERIAL NOT NULL, element_id INT DEFAULT NULL, type VARCHAR(255) NOT NULL, content VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_E69120B01F1F2A24 ON element_child (element_id)');
        $this->addSql('CREATE TABLE form (id SERIAL NOT NULL, owner_id INT DEFAULT NULL, topic_id INT DEFAULT NULL, title VARCHAR(255) NOT NULL, description TEXT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, image VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_5288FD4F7E3C61F9 ON form (owner_id)');
        $this->addSql('CREATE INDEX IDX_5288FD4F1F55203D ON form (topic_id)');
        $this->addSql('COMMENT ON COLUMN form.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE image_field (id SERIAL NOT NULL, form_id INT DEFAULT NULL, image_url VARCHAR(255) NOT NULL, "order" INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_4CB0C1F15FF69B7D ON image_field (form_id)');
        $this->addSql('CREATE TABLE question (id INT NOT NULL, form_id INT DEFAULT NULL, text TEXT DEFAULT NULL, description TEXT DEFAULT NULL, required BOOLEAN NOT NULL, "order" INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_B6F7494E5FF69B7D ON question (form_id)');
        $this->addSql('CREATE TABLE tag (id SERIAL NOT NULL, name VARCHAR(50) NOT NULL, description TEXT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN tag.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE form_tags (tag_id INT NOT NULL, form_id INT NOT NULL, PRIMARY KEY(tag_id, form_id))');
        $this->addSql('CREATE INDEX IDX_FB9D9031BAD26311 ON form_tags (tag_id)');
        $this->addSql('CREATE INDEX IDX_FB9D90315FF69B7D ON form_tags (form_id)');
        $this->addSql('CREATE TABLE text_field (id SERIAL NOT NULL, form_id INT DEFAULT NULL, title VARCHAR(255) DEFAULT NULL, description TEXT DEFAULT NULL, "order" INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_D41FF055FF69B7D ON text_field (form_id)');
        $this->addSql('CREATE TABLE topic (id SERIAL NOT NULL, name VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN topic.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE element ADD CONSTRAINT FK_41405E391E27F6BF FOREIGN KEY (question_id) REFERENCES question (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE element_attribute_element ADD CONSTRAINT FK_DBD21FA81E2B57F7 FOREIGN KEY (element_attribute_id) REFERENCES element_attribute (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE element_attribute_element ADD CONSTRAINT FK_DBD21FA81F1F2A24 FOREIGN KEY (element_id) REFERENCES element (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE element_child ADD CONSTRAINT FK_E69120B01F1F2A24 FOREIGN KEY (element_id) REFERENCES element (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE form ADD CONSTRAINT FK_5288FD4F7E3C61F9 FOREIGN KEY (owner_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE form ADD CONSTRAINT FK_5288FD4F1F55203D FOREIGN KEY (topic_id) REFERENCES topic (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE image_field ADD CONSTRAINT FK_4CB0C1F15FF69B7D FOREIGN KEY (form_id) REFERENCES form (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE question ADD CONSTRAINT FK_B6F7494E5FF69B7D FOREIGN KEY (form_id) REFERENCES form (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE form_tags ADD CONSTRAINT FK_FB9D9031BAD26311 FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE form_tags ADD CONSTRAINT FK_FB9D90315FF69B7D FOREIGN KEY (form_id) REFERENCES form (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE text_field ADD CONSTRAINT FK_D41FF055FF69B7D FOREIGN KEY (form_id) REFERENCES form (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE element DROP CONSTRAINT FK_41405E391E27F6BF');
        $this->addSql('ALTER TABLE element_attribute_element DROP CONSTRAINT FK_DBD21FA81E2B57F7');
        $this->addSql('ALTER TABLE element_attribute_element DROP CONSTRAINT FK_DBD21FA81F1F2A24');
        $this->addSql('ALTER TABLE element_child DROP CONSTRAINT FK_E69120B01F1F2A24');
        $this->addSql('ALTER TABLE form DROP CONSTRAINT FK_5288FD4F7E3C61F9');
        $this->addSql('ALTER TABLE form DROP CONSTRAINT FK_5288FD4F1F55203D');
        $this->addSql('ALTER TABLE image_field DROP CONSTRAINT FK_4CB0C1F15FF69B7D');
        $this->addSql('ALTER TABLE question DROP CONSTRAINT FK_B6F7494E5FF69B7D');
        $this->addSql('ALTER TABLE form_tags DROP CONSTRAINT FK_FB9D9031BAD26311');
        $this->addSql('ALTER TABLE form_tags DROP CONSTRAINT FK_FB9D90315FF69B7D');
        $this->addSql('ALTER TABLE text_field DROP CONSTRAINT FK_D41FF055FF69B7D');
        $this->addSql('DROP TABLE element');
        $this->addSql('DROP TABLE element_attribute');
        $this->addSql('DROP TABLE element_attribute_element');
        $this->addSql('DROP TABLE element_child');
        $this->addSql('DROP TABLE form');
        $this->addSql('DROP TABLE image_field');
        $this->addSql('DROP TABLE question');
        $this->addSql('DROP TABLE tag');
        $this->addSql('DROP TABLE form_tags');
        $this->addSql('DROP TABLE text_field');
        $this->addSql('DROP TABLE topic');
    }
}
