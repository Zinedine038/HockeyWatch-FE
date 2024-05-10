import { DeveloperProfileComponent } from './developer-profile/developer-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { Routes } from '@angular/router';
import { MailComponent } from './mail/mail.component';
import { TeamComponent } from "./team/team.component";
import { TeamInfoComponent } from "./team-info/team-info.component";
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationComponent } from './authentication/authentication.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dev-profile', pathMatch: 'full'},
    { path: 'dev-profile', component: DeveloperProfileComponent },
    { path: 'dev-contact', component: MailComponent },
    { path: 'team-list', component: TeamComponent },
    { path: 'team-info', component: TeamInfoComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: 'user', component: AuthenticationComponent},
    { path: '**', component: PageNotFoundComponent },
];
