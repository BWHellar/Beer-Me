import { Component, OnInit, Input } from '@angular/core';
import { Beer } from '../../beer.model';

@Component({
  selector: 'app-info-item',
  templateUrl: './info-item.component.html',
  styleUrls: ['./info-item.component.scss'],
})
export class InfoItemComponent implements OnInit {
  @Input() beer: Beer;

  constructor() { }

  ngOnInit() {}


}
