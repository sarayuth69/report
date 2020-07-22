<?PHP
    header("Access-Control-Allow-Origin: *");
    header('Content-type: application/json', true);

    require_once('../Model/Report_CustomerModel.php');
    $Report_CustomerModel = new Report_CustomerModel;
    $data = [];
    $data['cus_id'] = $_POST['cus_id'];
    $data['job_detail'] = $_POST['job_detail'];
    // $data['job_date'] = $_POST['job_date'];
    $data['job_status'] = $_POST['job_status'];
    $data['job_remark'] = $_POST['job_remark'];


    $Customer = $Report_CustomerModel -> insert($data);

    echo json_encode($Customer);
    