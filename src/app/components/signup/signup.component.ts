// signup.component.ts
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  otpComponent: Boolean = false;
  hideSignup: Boolean = true;
  lin: any;
  role: string = '';
  myForm!: FormGroup;
showLoading:any;

  signupForms = new FormGroup({
    role: new FormControl(''),
  });
  




  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private serv: CommonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{3,16}$/)],
      ],
      email: ['', [Validators.required, Validators.email]],

      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],

      password: ['',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/
          ),
        ],
      ],

      confirmPassword: ['',[Validators.required, this.matchPasswords.bind(this)]],
      role: [''],
    });
  }

  matchPasswords(control: AbstractControl) {
    const passwordControl = this.signupForm?.get('password');
    if (!passwordControl) {
      return null;
    }

    const password = passwordControl.value;
    const confirmPassword = control.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  get form() {
    return this.signupForm.controls;
  }

  getFormControl(name: string) {
    return this.signupForm.get(name)!;
  }

  onSubmit() {
    try {
      const formvalues = this.signupForm.value;
      console.log('form', formvalues);

      if (this.signupForm.valid) {
        this.showLoading=true;
        this.serv.getApi(formvalues).subscribe({
          next: (response) => {
          this.showLoading=false;
            if (response.success) {
              console.log(response);
              this.lin = response.data;
              this.otpComponent = true;
              this.hideSignup = false;
              // const targetRoute = this.role === 'user' ? '/' : '/admin/home';
              // this.router.navigate([targetRoute]);
            }
          },
          error: (error) => {
            console.error(error);
          },
        });
      } else {
        console.log(
          'Password pattern error:',
          this.signupForm.get('password')?.hasError('pattern')
        );

        if (this.signupForm.get('password')?.hasError('pattern')) {
          console.error('Password has a pattern error');
        }
      }
    } catch (error) {
      console.log('otp send error', error);
    }
  }

  goHome() {
    this.router.navigate(['']);
  }

  
}
