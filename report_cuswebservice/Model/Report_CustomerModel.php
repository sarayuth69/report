<?php
require_once("BaseModel.php");
class Report_CustomerModel extends BaseModel{
    
     
    function __construct(){
        if(!static::$db){
            static::$db = mysqli_connect($this->host, $this->username, $this->password, $this->db_name);
            mysqli_set_charset(static::$db,"set names utf-8");
        }
    }

    
function getCustomer(){

        $sql  = "SELECT
        customers.cus_name,
        customers.cus_shop,
        customers.cus_address,
        job.job_id,
        customers.cus_id,
        job.job_detail,
        job.job_date,
        job.job_remark,
        job.job_status,
        customers.cus_tell,
        customers.cus_email,
        customers.cus_taxid,
        customers.cus_details
        FROM
        customers
        LEFT JOIN job ON job.cus_id = customers.cus_id
        GROUP BY
        customers.cus_id
        
        ";
     
        if ($result = mysqli_query(static::$db,$sql, MYSQLI_USE_RESULT)) {
            while ($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){
                $data[] = $row;
            }
            $result->close();
            return $data;
        }
    }
function getjob(){

        $sql  = "SELECT
        *,DATE_FORMAT(`job`.`job_date`,'%d/%m/%Y %H:%i') AS date
        FROM
        `customers`
        INNER JOIN `job` ON `job`.`cus_id` = `customers`.`cus_id` 
        WHERE 1
        ORDER BY `job`.`job_id` DESC";
     
        if ($result = mysqli_query(static::$db,$sql, MYSQLI_USE_RESULT)) {
            while ($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){
                $data[] = $row;
            }
            $result->close();
            return $data;
        }
    }


    function insert($data){

        $sql  = "INSERT INTO `job` ( `cus_id`,`job_detail`, `job_date`, `job_status`,`job_remark`) VALUES (
             '".$data['cus_id']."',
            '".$data['job_detail']."',
            NOW(),
            '".$data['job_status']."',
            '".$data['job_remark']."'
        );";
     
     if (mysqli_query(static::$db,$sql, MYSQLI_USE_RESULT)) {
        return 1;
    }else {
        return 0;
    }
    }



    function editstatus($data){

        $sql  = "UPDATE `job` SET `job_id` = '".$data['job_id']."',`job_status` = '".$data['job_status']."' 
        WHERE `job`.`job_id` = '".$data['job_id']."';";
     
     if (mysqli_query(static::$db,$sql, MYSQLI_USE_RESULT)) {
        return 1;
    }else {
        return 0;
    }
    }

    function search($cus_id){
        $sql = "SELECT
        customers.cus_id,
customers.cus_name,
customers.cus_shop,
customers.cus_address,
customers.cus_tell,
customers.cus_email,
customers.cus_taxid,
customers.cus_details
FROM
customers
    WHERE
    cus_id LIKE '%$cus_id%' OR cus_shop LIKE '%$cus_id%' OR cus_name LIKE '%$cus_id%' 
        OR cus_tell LIKE '%$cus_id%'
         ";
             if ($result = mysqli_query(static::$db,$sql, MYSQLI_USE_RESULT)) {
                $data = [];
                while ($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){
                    $data[] = $row;
                }
                $result->close();
                return $data;
            }
      }


      function search_job($job_id){
        $sql = "SELECT
        *
        FROM
        job
        JOIN customers ON job.cus_id = customers.cus_id
    WHERE
    job_id LIKE '%$job_id%'  OR cus_name LIKE '%$job_id%'   OR cus_shop LIKE '%$job_id%' 
        OR cus_tell LIKE '%$job_id%'
         ";
             if ($result = mysqli_query(static::$db,$sql, MYSQLI_USE_RESULT)) {
                $data = [];
                while ($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){
                    $data[] = $row;
                }
                $result->close();
                return $data;
            }
      }

}
