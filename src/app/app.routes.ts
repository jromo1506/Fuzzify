import { Routes } from '@angular/router';
import { FuzzifierComponent } from './pages/fuzzifier/fuzzifier.component';

export const routes: Routes = [
    {path:"home",component:FuzzifierComponent},
    {path:"",redirectTo:"home",pathMatch:"full"}
];
