import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BeerService } from '../../beer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-beer',
  templateUrl: './new-beer.page.html',
  styleUrls: ['./new-beer.page.scss'],
})
export class NewBeerPage implements OnInit {
  form: FormGroup;

  constructor(private beerService: BeerService, private router: Router) { }

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
    if(!this.form.valid){
      return;
    }
    this.beerService.addBeer(
      this.form.value.title, 
      this.form.value.description, 
      +this.form.value.price, 
      new Date(this.form.value.date)
    );
    this.form.reset();
    this.router.navigate(['/beer/tabs/info'])
  }
}
