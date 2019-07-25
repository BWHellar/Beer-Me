import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';

import { BeerService } from '../../beer.service';
import { Beer } from '../../beer.model';
import { CreateTappedComponent } from '../../../tapped/create-tapped/create-tapped.component';


@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.page.html',
  styleUrls: ['./beer-detail.page.scss'],
})
export class BeerDetailPage implements OnInit {
  beer: Beer;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private beerService: BeerService,
    private modalCtrl: ModalController
    ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('beerId')){
        this.navCtrl.navigateBack('/beer/tabs/discover');
        return;
      }
      this.beer = this.beerService.getBeer(paramMap.get('beerId'))
    });
  }

  onSaveBeer() {
    this.modalCtrl
    .create({
      component: CreateTappedComponent, 
      componentProps: {tappedBeer: this.beer} 
    })
    .then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    })
    .then(resultData => {
      console.log(resultData.data, resultData.role);
      if (resultData.role === 'confirm') {
        console.log('Tapped');
      }
    })
  }
}
