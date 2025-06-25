<?php

require 'database.php';

// Endpoints which are doing an update, create or delete
if ( isset($_POST['method']) ) {

    if ( $_POST['method'] === 'completeTask') {
        header('Content-Type: application/json');

        $sql = "UPDATE todos SET completed=:completed WHERE id=:id";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $_POST['taskId'], PDO::PARAM_INT);
        $taskCompleted = $_POST['taskCompleted'] === 'true' ? true : false;
        $stmt->bindParam(':completed', $taskCompleted, PDO::PARAM_BOOL);
        if ( $stmt->execute() ) {
            print json_encode(['id' => $_POST['taskId']]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to complete task']);
        }
        exit;
    }

    if ( $_POST['method'] === 'deleteTask') {
        header('Content-Type: application/json');

        $sql = "DELETE FROM todos WHERE id=:id";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $_POST['taskId'], PDO::PARAM_INT);
        if ( $stmt->execute() ) {
            print json_encode(['id' => $_POST['taskId']]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to delete task']);
        }
        exit;
    }

    if ( $_POST['method'] === 'addTask') {
        header('Content-Type: application/json');

        $sql = "INSERT INTO todos (title) VALUES (:title)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':title', $_POST['taskText'], PDO::PARAM_STR);
        if ( $stmt->execute() ) {
            print json_encode(['id' => $pdo->lastInsertId() ]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to add task']);
        }
        exit;
    }
}

// Endpoints which are just fetching data
if ( isset($_GET['method']) ) {
    if ( $_GET['method'] === 'getTasks') {
        header('Content-Type: application/json');

        $sql = "SELECT id,title,completed FROM todos ORDER BY created_at ASC";
        $stmt = $pdo->prepare($sql);
        if ( $stmt->execute() ) {
            $tasks = $stmt->fetchAll();
            print json_encode($tasks);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch tasks']);
        }
        exit;
    }
}

// Nothing useful in the request, just redirect.
header('Location: index.php');
exit;