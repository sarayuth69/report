<?php
    header("Access-Control-Allow-Origin: *");
    header('Content-type: application/json',true);

    require_once('../Model/Report_CustomerModel.php');

    $Report_CustomerModel = new Report_CustomerModel;
    $Customer = $Report_CustomerModel -> getjob();

    echo json_encode($Customer);
