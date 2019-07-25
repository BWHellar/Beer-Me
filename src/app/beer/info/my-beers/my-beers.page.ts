import { Component, OnInit } from '@angular/core';

import { Beer } from '../../beer.model';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BeerService } from '../../beer.service';


@Component({
  selector: 'app-my-beers',
  templateUrl: './my-beers.page.html',
  styleUrls: ['./my-beers.page.scss'],
})
export class MyBeersPage implements OnInit {
  beer: Beer;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private beerService: BeerService
    ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('beerId')){
        this.navCtrl.navigateBack('/beer/tabs/info');
        return;
      }
      this.beer = this.beerService.getBeer(paramMap.get('beerId'));
    });
  }

}
