import { Component, OnInit } from '@angular/core';
import { Employee } from '../Employee';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ValidateTxtBox } from '../util/input.validator';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../app.service';


@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {

  closed = false;
  hideForm = false;
  displayAlert = false;
  info = '';
  skills = ["Java","Dot Net","DevOps","SQL","Automation Testing","Other"];
  empForm: FormGroup;

  constructor(private fb: FormBuilder,private appService: AppService, private modalService: NgbModal) {
    this.createForm();
  }

  createForm() {
    this.empForm = this.fb.group({
      empID: ['', Validators.required],
      empName: ['', (Validators.required, ValidateTxtBox)],
      empDesg: ['', (Validators.required, ValidateTxtBox)],
      empSkills:  this.fb.array(['Other'], Validators.required)
    });    
  }

  model = new Employee();

  ngOnInit() {
    
  }  
 

  reset(){
    this.empForm.reset();
  }

  isActivityChecked(data) {
    return this.empForm.controls['empSkills'].value.includes(data);
  }
  onActivityChange(activity: any, isChecked: boolean) {
    const skillFArray = <FormArray>this.empForm.controls.empSkills;

    if (isChecked) {
      skillFArray.push(new FormControl(activity, Validators.required));
    } else {
      const index = skillFArray.controls.findIndex(x => x.value === activity);
      skillFArray.removeAt(index);
    }
  } 

  displayPostDialog(content) {
    this.info = 'Are you sure you wanna add Employee?';
    this.modalService.open(content).result.then((result) => {
      if (`${result}` == `Yes`) {
        this.postEmployee(); 
      }
    });
  }

  postEmployee() {
    this.appService.postEmployee(this.empForm.value).subscribe(
      (ddata: any) => {
        this.info = 'Employee has been added successfully';
        if(this.closed){
          this.closed = false;
        }
        this.displayAlert = true;
        this.hideForm = true;        
      });
  }
}
