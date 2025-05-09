import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactInfo } from '../../dtos';
import { ADDRESS, MAIL, PHONE_NR } from '../../application.constants';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);

  public readonly contactInfo: ContactInfo = {
    phoneNr: PHONE_NR,
    email: MAIL,
    address: ADDRESS,
  };
  public contactForm!: FormGroup;
  public submitted = false;

  public ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  public get nameFormControl(): AbstractControl {
    return this.contactForm.controls['name'];
  }

  public get emailFormControl(): AbstractControl {
    return this.contactForm.controls['email'];
  }

  public get messageFormControl(): AbstractControl {
    return this.contactForm.controls['message'];
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.contactForm.invalid) {
      alert('Invalid contact form. Please revise it!');
      return;
    }

    //send data to hostico backend and send email to colors admin

    this.contactForm.reset();
    this.submitted = false;

    alert(
      'Thank you for contacting us. We will get back to you as soon as possible!'
    );
  }
}
