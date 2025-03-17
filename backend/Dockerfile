FROM php:8.2-fpm

RUN apt-get update \
    && apt-get install -y libpq-dev zip unzip libicu-dev \
    && docker-php-ext-install pdo pdo_pgsql intl

ENV COMPOSER_ALLOW_SUPERUSER=1

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

WORKDIR /backend

COPY ./composer.* .

RUN composer install --prefer-dist --no-dev --no-scripts --no-progress --no-interaction

COPY . .

RUN composer dump-autoload --optimize

COPY ./entrypoint.sh /

ENTRYPOINT [ "sh", "/entrypoint.sh" ]