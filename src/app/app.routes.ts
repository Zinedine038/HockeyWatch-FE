import { DeveloperProfileComponent } from './developer-profile/developer-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { Routes } from '@angular/router';
import { MailComponent } from './mail/mail.component';
import { TeamComponent } from './team/team.component';
import { TeamInfoComponent } from './team-info/team-info.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SplashComponent } from './splash/splash.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerInfoComponent } from './player-info/player-info.component';
import { MatchComponent } from './match/match.component';
import { MatchCasterDashboardComponent } from './match-caster-dashboard/match-caster-dashboard.component';
import { authCasterGuard } from './auth-caster.guard';
import { authGuard } from './auth.guard';
import { authLoggedInGuard } from './auth-loggedin-guard';
import { ConfirmComponent } from './confirm/confirm.component';
import { PostRegistrationComponent } from './post-registration/post-registration.component';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { EditPlayerComponent } from './edit-player/edit-player.component';

export const routes: Routes = [
  { path: '', component: SplashComponent, canActivate: [authLoggedInGuard] },
  { path: 'home', component: DashboardComponent, canActivate: [authGuard]},
  { path: 'dev-profile', component: DeveloperProfileComponent },
  { path: 'dev-contact', component: MailComponent },
  { path: 'team-list', component: TeamComponent, canActivate: [authGuard] },
  { path: 'team-info', component: TeamInfoComponent, canActivate: [authGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [authLoggedInGuard],
  },
  {
    path: 'edit-team',
    component: EditTeamComponent,
    canActivate: [authCasterGuard],
  },
  {
    path: 'edit-player',
    component: EditPlayerComponent,
    canActivate: [authCasterGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authLoggedInGuard],
  },
  { path: 'post-registration', component: PostRegistrationComponent, canActivate: [authLoggedInGuard] },
  { path: 'confirm', component: ConfirmComponent, canActivate: [authLoggedInGuard] },
  { path: 'players', component: PlayerListComponent, canActivate: [authGuard] },
  { path: 'player', component: PlayerInfoComponent, canActivate: [authGuard] },
  { path: 'match', component: MatchComponent, canActivate: [authGuard] },
  {
    path: 'match-caster-dashboard',
    component:
      MatchCasterDashboardComponent,canActivate: [authCasterGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];
