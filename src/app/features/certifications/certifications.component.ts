import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { ContentService } from '../../core/services/content.service';
import { Certification } from '../../core/models';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { FadeInDirective } from '../../shared/directives/fade-in.directive';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule, SectionHeaderComponent, FadeInDirective],
  templateUrl: './certifications.component.html'
})
export class CertificationsComponent implements OnInit {
  private contentService = inject(ContentService);
  certifications = signal<Certification[]>([]);

  ngOnInit() {
    this.contentService.getCertifications().subscribe(data => {
      this.certifications.set(data);
    });
  }
}
