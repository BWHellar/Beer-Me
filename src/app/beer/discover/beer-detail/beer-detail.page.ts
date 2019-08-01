import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ModalController, ActionSheetController, LoadingController, AlertController } from '@ionic/angular';

import { BeerService } from '../../beer.service';
import { Beer } from '../../beer.model';
import { CreateTappedComponent } from '../../../tapped/create-tapped/create-tapped.component';
import { Subscription } from 'rxjs';
import { TappedService } from 'src/app/tapped/tapped.service';
import { AuthService } from 'src/app/auth/auth.service';
import { MapModalComponent } from 'src/app/shared/map-modal/map-modal.component';




@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.page.html',
  styleUrls: ['./beer-detail.page.scss'],
})
export class BeerDetailPage implements OnInit, OnDestroy {
  beer: Beer;
  isTapped = false;
  isLoading = false;
  private beerSub: Subscription;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private beerService: BeerService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private tappedService: TappedService,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private router: Router
    ) {}

  ngOnInit() {
    this.beerSub = this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('beerId')){
        this.navCtrl.navigateBack('/beer/tabs/discover');
        return;
      }
      this.isLoading = true;
      this.beerService.getBeer(paramMap.get('beerId')).subscribe(beer => {
        this.beer = beer;
        this.isTapped = beer.userId !== this.authService.userId;
        this.isLoading = false;
      }, error => {
        this.alertCtrl.create({header: 'Error', message: 'Could Not Load', buttons: [{text: 'OK', handler: () => {
          this.router.navigate(['/beer/tabs/discover'])
        }}]
      }).then(alertEl=> alertEl.present()); 
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
          ).subscribe(() => {
          loadingEl.dismiss();
        });
      });
    }
    });
  }

  onShowFullMap() {
    this.modalCtrl.create({
    component : MapModalComponent,
    componentProps: {
    center: {
      lat:this.beer.location.lat,
      lng: this.beer.location.lng},
    selectable: false,
    closeButtonText: 'Close',
    title: this.beer.location.address
    }
    }).then(modalEl=> {
      modalEl.present();
    });
  }

  ngOnDestroy(){
    if(this.beerSub) {
      this.beerSub.unsubscribe();
    }
  }
}
