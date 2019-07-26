import { Component, OnInit } from '@angular/core';
import { TappedService } from './tapped.service';
import { Tapped } from './tapped.model';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-tapped',
  templateUrl: './tapped.page.html',
  styleUrls: ['./tapped.page.scss'],
})
export class TappedPage implements OnInit {

  loadedTapped: Tapped[];

  constructor(private tappedService: TappedService) { }

  ngOnInit() {
    this.loadedTapped = this.tappedService.tapped;
  }

  onUndo(beerId: string, slidingEl: IonItemSliding){
    slidingEl.close();
    
  }
}
