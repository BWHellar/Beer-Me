import { Component, OnInit } from '@angular/core';
import { BeerService } from '../beer.service';

import { Beer } from '../beer.model';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  loadedBeer: Beer[];

  constructor(private beerService: BeerService) { }

  ngOnInit() {
    this.loadedBeer = this.beerService.beer;
  }

}
