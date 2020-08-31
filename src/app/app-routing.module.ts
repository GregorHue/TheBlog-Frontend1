import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostWithCommentsComponent } from './components/post-with-comments/post-with-comments.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';
import { RouteGuardService } from './services/route-guard.service';


const routes: Routes = [
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'posts/:postId/comments',
    pathMatch: 'full',
    component: PostWithCommentsComponent
  },
  {
    path: 'users/:userId',
    pathMatch: 'full',
    component: ProfileComponent,
    canActivate: [RouteGuardService],
    data: {
      name: 'profile'
    }
  },
  {
    path: 'users',
    pathMatch: 'full',
    component: UsersComponent,
    canActivate: [RouteGuardService],
    data: {
      name: 'users'
    }
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
