import { HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { SharedRecordsModule } from '@capital/shared/records';
import { RecordsService } from '@capital/services/records-service';
import { InMemoryDataService } from '@capital/services/in-memory-data-service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
            apiBase: 'api-records',
            passThruUnknownUrl: true,
            dataEncapsulation: false,
        }),
        RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
        BrowserAnimationsModule,
        StoreModule.forRoot(
            {},
            {
                metaReducers: [],
                runtimeChecks: {
                    strictActionImmutability: true,
                    strictStateImmutability: true,
                },
            }
        ),
        EffectsModule.forRoot([]),
        StoreRouterConnectingModule.forRoot(),
        StoreDevtoolsModule.instrument({ logOnly: !isDevMode() }),
        SharedRecordsModule,
    ],
    providers: [RecordsService],
    bootstrap: [AppComponent],
})
export class AppModule {}
