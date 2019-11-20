import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ElementsComponent }      from './elements/elements.component';
import { DetailComponent }  from './detail/detail.component';

const routes: Routes = [
    { path: '', redirectTo: '/heroes', pathMatch: 'full' },

    { path: 'detail/:id', component: DetailComponent },
    { path: 'heroes', component: ElementsComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
