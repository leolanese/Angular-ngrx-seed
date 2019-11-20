import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Element } from '../../entities/elements/element';
import { ElementService }  from '../element.service';
import { Store } from '@ngrx/store';
import * as heroActions from '../../entities/elements/element-actions';
import { selectAllHeroes, getSelectedHero } from '../../entities/elements/element-reducer';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './detail.component.html',
  styleUrls: [ './detail.component.css' ]
})
export class DetailComponent implements OnInit, OnDestroy {
  @Input()
  element: Element;

  hero$: Observable<Element>;

  constructor(
    private route: ActivatedRoute,
    private heroService: ElementService,
    private location: Location,
    private store: Store<any>
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  ngOnDestroy(){
    this.element = null;
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    //this.heroService.getHero(id)
      //.subscribe(hero => this.hero = hero);
    
    this.store.select(selectAllHeroes).subscribe(heroes=>{
      this.element = heroes.find(hero => hero.id == id);
    });

    /*this.store.dispatch(new heroActions.SelectHero(id));
    this.hero$ = this.store.select(getSelectedHero);
    this.hero$.subscribe(hero => this.hero = hero);*/
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
   this.store.dispatch(new heroActions.UpdateElement(this.element));
   this.goBack();
    //this.heroService.updateHero(this.hero)
    //.subscribe(() => this.goBack());
  }
}
