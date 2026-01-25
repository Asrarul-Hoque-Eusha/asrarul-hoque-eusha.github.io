import { Component } from '@angular/core';
import { NavbarComponent } from '../../features/navbar/navbar.component';
import { HeroComponent } from '../../features/hero/hero.component';
import { SkillsComponent } from '../../features/skills/skills.component';
import { ProjectsComponent } from '../../features/projects/projects.component';
import { ExperienceComponent } from '../../features/experience/experience.component';
import { AchievementsComponent } from '../../features/achievements/achievements.component';
import { CertificationsComponent } from '../../features/certifications/certifications.component';
import { EducationComponent } from '../../features/education/education.component';
import { ResearchComponent } from '../../features/research/research.component';
import { AboutComponent } from '../../features/about/about.component';
import { ContactComponent } from '../../features/contact/contact.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
    AchievementsComponent,
    CertificationsComponent,
    EducationComponent,
    ResearchComponent,
    AboutComponent,
    ContactComponent
  ],
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent {}
