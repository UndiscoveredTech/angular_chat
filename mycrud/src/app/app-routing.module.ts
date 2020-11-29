import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainindexComponent } from './components/mainindex/mainindex.component';
// import { AllcameraComponent } from './components/allcamera/allcamera.component';
// import { AddcameraComponent } from './components/addcamera/addcamera.component';
// import { EditcameraComponent } from './components/editcamera/editcamera.component';
// import { DeletecameraComponent } from './components/deletecamera/deletecamera.component';
import { EditorComponent } from './components/editor/editor.component';
import { ProfileComponent } from './components/profile-component/profile-component.component';
import { MessageComponent } from './components/message/message.component';
// import { ChartComponent } from './components/chart/chart.component';



const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch:"full"
  },
  {
    path: 'home', component: MainindexComponent
  },
   
    // {
    //   path: 'getmessage', component: EditorComponent
    // },

    {

      path: 'profile', component: ProfileComponent
    },

    {

      path: 'chatroom_index', component: MessageComponent
    },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const  routingComponents = [MainindexComponent]
