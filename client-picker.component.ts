import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { AppFacadeService } from './../../../../../core/services/app-facade-service/app-facade-service.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'client-picker',
  templateUrl: './client-picker.component.html',
  styleUrls: ['./client-picker.component.scss']
})
export class ClientPickerComponent implements OnInit {

  ngOnInit(): void {
  }
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = false;
  separatorKeysCodes = [ENTER, COMMA];
  isLoading= false;
  clientList:any;
  selectedClient = [];
  selectedClientIds= [];
  @Output() clientChange=new EventEmitter<any>();

  clientCntrl = new FormControl();


  @ViewChild('clientInput') clientInput: ElementRef;

  constructor(private appService: AppFacadeService) {
   
  }

  remove(supervisor: any): void {
    const index = this.selectedClient.indexOf(supervisor);

    if (index >= 0) {
      this.selectedClient.splice(index, 1);
      this.selectedClientIds.splice(index,1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedClientIds.push(event.option.value);
    this.selectedClient.push(event.option.viewValue);
    this.clientInput.nativeElement.value = '';
  }
  getAllClients(name){  
    this.isLoading = true;  
    this.appService.searchClient(name.trim().toLocaleLowerCase()).subscribe(result=>{
      this.clientList = result;
      this.isLoading = false;
    })
  }
  selectionChanges(){
      this.clientChange.emit(this.selectedClientIds);
  }

}
