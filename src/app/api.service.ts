import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class APIService {


    constructor(private http: HttpClient) {

    }

    getConfig(): Observable<any> {

        const url = 'http://localhost/report_cuswebservice/API/getcustomer.php';

        return this.http.get<any>(url);
    }

}