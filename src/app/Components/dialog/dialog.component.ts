import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  action:any;
  titleOfComponent:any;
  
  constructor() {
    this.titleOfComponent="Gateway";
    this.action="Add";
   }

  ngOnInit(): void {
    this.titleOfComponent="Gateway";
    this.action="Add";
  }

}
