import { Component, OnInit } from '@angular/core';
import { BeerService } from '../beer.service';

import { Beer } from '../beer.model';
import { SegmentChangeEventDetail } from '@ionic/core';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  loadedBeer: Beer[];
  listedLoadedBeer: Beer[];

  constructor(private beerService: BeerService) { }

  ngOnInit() {
    this.loadedBeer = this.beerService.beer;
    this.listedLoadedBeer = this.loadedBeer.slice(1);
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>){
    console.log(event.detail);
  }
}
