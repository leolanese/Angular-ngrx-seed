import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Element } from '../entities/elements/element';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ElementService {

  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET elements from the server */
  getElements(): Observable<Element[]> {
    return this.http.get<Element[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log(`fetched elements`)),
        catchError(this.handleError('getElements', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Element> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Element[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Element>(`getHero id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Element> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Element>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Element>(`getHero id=${id}`))
    );
  }

  /* GET elements whose name contains search term */
  searchHeroes(term: string): Observable<Element[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Element[]>(`api/heroes/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Element[]>('searchHeroes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addHero (hero: Element): Observable<Element> {
    return this.http.post<Element>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Element) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Element>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero (hero: Element): Observable<number> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    this.http.delete<Element>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Element>('deleteHero'))
    );

    return of(hero.id);
  }

  /** PUT: update the hero on the server */
  updateElement (hero: Element): Observable<any> {
    this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateElement'))
    );

    return of(hero);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ElementService message with the MessageService */
  private log(message: string) {
    this.messageService.add('ElementService: ' + message);
  }
}
