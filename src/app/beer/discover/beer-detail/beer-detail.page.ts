import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.page.html',
  styleUrls: ['./beer-detail.page.scss'],
})
export class BeerDetailPage implements OnInit {

  constructor(private router: Router, private navCtrl: NavController) { }

  ngOnInit() {
  }

  onSaveBeer() {
    this.navCtrl.navigateBack('/beer/tabs/discover');
  }

}
