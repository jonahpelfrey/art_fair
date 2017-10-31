import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';
import { Artist, Volunteer, Buyer, Order } from '../models';

@Component({
  selector: 'artist-form',
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.css']
})

export class ArtistFormComponent implements OnInit {

  	artistForm: FormGroup;
    firstName: FormControl;
    lastName: FormControl;
    email: FormControl;
    phoneNumber: FormControl;
    username: FormControl;
    password: FormControl;
    signature: FormControl;

    constructor() {}

    ngOnInit() {
        this.createFormControls();
        this.createForm();
    }

    createFormControls() {
    	this.firstName = new FormControl('', Validators.required);
        this.lastName = new FormControl('', Validators.required);
        this.phoneNumber = new FormControl('', Validators.required);
        this.username = new FormControl('', Validators.required);
        this.signature = new FormControl('', Validators.required);

        this.email = new FormControl('', [
            Validators.required,
            Validators.pattern("[^ @]*@[^ @]*")
        ]);

        this.password = new FormControl('', [
            Validators.required,
            Validators.minLength(8)
        ]);
    }

    createForm() {
        this.artistForm = new FormGroup({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phoneNumber: this.phoneNumber,
            username: this.username,
            password: this.password,
            signature: this.signature
        });
    }

}
