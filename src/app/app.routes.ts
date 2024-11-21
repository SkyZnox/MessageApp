import { Routes } from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {HomeComponent} from './home/home.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {ConversationComponent} from "./conversation/conversation.component";
import {GroupsComponent} from "./groups/groups.component";
import {NotFoundComponent} from "./not-found/not-found.component";


export const routes: Routes = [
  { path: '',   redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',   component: HomeComponent },
  { path: 'signin',   component: SignInComponent },
  { path: 'groups',   component: GroupsComponent },
  { path: 'conversation/:userId',   component: ConversationComponent },
  {path: 'login', component: AuthComponent},
  {path: '**', component: NotFoundComponent}
];
