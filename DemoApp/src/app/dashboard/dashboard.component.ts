import { Input, Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public isCollapsed = true;
  displayAlert = false;
  deleteMsg = '';
  closed = false;
  closeResult: string;

  constructor(private appService: AppService, private modalService: NgbModal, private router: Router) {

  }

  employees: any = [];
  checkEmployees() {
    if (this.employees == null || this.employees.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.appService.getEmployees().subscribe(
      (data: any) => {
        this.employees = data;
        // Handle different scenarios based on HTTP status
      });
  }

  displayDeleteAllDialog(content) {
    this.deleteMsg = 'Are you sure you wanna delete all Employee?';
    this.modalService.open(content).result.then((result) => {
      if (`${result}` == `Yes`) {
        this.deleteAllEmployees();
        this.employees = null;
      }
    });
  }

  deleteAllEmployees() {
    this.appService.deleteAll().subscribe(
      (data: any) => {
        this.deleteMsg = "Deleted All Employees from System successfully";
        if (this.closed) {
          this.closed = false;
        }
        this.displayAlert = true;
        // Handle different scenarios based on HTTP status
      });
  }

  displayDeleteDialog(content, eID) {
    this.deleteMsg = 'Are you sure you wanna delete Employee ' + eID + '?';
    this.modalService.open(content).result.then((result) => {
      if (`${result}` == `Yes`) {
        this.deleteEmployee(eID);
      }
    });
  }

  deleteEmployee(eID) {
    this.appService.deleteEmployee(eID).subscribe(
      (data: any) => {
        this.deleteMsg = "Employee " + eID + " has been deleted successfully";
        if (this.closed) {
          this.closed = false;
        }
        this.displayAlert = true;
        this.getEmployees();
        // Handle different scenarios based on HTTP status
      });
  }

  addEmployee() {
    this.router.navigate(['/add']);
  }
}
