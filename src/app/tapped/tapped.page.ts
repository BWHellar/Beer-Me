import { Component, OnInit, OnDestroy } from '@angular/core';
import { TappedService } from './tapped.service';
import { Tapped } from './tapped.model';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tapped',
  templateUrl: './tapped.page.html',
  styleUrls: ['./tapped.page.scss'],
})
export class TappedPage implements OnInit, OnDestroy {

  loadedTapped: Tapped[];
  private tappedSub: Subscription;

  constructor(private tappedService: TappedService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.tappedSub = this.tappedService.tapped.subscribe(tapped => {
      this.loadedTapped =tapped;
    })
  }

  onUndo(tappedId: string, slidingEl: IonItemSliding){
    slidingEl.close();
    this.loadingCtrl.create({
      message: 'Chugging...'
    }).then(loadingEl => {
      loadingEl.present();
      this.tappedService.cancelTapped(tappedId).subscribe(() => {
        loadingEl.dismiss();
      });
    });
  }

  ngOnDestroy() {
    if(this.tappedSub){
      this.tappedSub.unsubscribe();
    }
  }
}
