import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';


import { JwPaginationModule } from 'jw-angular-pagination';
import { HomeComponent } from './home/home.component';
import { ReportcustomerComponent } from './reportcustomer/reportcustomer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrintReportComponent } from './print-report/print-report.component';
const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'reportcustomer', component: ReportcustomerComponent },
  { path: 'print-report', component: PrintReportComponent },
  { path: 'navbar', component: NavbarComponent },

  {
    path: '',
    redirectTo: '/home', // เปลี่ยนเส้นทาง
    pathMatch: 'full'
  },
  { path: '**', component: HomeComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReportcustomerComponent,
    NavbarComponent,
    PrintReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwPaginationModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only set true
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
