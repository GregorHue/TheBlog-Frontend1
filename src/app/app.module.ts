import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { BASEURL } from './utils/baseUrl';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PostWithCommentsComponent } from './components/post-with-comments/post-with-comments.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { HeaderComponent } from './components/header/header.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { NewCommentComponent } from './components/new-comment/new-comment.component';
import { EditCommentComponent } from './components/edit-comment/edit-comment.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { CustomInterceptor } from './interceptors/http-interceptor';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPostByPipe } from './pipes/sort-post-by.pipe';
import { SortCommentByPipe } from './pipes/sort-comment-by.pipe';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostWithCommentsComponent,
    ProfileComponent,
    UsersComponent,
    TooltipComponent,
    HeaderComponent,
    EditPostComponent,
    NewPostComponent,
    NewCommentComponent,
    EditCommentComponent,
    SignupComponent,
    LoginComponent,
    FilterPipe,
    SortPostByPipe,
    SortCommentByPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    OverlayscrollbarsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: [`${BASEURL}/login`, `${BASEURL}/signup`],
      },
    })
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true }, NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
