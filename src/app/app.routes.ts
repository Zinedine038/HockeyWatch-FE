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

export const routes: Routes = [
    { path: '', component: SplashComponent, canActivate: [authLoggedInGuard] },
    { path: 'home', component: DashboardComponent},
    { path: 'dev-profile', component: DeveloperProfileComponent },
    { path: 'dev-contact', component: MailComponent },
    { path: 'team-list', component: TeamComponent },
    { path: 'team-info', component: TeamInfoComponent },
    { path: 'register', component: RegisterComponent, canActivate: [authLoggedInGuard]},
    { path: 'login', component: LoginComponent, canActivate: [authLoggedInGuard]},
    { path: 'post-registration', component: PostRegistrationComponent},
    { path: 'confirm', component: ConfirmComponent},
    { path: 'players', component: PlayerListComponent},
    { path: 'player', component: PlayerInfoComponent},
    { path: 'match', component: MatchComponent /*, canActivate: [authGuard]*/},
    { path: 'match-caster-dashboard', component: MatchCasterDashboardComponent /*,canActivate: [authCasterGuard] */},	
    { path: '**', component: PageNotFoundComponent }
];
