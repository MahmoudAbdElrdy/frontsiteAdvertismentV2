import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { AppConfigService } from './app/shared/AppConfigService';
import { AppInjector } from './app/@core/Injector/app-injectore';

if (environment.production) {
  enableProdMode();
}

AppConfigService.loadConfig().then(() => {
  return platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(moduleRef => {
    AppInjector.setInjector(moduleRef.injector);
  })
});
