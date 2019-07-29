import { Component, OnInit, OnDestroy } from '@angular/core';

import { BeerService } from '../beer.service';
import { Beer } from '../beer.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit, OnDestroy {
  tryBeers: Beer[];
  isLoading = false;
  private beerSub: Subscription;

  constructor(private beerService: BeerService) { }

  ngOnInit() {
    this.beerSub = this.beerService.beer.subscribe(beer => {
      this.tryBeers = beer;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.beerService.fetchBeer().subscribe(() => {
      this.isLoading = false;
    });
  }

  onEdit(beerId: string) {
    console.log('Editing', beerId);
  }

  ngOnDestroy() {
    if(this.beerSub) {
      this.beerSub.unsubscribe();
    }
  }
}
