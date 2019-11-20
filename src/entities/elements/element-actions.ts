import { Element } from './element';
import { Action } from '@ngrx/store';

export enum StoreElementActionsTypes {
   AddElement = '[Add Element] Add Element',
   AddElementSuccess = '[Add Element Success] Add Element Success',
   GetElements = '[Get Element] Get Elements',
   GetElementsSuccess = '[Get Element Success] Get Elements Success',
   UpdateElement = '[Update Element] Update Element',
   UpdateElementSuccess = '[Update Element Success] Update Element Success',
   DeleteElement = '[Delete Element] Delete Element',
   DeleteElementSuccess = '[Delete Element Success] Delete Element Success',
   SelectElement = '[Select Element] Select Element'
}

export class AddElement implements Action {
   readonly type = StoreElementActionsTypes.AddElement;
   constructor(public payload: Element) {}
}
export class AddElementSuccess implements Action  {
   readonly type = StoreElementActionsTypes.AddElementSuccess;
   constructor(public payload: Element) {}
}
export class GetElements implements Action {
   readonly type = StoreElementActionsTypes.GetElements;
}
export class GetElementsSuccess implements Action  {
   readonly type = StoreElementActionsTypes.GetElementsSuccess;
   constructor(public payload: Element[]) {}
}
export class UpdateElement implements Action {
   readonly type = StoreElementActionsTypes.UpdateElement;
   constructor(public payload: Element) {}
}
export class UpdateElementSuccess implements Action  {
   readonly type = StoreElementActionsTypes.UpdateElementSuccess;
   constructor(public payload: Element) {}
}
export class DeleteElement implements Action {
   readonly type = StoreElementActionsTypes.DeleteElement;
   constructor(public payload: Element) {}
}
export class DeleteElementSuccess implements Action  {
   readonly type = StoreElementActionsTypes.DeleteElementSuccess;
   constructor(public payload: number) {}
}
export class SelectElement implements Action {
   readonly type = StoreElementActionsTypes.SelectElement;
   constructor(public payload: number) {}
}

export type StoreElementActionsTypesUnion =
    | AddElement
    | AddElementSuccess
    | GetElements
    | GetElementsSuccess
    | UpdateElement
    | UpdateElementSuccess
    | DeleteElement
    | DeleteElementSuccess
    | SelectElement
