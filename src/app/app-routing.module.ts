import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {FilesComponent} from './files/files.component';
import {ResultComponent} from './result/result.component';

const routes: Routes = [
{path: '', component: HomeComponent},
{path: 'files', component: FilesComponent},
{path: 'result', component: ResultComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
