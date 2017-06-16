import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { InfoComponent } from './../info/info.component';
import { GradesComponent } from './../grades.component';

const routes: Routes = [
  { path: '', redirectTo: '/gradeCalc', pathMatch: 'full' },
  { path: 'gradeCalc',  component: GradesComponent },
  { path: 'info', component: InfoComponent },
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

