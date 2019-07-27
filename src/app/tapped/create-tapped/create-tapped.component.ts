import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Beer } from 'src/app/beer/beer.model';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-create-tapped',
  templateUrl: './create-tapped.component.html',
  styleUrls: ['./create-tapped.component.scss'],
})
export class CreateTappedComponent implements OnInit {
  @Input() tappedBeer: Beer;
  @Input() selectedMode: 'select' | 'random';
  @ViewChild('ref') form: NgForm;


  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
  onTap() {
    if(!this.form.valid ) {
      return;
    }

    this.modalCtrl.dismiss({ tappedData: {
      name: this.form.value['name'],
      state: this.form.value['state'],
      date: this.form.value['date']
    }  }, 'confirm');
  }


}
