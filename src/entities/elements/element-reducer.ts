import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Element } from './element';

import * as heroActions from './element-actions';
import {Observable} from 'rxjs/Observable';

import {StoreElementActionsTypes, StoreElementActionsTypesUnion} from "./element-actions";

export interface HeroState extends EntityState<Element> {
  selectedHeroId: number | null;
 }

const elementdapter = createEntityAdapter<Element>({
    selectId: (element: Element) => element.id
});

const heroInitialState: HeroState = elementdapter.getInitialState({
    selectedHeroId: null
});


export function elementReducer(
  state: HeroState = heroInitialState,
  action
): HeroState {
  switch (action.type) {
    case StoreElementActionsTypes.AddElementSuccess:
      return elementdapter.addOne(action.payload, state);

    case StoreElementActionsTypes.AddElementSuccess:
      return elementdapter.addOne(action.payload, state);

    case StoreElementActionsTypes.GetElementsSuccess:
      return elementdapter.addAll(action.payload, state);

    case StoreElementActionsTypes.UpdateElementSuccess:
      return elementdapter.updateOne(action.payload, state);

    case StoreElementActionsTypes.DeleteElementSuccess:
      return elementdapter.removeOne(action.payload, state);

    case StoreElementActionsTypes.SelectElement:
      state.selectedHeroId = action.payload;

      return state;

    default:
      return state;
  }
}

export const selectHeroState = createFeatureSelector<HeroState>('heroes');

export const { selectAll: selectAllHeroes, selectIds } = elementdapter.getSelectors(
  selectHeroState
);

export const getSelectedHero = createSelector(
    selectHeroState,
    (state) => {
      return state.entities[state.selectedHeroId];
    }
);
