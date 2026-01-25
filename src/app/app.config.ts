import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LucideAngularModule, Menu, X, Sun, Moon, Globe, Github, Linkedin, FileText, ExternalLink, Briefcase, GraduationCap, BookOpen, Trophy, Award, Medal, Star, Mail, ArrowLeft, Share2, Copy, Calendar, Clock } from 'lucide-angular';
import { provideMarkdown } from 'ngx-markdown';

import { routes } from './app.routes';

const icons = {
  Menu, X, Sun, Moon, Globe, Github, Linkedin, FileText, ExternalLink, Briefcase, GraduationCap, BookOpen, Trophy, Award, Medal, Star, Mail, ArrowLeft, Share2, Copy, Calendar, Clock
};

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideMarkdown({ loader: HttpClient }),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }),
      LucideAngularModule.pick(icons)
    )
  ]
};
