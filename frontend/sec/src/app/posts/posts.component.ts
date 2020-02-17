import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  
  posts$: Object;
  
  constructor(private data: DataService) { }

  //.subscribe has to do with API, will be changed in the future
  ngOnInit() {
    this.data.getPosts().subscribe(
      data => this.posts$ = data 
    );
  }

}