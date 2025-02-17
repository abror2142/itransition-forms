<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250211121824 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE question_id_seq');
        $this->addSql('SELECT setval(\'question_id_seq\', (SELECT MAX(id) FROM question))');
        $this->addSql('ALTER TABLE question ALTER id SET DEFAULT nextval(\'question_id_seq\')');
        $this->addSql('ALTER TABLE question RENAME COLUMN "order" TO sequence');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE question ALTER id DROP DEFAULT');
        $this->addSql('ALTER TABLE question RENAME COLUMN sequence TO "order"');
    }
}
