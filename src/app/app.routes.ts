import { Routes } from '@angular/router';
import { FuzzifierComponent } from './pages/fuzzifier/fuzzifier.component';
import { ForecastTableComponent } from './components/forecast-table/forecast-table.component';

export const routes: Routes = [
    {path:"home",component:FuzzifierComponent},
    {path:"forecast",component:ForecastTableComponent},
    {path:"",redirectTo:"home",pathMatch:"full"}
];
