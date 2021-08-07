import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoEditComponent } from './features/video-edit/video-edit.component';
import { VideoUploadComponent } from './features/video-upload/video-upload.component';

const routes: Routes = [
  { path: "", component: VideoUploadComponent },
  { path: "edit", component: VideoEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
