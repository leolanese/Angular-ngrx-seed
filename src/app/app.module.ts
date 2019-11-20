import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';

import { DetailComponent }  from './detail/detail.component';
import { ElementsComponent }      from './elements/elements.component';
import { SearchComponent }  from './search/search.component';
import { ElementService }       from './element.service';
import { MessageService }       from './message.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// import { MessagesComponent }    from './messages/messages.component';
import { elementReducer } from '../entities/elements/element-reducer';
import { ElementEffects } from '../entities/elements/element-effects';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    StoreModule.forRoot({}),
    StoreModule.forFeature('heroes', elementReducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([ElementEffects]),
  ],
  declarations: [
    AppComponent,

    ElementsComponent,
    DetailComponent,
  
    SearchComponent
  ],
  providers: [ ElementService, MessageService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
