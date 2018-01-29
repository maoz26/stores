import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AgmCoreModule } from '@agm/core';
import {AppService} from './shared/services/store.service';
import {HttpModule} from '@angular/http';
import {ValuesPipe} from './shared/pipes/sort.pipe';
import { HaversineService } from 'ng2-haversine';
import {StoreComponent} from './store/store.component';
import {StoresMapComponent} from './stores-map/stores-map.component';

@NgModule(<NgModule>{
  declarations: [
    AppComponent,
    ValuesPipe,
    StoreComponent,
    StoresMapComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCKFDpfX_M0Tu1_0CDEJWTo_AhhOh8aIZE',
      libraries: ['places']
    }),
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AppService, HaversineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
