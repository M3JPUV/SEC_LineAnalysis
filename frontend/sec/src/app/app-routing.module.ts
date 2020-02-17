import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TempComponent} from './temp/temp.component';
import { DetailsComponent} from './details/details.component';
import { PostsComponent} from './posts/posts.component';
import { TestsComponent } from './tests/tests.component';
import { LoginComponent } from './login/login.component';

// routes/links to all pages
const routes: Routes = [
  {
    path: '',
    component: TempComponent
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'tests',
    component: TestsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
