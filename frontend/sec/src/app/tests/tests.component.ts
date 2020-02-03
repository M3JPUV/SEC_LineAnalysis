import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {

  tests$: object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getTest().subscribe(
      data => this.tests$ = data
    );
  }

}
