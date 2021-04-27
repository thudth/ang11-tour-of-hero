import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {MessageService} from './message.service';
import {Hero} from '../model/hero';
import {environment} from '../../environments/environment';


@Injectable({providedIn: 'root'})
export class HeroService {
  private baseUrl = environment.domainUrl;
  private heroesUrl = '/heroes';  // URL to json-server
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<any>(this.baseUrl + this.heroesUrl);
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    return this.http.get<any>(this.baseUrl + this.heroesUrl + '/' + id);
  }

  //////// Save methods //////////
  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<any> {
    return this.http.post<any>(this.baseUrl + this.heroesUrl, hero, this.httpOptions);
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<any>(this.baseUrl + this.heroesUrl + '/' + hero.id, hero, this.httpOptions);
  }

  /** DELETE: delete the hero from the server */
  deleteHero(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + this.heroesUrl + '/' + id, this.httpOptions);
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.baseUrl + this.heroesUrl}?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }
}
