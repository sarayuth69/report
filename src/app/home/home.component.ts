import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APIService } from '../api.service';
import {
  HttpClient,
  HttpHeaders,
  HttpEventType
} from '@angular/common/http';
import { FormControl } from '@angular/forms';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  customershow: any;
  inset_customer: any;
  p: any;
  seach: any;
  table1: boolean;
  table2: boolean;
  cus_name = new FormControl('');
  cus_shop = new FormControl('');
  cus_address = new FormControl('');
  cus_tell = new FormControl('');
  cus_email = new FormControl('');
  cus_taxid = new FormControl('');
  cus_details = new FormControl('');

  job_id = new FormControl('');
  cus_id = new FormControl('');
  job_detail = new FormControl('');
  job_date = new FormControl('');
  job_status = new FormControl('');
  job_remark = new FormControl('');


  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public api: APIService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {

    this.http.get('http://localhost/report_cuswebservice/API/getcustomer.php')
      .subscribe(
        (data: any) => {
          console.log(data);
          this.customershow = data;
          if (this.customershow.length > 0) {
            this.table1 = true;
            this.table2 = false;
          }
          console.log(this.customershow);

        },
        (error: any) => {
          console.log(error);
        }

      );
  }
  insertcus(cus_id, cus_name, cus_shop, cus_address, cus_tell,
    cus_email, cus_taxid) {
    this.cus_id = new FormControl(cus_id);
    this.cus_name = new FormControl(cus_name);
    this.cus_shop = new FormControl(cus_shop);
    this.cus_address = new FormControl(cus_address);
    this.cus_tell = new FormControl(cus_tell);
    this.cus_email = new FormControl(cus_email);
    this.cus_taxid = new FormControl(cus_taxid);
    console.log();

  }
  insert(cus_details) {

    this.job_detail = cus_details
    if (!this.job_detail) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกรายละเอียด',

      })
    }
    else {
      const body = 'job_id=' + this.job_id.value
        + '&cus_id=' + this.cus_id.value
        + '&job_detail=' + this.job_detail
        + '&job_date=' + this.job_date.value
        + '&job_status=' + this.job_status.value
       + '&job_remark=' + this.job_remark.value

      console.log(body);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      });
      this.http
        .post('http://localhost/report_cuswebservice/API/insert.php', body, {
          headers: headers
        }).subscribe(
          (data: any) => {
            this.inset_customer = data;
            console.log(this.inset_customer);
          },
          (error: any) => {
            console.log(error);
          }
        );
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'เพิ่มเรียบร้อย',
        showConfirmButton: false,
        timer: 1500

      }).then(() => {
        this.http.get('http://localhost/report_cuswebservice/API/getcustomer.php')
          .subscribe(
            (data: any) => {
              console.log(data);
              this.customershow = data;
              console.log(this.customershow);

            },
            (error: any) => {
              console.log(error);
            }

          );
      })
    }

  }

  getsearch(cus_id) {
    console.log(cus_id);
    this.seach = [];
    if (this.cus_id.value.length === "0") {
      Swal.fire({
        icon: 'error',
        title: 'ไม่พบข้อมูล',
        text: 'Something went wrong!'
      })
    } else {
      this.http.get('http://localhost/report_cuswebservice/API/Search.php?cus_id=' + cus_id).subscribe(
        (data: any) => {
          console.log(data);
          this.seach = data;
          if (this.seach.length > 0) {
            this.table1 = false;
            this.table2 = true;
          }
          else if (this.seach.length = 0) {
            this.table1 = true;
            this.table2 = false;
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
    }

  }
zz
}
