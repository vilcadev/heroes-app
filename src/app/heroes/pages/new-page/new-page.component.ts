import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit{

  public heroForm = new FormGroup({
  id:      new FormControl<string>(''),
  superhero: new FormControl('',{ nonNullable: true }),
  publisher: new FormControl<Publisher>(Publisher.DCComics),
  alter_ego: new FormControl(''),
  first_appearance: new FormControl(''),
  characters:new FormControl(''),
  alt_img:new FormControl(''),
  })

  public publishers = [
    {id: 'DC Comics', desc: 'DC - Comics'},
    {id: 'Marvel Comics', desc: 'Marvel - Comics'},
  ];


  constructor(private heroService:HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ){}


  get currentHero(): Hero{
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  ngOnInit(): void {
    if(!this.router.url.includes('edit')) return;

    this.activatedRoute.params
    .pipe(
      switchMap( ({id})=> this.heroService.getHeroById(id)),
    ).subscribe(hero =>{

      if(!hero) return this.router.navigateByUrl('/'); // Si el héroe no existe lo sacamos de esta url

      this.heroForm.reset(hero);
      return;
    })
  }



  onSubmit():void{
    if(this.heroForm.invalid) return;

    // Si tenemos un id, entonces quiere actualizar
    if(this.currentHero.id){
      // Cualquier observable en el que no estamos suscritos, nunca se va a disparar
      this.heroService.updateHero(this.currentHero)
      .subscribe(hero => {
        // TODO: mostrar snackbar
      });

      return;
    }

    // Si notenemos un id, entonces quiere crear un héroe.
    this.heroService.addHero(this.currentHero)
    .subscribe(hero => {
      // TODO: mostrar snackbar , y navegar a /heroes/edit/hero.id
    });


  }
}
