Technology Stack: PHP 8+, MySQL 8+, jQuery

Functionality:

- The user can add new tasks.
- The user can mark tasks as done.
- The user can remove tasks from the list.
- Tasks should be stored in a MySQL database.
- No user authentication is required (it will be a single-user application).

Requirements:

The tasks should be managed using AJAX, which means the page should not reload when you add, remove, or mark tasks as done.

Set up

- Run `composer install`
- Make sure the templates_c directory has write permission
- Add the schema/todos.sql file to a database
- Add database connection info into database.php
- Run `php -S localhost:8000`, or host via a web server

