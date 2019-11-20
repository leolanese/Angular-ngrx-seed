import { Injectable } from '@angular/core';
import { ofAction } from 'ngrx-actions';
import { Store } from '@ngrx/store';
import {Effect, Actions, ofType} from '@ngrx/effects';

import * as heroActions from './element-actions';

import { map, switchMap, catchError } from 'rxjs/operators';
import { ElementService } from '../../app/element.service';
import { MessageService } from '../../app/message.service';
import { StoreElementActionsTypesUnion } from "./element-actions";
import {AddElement} from "./element-actions";

@Injectable()
export class ElementEffects {
  constructor(
    private store: Store<any>,
    private update$: Actions,
    private heroService: ElementService,
    private messageService: MessageService) {}

@Effect()
addElement$ = this.update$.pipe(
  ofAction(heroActions.AddElement),
  switchMap(hero => this.heroService.addHero(hero.payload)),
  map(response => {
    this.messageService.add("Adding hero to the store.");
    return new heroActions.AddElementSuccess(response);
    },
  catchError(error => error.subscribe().switchMap(error =>{
    console.log(error)
  }))));

@Effect()
getElement$ = this.update$.pipe(
  ofAction(heroActions.GetElements),
  switchMap(hero => this.heroService.getElements()),
  map(response => {
    this.messageService.add("Populating store with elements.");
    return new heroActions.GetElementsSuccess(response);
    }));

@Effect()
updateElement$ = this.update$.pipe(
  ofAction(heroActions.UpdateElement),
  switchMap(hero => this.heroService.updateElement(hero.payload)),
  map(response => {
    this.messageService.add("Updating hero in the store.");
    return new heroActions.UpdateElementSuccess(response);
    }));

@Effect()
deleteElement$ = this.update$.pipe(
  ofAction(heroActions.DeleteElement),
  switchMap(hero => this.heroService.deleteHero(hero.payload)),
  map(response => {
    this.messageService.add("Deleting hero in the store.");
    return new heroActions.DeleteElementSuccess(response);
    }));
}
