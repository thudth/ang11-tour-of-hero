import {Injectable} from '@angular/core';
import {Hero} from '../model/hero';
import {HEROES} from '../mock/mock-heroes';
import {MessageService} from './message.service';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
  }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

  // getHeroes(): Observable<Hero[]> {
  //   const heroes = of(HEROES);
  //   this.messageService.add('HeroService: fetched heroes');
  //   return heroes;
  // }

  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    console.log('getHeroes mock api');
    return this.http.get<Hero[]>(this.heroesUrl);
  }

  getHero(id: number): Observable<Hero> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const hero = HEROES.find(h => h.id === id) as Hero;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }
}
