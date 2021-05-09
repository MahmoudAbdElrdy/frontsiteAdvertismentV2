import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AddEditcontactUsDto } from 'src/app/@AppService/models/contactUs.model';
import { contactUsService } from 'src/app/@AppService/services/contactUs-service';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';
import { AddContactUsCommand, ContactUsServiceProxy } from 'src/shared/service-proxies/service-proxies';
import { MatSnackBar } from '@angular/material';

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
    private contactUsService: ContactUsServiceProxy,
    private route: Router,private _snackBar: MatSnackBar,
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
      title: ['', Validators.required],
      content: ['', Validators.required],
    }
    );
  }


  saveContact() {
    this.submitted = true;
    let contactUsModel: AddContactUsCommand = this.ContactForm.value;
    console.log(contactUsModel);


   // contactUsModel.i = this.id;

if(this.ContactForm.valid){
  this.contactUsService
  .addContactUs(contactUsModel)
  .subscribe( 
        
      
    res=>{
     
     
    if(res!==null)
    {
      this._snackBar.open("تم الاضافة بنجاح","اضافة" ,{
        duration: 2220,
        
      });
     this.router.navigateByUrl('/');
   
      
    
    }
    else
    {
      this._snackBar.open("حدث خطأ عند الاضافة","الاضافة" ,{
        duration: 2220,
        
      });
    }
 
  })
}
   

  }

}
