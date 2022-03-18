import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';
import { FeedEditorComponent } from './pages/feed-editor/feed-editor.component';
import { FeedComponent } from './pages/feed/feed.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: `feed`,
    pathMatch: 'full',
  },
  { path: 'feed', component: FeedComponent },
  { path: 'feed-editor/:id', component: FeedEditorComponent },
  {
    path: '**',
    // redirectTo: `pages/error`
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
