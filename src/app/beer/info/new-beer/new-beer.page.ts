import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-beer',
  templateUrl: './new-beer.page.html',
  styleUrls: ['./new-beer.page.scss'],
})
export class NewBeerPage implements OnInit {
  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      date: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  onCreateBeer() {
    console.log(this.form);
  }

}
