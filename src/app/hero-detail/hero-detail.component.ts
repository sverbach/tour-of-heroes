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
  @Input()
  protected hero!: DataStream<Hero>;

  // Recreate a problem setting relating to project.
  // 1. Add a hero store.
  // 2. Add another dependend api call that returns the powers of 1 hero.
  // 3. Create a HeroPowersComponent that also uses hero store.
  // 4. Display both components on the same screen.
  // 5. Add a possibility to cache hero powers reference data.
  // 6. Invalidate cache (cold reload)
  // 7. Reload data (hot reload)
  // 8. How can I reload just hero?
  // 9. How can I just reload hero powers?
  // 10. Error handling

  constructor(
    private location: Location
  ) {
  }

  ngOnInit(): void {
    console.log(this.hero);
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
