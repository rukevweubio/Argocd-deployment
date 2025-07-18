# Use an official PHP image with Apache
FROM php:8.2-apache

# Install mysqli extension
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

# Copy your application code to the Apache document root
COPY src/ /var/www/html/

# Set appropriate permissions for the web server
RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 755 /var/www/html

# Expose port 80 for Apache
EXPOSE 80

# Apache is the default command, so nothing extra needed here.
# CMD ["apache2-foreground"]