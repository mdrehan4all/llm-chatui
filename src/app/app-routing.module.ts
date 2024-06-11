import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChatuiComponent } from './chatui/chatui.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'chat', component: ChatuiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
