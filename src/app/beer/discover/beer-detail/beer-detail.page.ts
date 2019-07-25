import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { BeerService } from '../../beer.service';
import { Beer } from '../../beer.model';

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.page.html',
  styleUrls: ['./beer-detail.page.scss'],
})
export class BeerDetailPage implements OnInit {
  beer: Beer;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private beerService: BeerService
    ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('beerId')){
        this.navCtrl.navigateBack('/beer/tabs/discover');
        return;
      }
      this.beer = this.beerService.getBeer(paramMap.get('beerId'))
    });
  }

  onSaveBeer() {
    this.navCtrl.navigateBack('/beer/tabs/discover');
  }
}
