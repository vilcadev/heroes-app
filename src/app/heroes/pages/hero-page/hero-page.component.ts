import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit{

  // Es opcional (?) ya que, cuando el componente se crea en algún determinado momento en el tiempo -
  // no tiene ningún valor, por ende es nulo.
  public hero?: Hero;

  // Con activatedRoute podemos leer cual es el URL (obviamente en donde estamos)
  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ){}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      delay(1000),
      // switchMap -> Permite tomar los params. En este caso lo desestructuramos para sacar el id
      switchMap (({id}) => this.heroesService.getHeroById(id)), //getHeroById -> Si el héroe no se encuentra esto devolverá undefined
    )
    .subscribe( hero=>{

      // Si el servicio regresa un héroe que no existe, entonces devuelvo al usuario a la lista de héroes
      if(!hero) return this.router.navigate([ '/heroes/list' ]);

      this.hero = hero;
      console.log({hero})
      return;
    } )
  }



  goBack():void{
    this.router.navigateByUrl('heroes/list')
  }

}
