import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: HomePageComponent,
  // },
  {
    path: 'about',
    component: AboutPageComponent
  }, {
    path: 'contact',
    component: ContactPageComponent
  }, {
    //cargamos las rutas hijas de la aplicacion
    //mediante lazyload
    path: 'countries',
    loadChildren: () => import(/*la ruta del modulo donde se encuentra el router child*/'./countries/countries.module').then(module => module.CountriesModule)
  },
  {
    //Cualquier path que no este definido en mi router me redirige al home
    path: '**',
    redirectTo: 'countries'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
