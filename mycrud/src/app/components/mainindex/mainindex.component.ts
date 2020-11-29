import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../MessageService';

// const messageService = new MessageService();


@Component({
  selector: 'app-mainindex',
  templateUrl: './mainindex.component.html',
  styleUrls: ['./mainindex.component.css']
})
export class MainindexComponent implements OnInit {

  constructor(){

  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }


}
