import { Component, OnInit } from '@angular/core';
import { Element } from '../../entities/elements/element';
import { ElementService } from '../element.service';
import { Store } from '@ngrx/store';
import * as heroActions from '../../entities/elements/element-actions';
import { selectAllHeroes } from '../../entities/elements/element-reducer';

@Component({
  selector: 'app-heroes',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.css']
})
export class ElementsComponent implements OnInit {
  heroes: Element[];

  constructor(private heroService: ElementService, private store: Store<any>) { }

  ngOnInit() {
    this.getElements();
  }

  getElements(): void {
    this.store.select(selectAllHeroes).subscribe(heroes=>{
    this.heroes = heroes;
    });
  }

  onAdd(name: string): void {
    name = name.trim();
    if (!name) { return; }

    this.store.dispatch(new heroActions.AddElement({ name } as Element));

  }

  onDelete(hero: Element): void {
    this.store.dispatch(new heroActions.DeleteElement(hero));
  }

}
