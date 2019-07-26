import { Component, OnInit } from '@angular/core';

import { BeerService } from '../beer.service';
import { Beer } from '../beer.model';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  tryBeers: Beer[];

  constructor(private beerService: BeerService) { }

  ngOnInit() {
    this.tryBeers = this.beerService.beer;
  }

  onEdit(beerId: string) {
    console.log('Editing', beerId);
  }
}
