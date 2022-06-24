import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgmDirectionModule } from 'agm-direction';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({ 
      apiKey: 'AIzaSyAiOuKxmO0fR-azjwFPGiff04CtB15WIWQ', }),
    AgmDirectionModule,
    FormsModule,
    NgSelectModule,
    
  ],
  providers: [GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
})
export class AppModule { }
