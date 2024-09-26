<?php
try {;
    $conn = new mysqli('localhost','root','','you_db_name');

    if ($conn->connect_error) {
        die("...");
    }
} catch (Exception $e) {
    die("Connection failed");
}

$base_dir = $_SERVER['DOCUMENT_ROOT']."/".explode('/', $_SERVER['REQUEST_URI'])[1];
$base_url = $_SERVER['REQUEST_SCHEME']."://".$_SERVER['HTTP_HOST']."/".explode('/', $_SERVER['REQUEST_URI'])[1];
if (session_status() != PHP_SESSION_ACTIVE) {
    session_start();
}
date_default_timezone_set("hongkong");