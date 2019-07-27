import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { BeerService } from '../../beer.service';
import { Beer } from '../../beer.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-beer',
  templateUrl: './edit-beer.page.html',
  styleUrls: ['./edit-beer.page.scss'],
})
export class EditBeerPage implements OnInit {
  beer: Beer;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private beerService: BeerService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('beerId')){
        this.navCtrl.navigateBack('./beer/tabs/info');
        return;
      }
      this.beer = this.beerService.getBeer(paramMap.get('beerId'));
      this.form = new FormGroup({
        title: new FormControl(this.beer.title, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        description: new FormControl(this.beer.description, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        price: new FormControl(this.beer.price, {
          updateOn: 'blur',
          validators: [Validators.required, Validators.min(1)]
        }),
      });
    });
  }

  onUpdateBeer() {
    if(!this.form.valid) {
      return;
    }
    console.log(this.form);
  }
}
