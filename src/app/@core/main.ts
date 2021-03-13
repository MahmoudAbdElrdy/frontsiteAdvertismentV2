import { environment } from './../../environments/environment.prod';
import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppConfigService } from '../shared/AppConfigService';
import { AppModule } from '../app.module';
import { AppInjector } from './Injector/app-injectore';

if (environment.production) {
  enableProdMode();
}

AppConfigService.loadConfig().then(() => {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(moduleRef => {
      AppInjector.setInjector(moduleRef.injector);
    })
    .catch(err => console.error(err));
});
