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
  private beerSub: Subscription;

  constructor(private beerService: BeerService) { }

  ngOnInit() {
    this.beerSub = this.beerService.beer.subscribe(beer => {
      this.tryBeers = beer;
    });
  }

  ionViewWillEnter() {
    this.beerService.fetchBeer().subscribe();
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
