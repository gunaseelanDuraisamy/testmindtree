import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

import { EmployeeListComponent } from './employee-list.component';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  //let fixture: ComponentFixture<EmployeeListComponent>;
  let service: EmployeeService;
  let router: Router;

 

  beforeEach(() => {
    
    service=new EmployeeService(null);
    component=new EmployeeListComponent(service,null);
  });

  it('should list the employees',()=>
  {
      const employees:Employee[] =[
        {
          id:1,
          firstName:'Vidhyaa',
          lastName:'Ram',
          emailId:'vidhyaar@gmail.com',
          enabled:'true',
        },
        {
          id:2,
          firstName:'Karthik',
          lastName:'K',
          emailId:'Karthik@gmail.com',
          enabled:'true',
        },
        {
          id:3,
          firstName:'Geetha',
          lastName:'Rajan',
          emailId:'Geetharajan@gmail.com',
          enabled:'true',
        }

        
      ];


      spyOn(service,'getEmployeesList').and.callFake(()=>{
        return Observable.from([employees]);
      });

      spyOn(service, 'getEmployeesList').and.returnValue(Observable.from([employees]));
      component.ngOnInit();

      expect(component.employees).toEqual(employees);
  });
  it('should set the error property if server returns an error when getting employees', () => {
    const error = new AppError('server error');
    spyOn(service, 'getEmployeesList').and.returnValue(Observable.throw(error));

    expect(component.error).not.toBeDefined();

    component.ngOnInit();

    expect(component.error).toBeDefined();
    expect(component.error.originalError).toEqual('server error');
  });

  it('should call the server to delete a employee if the user confirms', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const spy = spyOn(service, 'deleteEmployee').and.returnValue(
      Observable.empty()
    );

    const employeeId = 1;
    component.onDelete(employeeId);

    expect(spy).toHaveBeenCalledWith(employeeId);
  });

  it('should NOT call the server to delete a employee if the user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    const spy = spyOn(service, 'deleteEmployee').and.returnValue(
      Observable.empty()
    );

    const employeeId = 1;
    component.onDelete(employeeId);

    expect(spy).not.toHaveBeenCalledWith(employeeId);
  });

  it('should delete the employee from the employees array within the component', () => {
    component.employees = [
      {
        id:2,
        firstName:'Surya',
        lastName:'K',
        emailId:'Surya@gmail.com',
        enabled:'true',
      },
      {
        id:3,
        firstName:'Geetha',
        lastName:'Rajan',
        emailId:'Geetharajan@gmail.com',
        enabled:'true',
      }
    ];

    spyOn(window, 'confirm').and.returnValue(true);
    const spy = spyOn(service, 'deleteEmployee').and.returnValue(
      Observable.from([null])
    );

    const employeeId = 2;
    component.onDelete(employeeId);

    const index = component.employees.findIndex(
      employee => employee.id === employeeId
    );
    expect(index).toBeLessThan(0);
  });

  it('should redirect the user to `Employee Form` component when Update button is clicked', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    employee.id = 1;

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#update'));
    button.triggerEventHandler('click', null);

    expect(spy).toHaveBeenCalledWith(['/update-employee', component.id, 'update']);
  });
  
  it('should navigate the user to the `Not Found` component when an invalid Employee id is passed', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    fixture.detectChanges();

    const route: ActivatedRouteStub = TestBed.get(ActivatedRoute);
    route.push({ id: 'abc' });

    expect(spy).toHaveBeenCalledWith(['/not-found']);
  });





  
});