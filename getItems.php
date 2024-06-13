<?php

class dbRow {
    public $id;
    public $title;
    public $description;
    public $priority;

    function __construct($id, $title, $description, $priority) {
        $this->id = $id;
        $this->title = $title;
        $this->description = $description;
        $this->priority = $priority;
    }
}

$serverName = "localhost";
$username = "sam";
$password = "Esepe!ed1";
$dbName = "Tasks";

// Connect to server
$con = new mysqli($serverName, $username, $password, $dbName);

// Get all entries which are not complete
$sql = "SELECT * FROM task_list WHERE complete=0";
$result = $con->query($sql);

// Empty array to store each row as an object
$dataToSend = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        array_push($dataToSend, new dbRow($row["task_id"], $row["task_title"], $row["task_description"], $row["priority"]));
    }
}

echo json_encode($dataToSend);

?>