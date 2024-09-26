<?php

require 'connect.php';

$data = [];

try {
    // inputs

    // validations

    // queries

    // results

    $data['status'] = 200;
} catch (Exception $e) {
    $data['status'] = 400;
    $data['message'] = $e->getMessage();
}

echo json_encode($data);