import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  { path: 'kine', loadChildren: './pages/kine/kine.module#KinePageModule' },
  { path: 'kine/:id', loadChildren: './pages/kine/kine.module#KinePageModule' },
  { path: 'kine-list', loadChildren: './pages/kine-list/kine-list.module#KineListPageModule' },
  { path: 'location', loadChildren: './pages/location/location.module#LocationPageModule' },
  { path: 'comment', loadChildren: './pages/comment/comment.module#CommentPageModule' },
  { path: 'modal-line', loadChildren: './pages/modal-line/modal-line.module#ModalLinePageModule' },
  { path: 'image-gallery', loadChildren: './pages/image-gallery/image-gallery.module#ImageGalleryPageModule' },
  { path: 'modal-search', loadChildren: './pages/modal-search/modal-search.module#ModalSearchPageModule' },  { path: 'map', loadChildren: './pages/map/map.module#MapPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
