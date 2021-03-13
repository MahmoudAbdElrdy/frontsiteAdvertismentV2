import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AddEditcontactUsDto } from 'src/app/@AppService/models/contactUs.model';
import { contactUsService } from 'src/app/@AppService/services/contactUs-service';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends BaseComponent implements OnInit {
  ContactForm: FormGroup;
  id: number = 0;
  isShown: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private contactUsService: contactUsService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }
  submitted = false;

  ngOnInit() {
    this.buildForm();

  }


  buildForm() {
    this.ContactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      content: ['', Validators.required],
    }
    );
  }


  saveContact() {
    this.submitted = true;
    let contactUsModel: AddEditcontactUsDto = this.ContactForm.value;
    console.log(contactUsModel);


    contactUsModel.Id = this.id;


    this.contactUsService
      .AddEditNew(contactUsModel)
      .subscribe(
        (result) => {
          this.showMessage(result);

          if (result.result['value'] == "Success") {

            this.isShown = true;
            this.ContactForm.reset();
            // this.goToList();
          }
        },
        (err) => {
          this.errorOccured(err);
        }
      );

  }

}
