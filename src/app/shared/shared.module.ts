import { NgModule } from "@angular/core";


import { MapModalComponent } from './map-modal/map-modal.component';
import { LocationPickerComponent } from './pickers/location-picker/location-picker.component';
import { CommonModule } from '@angular/common';



@NgModule ({
    declarations: [LocationPickerComponent, MapModalComponent],
    imports: [CommonModule],
    exports: [LocationPickerComponent, MapModalComponent],
    entryComponents: [MapModalComponent]
})

export class SharedModule {}