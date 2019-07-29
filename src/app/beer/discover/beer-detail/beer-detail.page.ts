import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController, LoadingController } from '@ionic/angular';

import { BeerService } from '../../beer.service';
import { Beer } from '../../beer.model';
import { CreateTappedComponent } from '../../../tapped/create-tapped/create-tapped.component';
import { Subscription } from 'rxjs';
import { TappedService } from 'src/app/tapped/tapped.service';


@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.page.html',
  styleUrls: ['./beer-detail.page.scss'],
})
export class BeerDetailPage implements OnInit, OnDestroy {
  beer: Beer;
  private beerSub: Subscription;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private beerService: BeerService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private tappedService: TappedService,
    private loadingCtrl: LoadingController
    ) {}

  ngOnInit() {
    this.beerSub = this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('beerId')){
        this.navCtrl.navigateBack('/beer/tabs/discover');
        return;
      }
      this.beerService.getBeer(paramMap.get('beerId')).subscribe(beer => {
        this.beer = beer;
      });
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
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(actionSheetEl => {
      actionSheetEl.present();
    });
  }


  openTappedModal(mode: 'select' ) {
    console.log(mode);
    this.modalCtrl
    .create({
      component: CreateTappedComponent, 
      componentProps: {tappedBeer: this.beer, selectedMode: mode} 
    })
    .then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    })
    .then(resultData => {
      if (resultData.role === 'confirm') {
        this.loadingCtrl
        .create({
          message: 'Chugging...'})
        .then(loadingEl => {
          loadingEl.present();
          const data = resultData.data.tappedData;
          this.tappedService.addTapped(
            this.beer.id, 
            this.beer.title, 
            this.beer.imageUrl, 
            data.name, 
            data.state, 
            data.date
          ).subscribe(() =>{
          loadingEl.dismiss();
        });
      });
    }
    });
  }

  ngOnDestroy(){
    if(this.beerSub) {
      this.beerSub.unsubscribe();
    }
  }
}
