import { Injectable } from '@angular/core';

import { Tapped } from './tapped.model';

@Injectable({ providedIn: 'root'})


export class TappedService {
    private _tapped: Tapped [] = [
        {
            id: '419',
            beerId: 'b1',
            beerTitle: 'Sister',
            userId: 'jojo',
            date: 'Test',
            state: 'California'

        }
    ];

    get tapped(){
        return [...this._tapped];
    }
}