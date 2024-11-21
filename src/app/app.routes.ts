import { Routes } from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {HomeComponent} from './home/home.component';
import {SignInComponent} from './sign-in/sign-in.component';
// import {HomeComponent} from './home/home.component';
// import {ProfileComponent} from './profile/profile.component';
// import {NotFoundComponent} from './not-found/not-found.component';
// import {AuthComponent} from './auth/auth.component';
// import {SavePostsComponent} from './posts/save-posts/save-posts.component';
// import {ListPostsComponent} from './posts/list-posts/list-posts.component';

export const routes: Routes = [
  { path: '',   redirectTo: 'login', pathMatch: 'full' },
  { path: 'home',   component: HomeComponent },
  { path: 'signin',   component: SignInComponent },
  {path: 'login', component: AuthComponent}];
//   {path: 'profile', component: ProfileComponent},
//   {path: 'posts', component: ListPostsComponent},
//   {path: 'savepost', component: SavePostsComponent},
//   {path: 'login', component: AuthComponent},
//   {path: 'logout', component: AuthComponent},
//   {path: '**', component: NotFoundComponent}
// ];
