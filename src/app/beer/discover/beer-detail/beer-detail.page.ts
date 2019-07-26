import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';

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
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
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

    this.actionSheetCtrl.create({
      header: 'Select',
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.openTappedModal('select');
          }
        },
        {
          text: 'Unknown',
          handler: () => {
            this.openTappedModal('random');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(actionSheetEl => {
      actionSheetEl.present();
    });
  }


  openTappedModal(mode: 'select' | 'random') {
    console.log(mode);
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
    });
  }
}
