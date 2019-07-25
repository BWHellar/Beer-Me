import { Component, OnInit, Input } from '@angular/core';
import { Beer } from 'src/app/beer/beer.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-tapped',
  templateUrl: './create-tapped.component.html',
  styleUrls: ['./create-tapped.component.scss'],
})
export class CreateTappedComponent implements OnInit {
  @Input() tappedBeer: Beer;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onTapBeer() {
    this.modalCtrl.dismiss({
      message: 'Test Msg'
    }, 'confirm');
  }
}
