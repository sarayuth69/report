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
  selector: 'app-print-report',
  templateUrl: './print-report.component.html',
  styleUrls: ['./print-report.component.scss']
})
export class PrintReportComponent implements OnInit {
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  title = 'Excel';
  getjob;
  cus_name;
  cus_shop;
  job_date1;
  cus_address;
  cus_tell;
  cus_email;
  cus_taxid;
  cus_details;
  job_detail;
  date;
  customershow;
  job_date: boolean;
  job_date_test: boolean;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public api: APIService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.cus_name = params.cus_name;
        this.cus_shop = params.cus_shop;
        this.cus_address = params.cus_address;
        this.cus_tell = params.cus_tell;
        this.cus_email = params.cus_email;
        this.cus_taxid = params.cus_taxid;
        this.cus_details = params.cus_details;
        this.job_detail = params.job_detail;
        this.date = params.date;
      }
    )
    this.http.get('http://localhost/report_cuswebservice/API/getjob.php')
      .subscribe(
        (data: any) => {
          this.getjob = data;
        },
        (error: any) => {
          console.log(error);
        }
      );
    setTimeout(() => {

      let printContents, popupWin;
      printContents = document.getElementById('print-section').innerHTML;
      popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
      popupWin.document.open();
      popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          *{
            font-family: Tahoma; font-size: 12px; 
          font-style: normal;
       
          }
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
      );
      popupWin.document.close();
    }, 1000);



  }

  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ScoreSheet.xlsx');
  }


}
