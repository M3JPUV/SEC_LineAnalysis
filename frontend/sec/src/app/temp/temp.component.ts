import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-temp',
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.scss']
})
export class TempComponent implements OnInit {

  temps$: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getTemps().subscribe(
      data => this.temps$ = data
    )
  }

}