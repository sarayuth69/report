<?php
    header("Access-Control-Allow-Origin: *");
    header('Content-type: application/json',true);
    require_once('../Model/Report_CustomerModel.php');

    $Report_CustomerModel = new Report_CustomerModel;
    $Customer = $Report_CustomerModel -> search_job($_GET['job_id']);

    echo json_encode($Customer);
