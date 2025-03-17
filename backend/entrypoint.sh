#!/bin/sh
set -e

php bin/console doctrine:migration:migrate --no-interaction
chown -R www-data:www-data /backend/var /backend/vendor
chmod -R 775 /backend/var /backend/vendor

exec php-fpm