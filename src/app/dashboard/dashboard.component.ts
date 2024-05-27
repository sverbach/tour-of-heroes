import { Component, Input, OnInit, inject } from '@angular/core';
import { HeroesDataService } from '../heroes-data.service';
import { Observable, map } from 'rxjs';
import { Hero } from '../hero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent {
  @Input()
  heroes$!: Observable<Hero[]>;
}
