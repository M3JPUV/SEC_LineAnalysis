import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PostsComponent } from './posts/posts.component';
import { TempComponent } from './temp/temp.component';
import { DetailsComponent } from './details/details.component';
import { TestsComponent } from './tests/tests.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    PostsComponent,
    TempComponent,
    DetailsComponent,
    TestsComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

