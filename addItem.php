<?php

$serverName = "localhost";
$userName = "sam";
$password = "Esepe!ed1";
$dbName = "Tasks";

// Create the connectiona
$con = new mysqli($serverName, $userName, $password, $dbName);
if ($con->connect_error) {
    die("Connection failed :" . $con->connect_error);
}

$taskName = mysqli_real_escape_string($con, $_POST["title"]);
$taskDesc = mysqli_real_escape_string($con, $_POST["description"]);
$priority = $_POST["priority"];

$sql = "INSERT INTO task_list (task_title, task_description, priority, complete)
        VALUES (?, ?, ?, 0)";

$stmt = $con->prepare($sql);

if (!$stmt) {
    die("ERROR PREPARING STATEMENT: " . $con->error);
} else {
    $stmt->bind_param("sss", $taskName, $taskDesc, $priority);

    if ($stmt->execute()) {
    } else {
        die("Error adding task: " . $stmt->error);
    }

    $stmt->close();
}

$con->close();