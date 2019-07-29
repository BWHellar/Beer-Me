import { Component, OnInit, OnDestroy } from '@angular/core';
import { TappedService } from './tapped.service';
import { Tapped } from './tapped.model';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tapped',
  templateUrl: './tapped.page.html',
  styleUrls: ['./tapped.page.scss'],
})
export class TappedPage implements OnInit, OnDestroy {

  loadedTapped: Tapped[];
  private tappedSub: Subscription;

  constructor(private tappedService: TappedService) { }

  ngOnInit() {
    this.tappedSub = this.tappedService.tapped.subscribe(tapped => {
      this.loadedTapped =tapped;
    })
  }

  onUndo(beerId: string, slidingEl: IonItemSliding){
    slidingEl.close();
    
  }

  ngOnDestroy() {
    if(this.tappedSub){
      this.tappedSub.unsubscribe();
    }
  }
}
