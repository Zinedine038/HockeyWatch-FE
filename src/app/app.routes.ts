import { DeveloperProfileComponent } from './developer-profile/developer-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { Routes } from '@angular/router';
import { MailComponent } from './mail/mail.component';
import { TeamComponent } from "./team/team.component";
import { TeamInfoComponent } from "./team-info/team-info.component";
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SplashComponent } from './splash/splash.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerInfoComponent } from './player-info/player-info.component';
import { MatchComponent } from './match/match.component';

export const routes: Routes = [
    { path: '', component: SplashComponent},
    { path: 'home', component: DashboardComponent},
    { path: 'dev-profile', component: DeveloperProfileComponent },
    { path: 'dev-contact', component: MailComponent },
    { path: 'team-list', component: TeamComponent },
    { path: 'team-info', component: TeamInfoComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: 'user', component: AuthenticationComponent},
    { path: 'players', component: PlayerListComponent},
    { path: 'player', component: PlayerInfoComponent},
    { path: 'match', component: MatchComponent},
    { path: '**', component: PageNotFoundComponent },
];
