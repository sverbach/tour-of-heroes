import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { DataStream } from '../data-loading/data-stream';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  protected _hero!: Hero;

  @Input() public set hero(value: DataStream<Hero>) {
    console.log(value);
    this._hero = value.initialValue!;

    value.subscribe(console.log);
    value.subscribe(console.log);
    value.subscribe(console.log);
    value.subscribe(console.log);
  }

  constructor(
    private location: Location
  ) {
  }

  ngOnInit(): void {
    console.log(this._hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      /*this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());*/
    }
  }
}
