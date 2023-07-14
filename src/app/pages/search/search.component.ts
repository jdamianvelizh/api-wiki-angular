import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-search',
  template: `
    <div class="form">
      <form>
        <div class="form--field">
          <input type="text" [formControl]="inputSearch" placeholder="Search" />
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.onChange();
  }

  inputSearch = new FormControl('');
  @Output() submitted = new EventEmitter();


  onChange(): void {
    //Programacion reactiva para mejorar las peticiones al api usando Operadores
    this.inputSearch.valueChanges
      .pipe(
        //Modificacion a los temrinos recibidos quitando espacios
        map((search) => search?.trim()),
        //Hara una pausa de determnado tiempo y luego emmitira
        debounceTime(500),
        //Verificara que el valor a emitir no sea igual al anterior
        distinctUntilChanged(),
        //Verificacion de que no sea un string vacio
        filter((search) => search !== ''),
        tap((search) => this.submitted.emit(search)))
      .subscribe();

      //  Peticiones cada que cambia el input
    // this.inputSearch.valueChanges
    //   .pipe(tap((res) => this.submitted.emit(res)))
    //   .subscribe();
  }
}
