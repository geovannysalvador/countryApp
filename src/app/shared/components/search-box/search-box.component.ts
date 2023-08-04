import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  @Input()
  public placeholder:string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  emiteValue(value:string):void{
    this.onValue.emit(value);
  }

}
