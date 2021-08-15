import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { VideoEditComponent } from './features/video-edit/video-edit.component';
import { VideoUploadComponent } from './features/video-upload/video-upload.component';
import { TagModule } from './shared/components/tag/tag.module';
import { TagEditorModule } from './shared/components/tag-editor/tag-editor.module';
import { LoginComponent } from './features/login/login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    VideoEditComponent,
    VideoUploadComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TagModule,
    TagEditorModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
