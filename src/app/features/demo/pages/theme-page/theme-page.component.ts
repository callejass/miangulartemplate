import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-theme-page',
  templateUrl: './theme-page.component.html',
  styleUrls: ['./theme-page.component.css']
})
export class ThemePageComponent implements OnInit {

  constructor() { }

  fecha: FormControl = new FormControl('2023-05-24');

  ngOnInit(): void {
    console.log('');
  }

}
