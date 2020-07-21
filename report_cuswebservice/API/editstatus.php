<?PHP
    header("Access-Control-Allow-Origin: *");
    header('Content-type: application/json', true);

    require_once('../Model/Report_CustomerModel.php');
    $Report_CustomerModel = new Report_CustomerModel;
    $data = [];
    $data['job_id'] = $_POST['job_id'];
    $data['job_status'] = $_POST['job_status'];
    $Customer = $Report_CustomerModel -> editstatus($data);

    echo json_encode($Customer);
    