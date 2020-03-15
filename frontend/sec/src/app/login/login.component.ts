import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    
  }
  //check if vaild username and password, and if vaild go to new page if not vailf reload page ?
  submit(UN : string,PW : string) {
    var UandP = { "Username": "", "Password" : "" };
    UandP.Username = UN;
    UandP.Password = PW;
    this.rest.login(UandP);
    
  };

}
