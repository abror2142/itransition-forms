<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250317174717 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE answer (id SERIAL NOT NULL, question_id INT NOT NULL, response_id INT NOT NULL, answer_multiple_choice_id INT DEFAULT NULL, answer_integer INT DEFAULT NULL, answer_text VARCHAR(255) DEFAULT NULL, answer_paragraph TEXT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_DADD4A251E27F6BF ON answer (question_id)');
        $this->addSql('CREATE INDEX IDX_DADD4A25FBF32840 ON answer (response_id)');
        $this->addSql('CREATE INDEX IDX_DADD4A25C0E4B16D ON answer (answer_multiple_choice_id)');
        $this->addSql('CREATE TABLE checkbox_answers (answer_id INT NOT NULL, element_child_id INT NOT NULL, PRIMARY KEY(answer_id, element_child_id))');
        $this->addSql('CREATE INDEX IDX_B1978D4DAA334807 ON checkbox_answers (answer_id)');
        $this->addSql('CREATE INDEX IDX_B1978D4DB193BCB6 ON checkbox_answers (element_child_id)');
        $this->addSql('CREATE TABLE comment (id SERIAL NOT NULL, owner_id INT DEFAULT NULL, form_id INT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, content VARCHAR(255) NOT NULL, parent VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_9474526C7E3C61F9 ON comment (owner_id)');
        $this->addSql('CREATE INDEX IDX_9474526C5FF69B7D ON comment (form_id)');
        $this->addSql('COMMENT ON COLUMN comment.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE element (id SERIAL NOT NULL, name VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE element_attribute (id SERIAL NOT NULL, question_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, value VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_5271C1D01E27F6BF ON element_attribute (question_id)');
        $this->addSql('CREATE TABLE element_child (id SERIAL NOT NULL, question_id INT DEFAULT NULL, type VARCHAR(255) DEFAULT NULL, content VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_E69120B01E27F6BF ON element_child (question_id)');
        $this->addSql('CREATE TABLE form (id SERIAL NOT NULL, owner_id INT DEFAULT NULL, topic_id INT DEFAULT NULL, type_id INT DEFAULT NULL, title VARCHAR(255) NOT NULL, description TEXT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, image VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_5288FD4F7E3C61F9 ON form (owner_id)');
        $this->addSql('CREATE INDEX IDX_5288FD4F1F55203D ON form (topic_id)');
        $this->addSql('CREATE INDEX IDX_5288FD4FC54C8C93 ON form (type_id)');
        $this->addSql('COMMENT ON COLUMN form.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE form_like (id SERIAL NOT NULL, form_id INT DEFAULT NULL, owner_id INT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_384244A45FF69B7D ON form_like (form_id)');
        $this->addSql('CREATE INDEX IDX_384244A47E3C61F9 ON form_like (owner_id)');
        $this->addSql('COMMENT ON COLUMN form_like.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE form_type (id SERIAL NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE image_field (id SERIAL NOT NULL, form_id INT DEFAULT NULL, title VARCHAR(255) NOT NULL, image VARCHAR(255) NOT NULL, caption VARCHAR(255) DEFAULT NULL, sequence INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_4CB0C1F15FF69B7D ON image_field (form_id)');
        $this->addSql('CREATE TABLE question (id SERIAL NOT NULL, form_id INT DEFAULT NULL, question_type_id INT DEFAULT NULL, title TEXT DEFAULT NULL, description TEXT DEFAULT NULL, image VARCHAR(255) DEFAULT NULL, required BOOLEAN NOT NULL, sequence INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_B6F7494E5FF69B7D ON question (form_id)');
        $this->addSql('CREATE INDEX IDX_B6F7494ECB90598E ON question (question_type_id)');
        $this->addSql('CREATE TABLE refresh_tokens (id SERIAL NOT NULL, refresh_token VARCHAR(128) NOT NULL, username VARCHAR(255) NOT NULL, valid TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_9BACE7E1C74F2195 ON refresh_tokens (refresh_token)');
        $this->addSql('CREATE TABLE response (id SERIAL NOT NULL, owner_id INT DEFAULT NULL, form_id INT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_3E7B0BFB7E3C61F9 ON response (owner_id)');
        $this->addSql('CREATE INDEX IDX_3E7B0BFB5FF69B7D ON response (form_id)');
        $this->addSql('COMMENT ON COLUMN response.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE salesforce_token (id SERIAL NOT NULL, token VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, is_active BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN salesforce_token.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE tag (id SERIAL NOT NULL, name VARCHAR(50) NOT NULL, description TEXT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN tag.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE form_tags (tag_id INT NOT NULL, form_id INT NOT NULL, PRIMARY KEY(tag_id, form_id))');
        $this->addSql('CREATE INDEX IDX_FB9D9031BAD26311 ON form_tags (tag_id)');
        $this->addSql('CREATE INDEX IDX_FB9D90315FF69B7D ON form_tags (form_id)');
        $this->addSql('CREATE TABLE text_field (id SERIAL NOT NULL, form_id INT DEFAULT NULL, title VARCHAR(255) DEFAULT NULL, description TEXT DEFAULT NULL, sequence INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_D41FF055FF69B7D ON text_field (form_id)');
        $this->addSql('CREATE TABLE topic (id SERIAL NOT NULL, name VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN topic.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE "user" (id SERIAL NOT NULL, email VARCHAR(180) NOT NULL, full_name VARCHAR(255) DEFAULT NULL, status VARCHAR(255) DEFAULT NULL, image VARCHAR(255) DEFAULT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, is_verified BOOLEAN DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, sales_account_id VARCHAR(50) DEFAULT NULL, odoo_token VARCHAR(100) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL ON "user" (email)');
        $this->addSql('COMMENT ON COLUMN "user".created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN "user".updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE form_users (user_id INT NOT NULL, form_id INT NOT NULL, PRIMARY KEY(user_id, form_id))');
        $this->addSql('CREATE INDEX IDX_97C4012AA76ED395 ON form_users (user_id)');
        $this->addSql('CREATE INDEX IDX_97C4012A5FF69B7D ON form_users (form_id)');
        $this->addSql('CREATE TABLE verification_token (id SERIAL NOT NULL, owner_id INT NOT NULL, token VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_C1CC006B7E3C61F9 ON verification_token (owner_id)');
        $this->addSql('CREATE TABLE messenger_messages (id BIGSERIAL NOT NULL, body TEXT NOT NULL, headers TEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, available_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, delivered_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_75EA56E0FB7336F0 ON messenger_messages (queue_name)');
        $this->addSql('CREATE INDEX IDX_75EA56E0E3BD61CE ON messenger_messages (available_at)');
        $this->addSql('CREATE INDEX IDX_75EA56E016BA31DB ON messenger_messages (delivered_at)');
        $this->addSql('COMMENT ON COLUMN messenger_messages.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN messenger_messages.available_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN messenger_messages.delivered_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE OR REPLACE FUNCTION notify_messenger_messages() RETURNS TRIGGER AS $$
            BEGIN
                PERFORM pg_notify(\'messenger_messages\', NEW.queue_name::text);
                RETURN NEW;
            END;
        $$ LANGUAGE plpgsql;');
        $this->addSql('DROP TRIGGER IF EXISTS notify_trigger ON messenger_messages;');
        $this->addSql('CREATE TRIGGER notify_trigger AFTER INSERT OR UPDATE ON messenger_messages FOR EACH ROW EXECUTE PROCEDURE notify_messenger_messages();');
        $this->addSql('ALTER TABLE answer ADD CONSTRAINT FK_DADD4A251E27F6BF FOREIGN KEY (question_id) REFERENCES question (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE answer ADD CONSTRAINT FK_DADD4A25FBF32840 FOREIGN KEY (response_id) REFERENCES response (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE answer ADD CONSTRAINT FK_DADD4A25C0E4B16D FOREIGN KEY (answer_multiple_choice_id) REFERENCES element_child (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE checkbox_answers ADD CONSTRAINT FK_B1978D4DAA334807 FOREIGN KEY (answer_id) REFERENCES answer (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE checkbox_answers ADD CONSTRAINT FK_B1978D4DB193BCB6 FOREIGN KEY (element_child_id) REFERENCES element_child (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526C7E3C61F9 FOREIGN KEY (owner_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526C5FF69B7D FOREIGN KEY (form_id) REFERENCES form (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE element_attribute ADD CONSTRAINT FK_5271C1D01E27F6BF FOREIGN KEY (question_id) REFERENCES question (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE element_child ADD CONSTRAINT FK_E69120B01E27F6BF FOREIGN KEY (question_id) REFERENCES question (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE form ADD CONSTRAINT FK_5288FD4F7E3C61F9 FOREIGN KEY (owner_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE form ADD CONSTRAINT FK_5288FD4F1F55203D FOREIGN KEY (topic_id) REFERENCES topic (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE form ADD CONSTRAINT FK_5288FD4FC54C8C93 FOREIGN KEY (type_id) REFERENCES form_type (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE form_like ADD CONSTRAINT FK_384244A45FF69B7D FOREIGN KEY (form_id) REFERENCES form (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE form_like ADD CONSTRAINT FK_384244A47E3C61F9 FOREIGN KEY (owner_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE image_field ADD CONSTRAINT FK_4CB0C1F15FF69B7D FOREIGN KEY (form_id) REFERENCES form (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE question ADD CONSTRAINT FK_B6F7494E5FF69B7D FOREIGN KEY (form_id) REFERENCES form (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE question ADD CONSTRAINT FK_B6F7494ECB90598E FOREIGN KEY (question_type_id) REFERENCES element (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE response ADD CONSTRAINT FK_3E7B0BFB7E3C61F9 FOREIGN KEY (owner_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE response ADD CONSTRAINT FK_3E7B0BFB5FF69B7D FOREIGN KEY (form_id) REFERENCES form (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE form_tags ADD CONSTRAINT FK_FB9D9031BAD26311 FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE form_tags ADD CONSTRAINT FK_FB9D90315FF69B7D FOREIGN KEY (form_id) REFERENCES form (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE text_field ADD CONSTRAINT FK_D41FF055FF69B7D FOREIGN KEY (form_id) REFERENCES form (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE form_users ADD CONSTRAINT FK_97C4012AA76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE form_users ADD CONSTRAINT FK_97C4012A5FF69B7D FOREIGN KEY (form_id) REFERENCES form (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE verification_token ADD CONSTRAINT FK_C1CC006B7E3C61F9 FOREIGN KEY (owner_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE answer DROP CONSTRAINT FK_DADD4A251E27F6BF');
        $this->addSql('ALTER TABLE answer DROP CONSTRAINT FK_DADD4A25FBF32840');
        $this->addSql('ALTER TABLE answer DROP CONSTRAINT FK_DADD4A25C0E4B16D');
        $this->addSql('ALTER TABLE checkbox_answers DROP CONSTRAINT FK_B1978D4DAA334807');
        $this->addSql('ALTER TABLE checkbox_answers DROP CONSTRAINT FK_B1978D4DB193BCB6');
        $this->addSql('ALTER TABLE comment DROP CONSTRAINT FK_9474526C7E3C61F9');
        $this->addSql('ALTER TABLE comment DROP CONSTRAINT FK_9474526C5FF69B7D');
        $this->addSql('ALTER TABLE element_attribute DROP CONSTRAINT FK_5271C1D01E27F6BF');
        $this->addSql('ALTER TABLE element_child DROP CONSTRAINT FK_E69120B01E27F6BF');
        $this->addSql('ALTER TABLE form DROP CONSTRAINT FK_5288FD4F7E3C61F9');
        $this->addSql('ALTER TABLE form DROP CONSTRAINT FK_5288FD4F1F55203D');
        $this->addSql('ALTER TABLE form DROP CONSTRAINT FK_5288FD4FC54C8C93');
        $this->addSql('ALTER TABLE form_like DROP CONSTRAINT FK_384244A45FF69B7D');
        $this->addSql('ALTER TABLE form_like DROP CONSTRAINT FK_384244A47E3C61F9');
        $this->addSql('ALTER TABLE image_field DROP CONSTRAINT FK_4CB0C1F15FF69B7D');
        $this->addSql('ALTER TABLE question DROP CONSTRAINT FK_B6F7494E5FF69B7D');
        $this->addSql('ALTER TABLE question DROP CONSTRAINT FK_B6F7494ECB90598E');
        $this->addSql('ALTER TABLE response DROP CONSTRAINT FK_3E7B0BFB7E3C61F9');
        $this->addSql('ALTER TABLE response DROP CONSTRAINT FK_3E7B0BFB5FF69B7D');
        $this->addSql('ALTER TABLE form_tags DROP CONSTRAINT FK_FB9D9031BAD26311');
        $this->addSql('ALTER TABLE form_tags DROP CONSTRAINT FK_FB9D90315FF69B7D');
        $this->addSql('ALTER TABLE text_field DROP CONSTRAINT FK_D41FF055FF69B7D');
        $this->addSql('ALTER TABLE form_users DROP CONSTRAINT FK_97C4012AA76ED395');
        $this->addSql('ALTER TABLE form_users DROP CONSTRAINT FK_97C4012A5FF69B7D');
        $this->addSql('ALTER TABLE verification_token DROP CONSTRAINT FK_C1CC006B7E3C61F9');
        $this->addSql('DROP TABLE answer');
        $this->addSql('DROP TABLE checkbox_answers');
        $this->addSql('DROP TABLE comment');
        $this->addSql('DROP TABLE element');
        $this->addSql('DROP TABLE element_attribute');
        $this->addSql('DROP TABLE element_child');
        $this->addSql('DROP TABLE form');
        $this->addSql('DROP TABLE form_like');
        $this->addSql('DROP TABLE form_type');
        $this->addSql('DROP TABLE image_field');
        $this->addSql('DROP TABLE question');
        $this->addSql('DROP TABLE refresh_tokens');
        $this->addSql('DROP TABLE response');
        $this->addSql('DROP TABLE salesforce_token');
        $this->addSql('DROP TABLE tag');
        $this->addSql('DROP TABLE form_tags');
        $this->addSql('DROP TABLE text_field');
        $this->addSql('DROP TABLE topic');
        $this->addSql('DROP TABLE "user"');
        $this->addSql('DROP TABLE form_users');
        $this->addSql('DROP TABLE verification_token');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
