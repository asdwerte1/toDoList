<?php

$serverName =;
$userName =;
$password =;
$dbName =;

$con = new mysqli($serverName, $userName, $password, $dbName);
if ($con->connect_error) {
    die("Connection failed :") . $con->connect_error;
}

$taskId = mysqli_real_escape_string($con, $_POST["id"]);

$sql = "UPDATE task_list
        SET complete = 1
        WHERE task_id = $taskId";

if ($con->query($sql) === TRUE) {
} else {
    die("Error updating database");
}

$con->close();