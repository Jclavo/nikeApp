import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule} from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { HttpClientModule} from '@angular/common/http';
import { ModalLinePage  } from './pages/modal-line/modal-line.page';
import { ImageGalleryPage } from './pages/image-gallery/image-gallery.page';
import { ModalSearchPage } from './pages/modal-search/modal-search.page';

//Helpers
import { Validation } from './helpers/validations';

@NgModule({
  declarations: [AppComponent,ModalLinePage, ImageGalleryPage, ModalSearchPage],

  entryComponents: [ModalLinePage, ImageGalleryPage, ModalSearchPage],

  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
            AngularFireModule.initializeApp(environment.firebaseConfig),
            AngularFirestoreModule,FormsModule,HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Validation
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
