import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Element } from '../../entities/elements/element';
import { ElementService } from '../element.service';
import { Store } from '@ngrx/store';
import { selectAllHeroes } from '../../entities/elements/element-reducer';

@Component({
  selector: 'app-hero-search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.css' ]
})
export class SearchComponent implements OnInit {
  heroes$: Observable<Element[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: ElementService, private store:Store<any>) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  searchStore(term){
    var filteredHeroes: Element[];
    this.store.select(selectAllHeroes).subscribe(heroes => {
      filteredHeroes = heroes.filter(hero=>hero.name.toLowerCase().indexOf(term.toLowerCase()) != -1);
      });

    return of(filteredHeroes);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.searchStore(term)),
    );
  }
}
