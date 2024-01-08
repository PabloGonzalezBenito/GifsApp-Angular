import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  //ngOnDestroy se va a llamar cuando esta instancia del componente va a ser destruida
  //Normalmente, cuando se sale de la pagina o se utiliza ngIf
 

  //Un subject es un tipo especial de observable creado manualmente
  //En este caso se utiliza para incluir el deBounce en nuestra busqueda
  //deBounce consiste en realizar la busqueda cuando el usuario deja de presionar teclas
  //durante un periodo x de tiempo
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  //El ngOnInit se ejecuta cuando este componente se inicializa, especificamente despues del constructor

  @Input() placeholder: string = 'Buscar';
  @Input() initialValue: string = '';
  @Output() onValue = new EventEmitter<string>();
  @Output() onDebounce = new EventEmitter<string>();
  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(
        //el operador debounceTime, de RXJS, hace que haya que esperar X ms para que el observable emita valores
        debounceTime(300)
      )
      .subscribe(value => {
        this.onDebounce.emit(value);
      })
  }

  //hay que realizar la desubscripcion para cualquier observable que no sea en el service
  //porque ya viene una forma de autocerrar esas subscripciones
  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  // emitValue(termino:string) {
  //   this.onValue.emit(termino);
  // }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);

  }
}
