import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

import { BeerService } from '../../beer.service';
import { Beer } from '../../beer.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-edit-beer',
  templateUrl: './edit-beer.page.html',
  styleUrls: ['./edit-beer.page.scss'],
})
export class EditBeerPage implements OnInit, OnDestroy {
  beer: Beer;
  form: FormGroup;
  private beerSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private beerService: BeerService,
    private navCtrl: NavController,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('beerId')){
        this.navCtrl.navigateBack('./beer/tabs/info');
        return;
      }
      this.beerSub = this.beerService.getBeer(paramMap.get('beerId')).subscribe (beer => {
        this.beer = beer;
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
          })
        });
      });
    });
      
  }

  onUpdateBeer() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Chugging...'
    }).then(loadingEl => {
      loadingEl.present();
      this.beerService.updateBeer(
        this.beer.id, 
        this.form.value.title, 
        this.form.value.description
        ).subscribe(() => {
          loadingEl.dismiss();
          this.form.reset();
          this.router.navigate(['/beer/tabs/discover']);
        });
      })
    }
    

  ngOnDestroy() {
    if(this.beerSub){
      this.beerSub.unsubscribe();
    }
  }
}
