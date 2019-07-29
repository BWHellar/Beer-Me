import { Component, OnInit } from '@angular/core';
import { BeerService } from '../beer.service';

import { Beer } from '../beer.model';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  loadedBeer: Beer[];
  listedLoadedBeer: Beer[];
  relevantBeer: Beer[];
  isLoading = false;

  private beerSub: Subscription;

  constructor(private beerService: BeerService, private menuCtrl: MenuController, private authService: AuthService) { }

  ngOnInit() {
    this.beerSub = this.beerService.beer.subscribe(beer => {
      this.loadedBeer = beer;
      this.relevantBeer = this.loadedBeer;
      this.listedLoadedBeer = this.relevantBeer.slice(1);
    });
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>){
    if (event.detail.value === 'local'){
      this.relevantBeer = this.loadedBeer;
      this.listedLoadedBeer = this.relevantBeer.slice(1);
    } else {
      this.relevantBeer = this.listedLoadedBeer.filter(beer => beer.userId !== this.authService.userId
      );
    }
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.beerService.fetchBeer().subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if(this.beerSub) {
      this.beerSub.unsubscribe();
    }
  }
}
