import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  HttpClient,
  HttpHeaders,
  HttpEventType
} from '@angular/common/http';
import * as XLSX from 'xlsx';
import { APIService } from '../api.service';
import { FormControl } from '@angular/forms';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
@Component({
  selector: 'app-reportcustomer',
  templateUrl: './reportcustomer.component.html',
  styleUrls: ['./reportcustomer.component.scss']
})
export class ReportcustomerComponent implements OnInit {
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  title = 'Excel';
  getjob: any;
  p: any;
  text: any;
  seach_job;
  table1: boolean;
  table2: boolean;
  editstatus: any;
  i: any;
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
    this.http.get('http://localhost/report_cuswebservice/API/getjob.php')
      .subscribe(
        (data: any) => {
          this.getjob = data;
          console.log(this.getjob);
          if (this.getjob.length > 0) {
            this.table1 = true;
            this.table2 = false;
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
  click(item) {
    console.log(item);
    this.router.navigate(['/print-report', item])
  }

  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ScoreSheet.xlsx');
  }


  onChange(id, job) {
    this.job_id = id
    this.job_status = job
    // console.log(this.job_id);
    // console.log(this.job_status);
    const body =
      'job_id=' + this.job_id
      + '&job_status=' + this.job_status
    console.log(body);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    this.http
      .post('http://localhost/report_cuswebservice/API/editstatus.php', body, {
        headers: headers
      })
      .subscribe(
        (data: any) => {
          console.log(data);
          this.editstatus = data[0];
        },
        (error: any) => {
          console.log(error);
        }
      );
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'แก้ไขเรียบร้อย',
      showConfirmButton: false,
      timer: 1500
    })
  }



  getsearch_job(job_id) {
    console.log(job_id);
    this.seach_job = [];
    if (this.job_id.value.length === "0") {
      Swal.fire({
        icon: 'error',
        title: 'ไม่พบข้อมูล',
        text: 'Something went wrong!'
      })

    } else {
      this.http.get('http://localhost/report_cuswebservice/API/search_job.php?job_id=' + job_id).subscribe(
        (data: any) => {
          console.log(data);
          this.seach_job = data;
          if (this.seach_job.length > 0) {
            this.table1 = false;
            this.table2 = true;
          }
          else if (this.seach_job.length = 0) {
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
}
