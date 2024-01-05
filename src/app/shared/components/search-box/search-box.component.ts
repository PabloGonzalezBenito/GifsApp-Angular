import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {
  @Input() placeholder: string = 'Buscar';
  @Output() onValue = new EventEmitter<string>();

  emitValue(termino:string) {
    this.onValue.emit(termino);
  }
}
