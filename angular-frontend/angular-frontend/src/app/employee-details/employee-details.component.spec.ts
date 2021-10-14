import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { EmployeeDetailsComponent } from './employee-details.component';

describe('EmployeeDetailsComponent', () => {
  let component: EmployeeDetailsComponent;
  let fixture: ComponentFixture<EmployeeDetailsComponent>;
  let element;

  const mockApiService = {
    getEmployeeDetails: (id) => Promise.resolve(mockEmployee[3])
  };

  const mockActivatedRoute = {
    params: of({ id: 'f1b2e9bf-2794-4ccf-a869-9ddb93478f70'})
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDetailsComponent ],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDetailsComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should set the correct employee Firstname', async(() => {
    fixture.detectChanges();

    fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        const Firstname = element.querySelector('.header');
        expect(Firstname.textContent).toBe('Chandru');
      });
  }));

  it('should set the correct employee Lastname', async(() => {
    fixture.detectChanges();

    fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        const Lastname = element.querySelector('.header');
        expect(Lastname.textContent).toBe('K');
      });
  }));

  it('should set the correct employee email', async(() => {
    fixture.detectChanges();

    fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        const EmailId = element.querySelector('.email');
        expect(EmailId.textContent.trim()).toBe('You can\'t program the bus without bypassing the redundant RSS circuit!');
      });
  }));
});
