import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile, SkillCategory, Project, Experience, Education, Research, Achievement, Certification } from '../models';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private http = inject(HttpClient);

  getProfile() {
    return this.http.get<Profile>('./assets/data/profile.json');
  }

  getSkills() {
    return this.http.get<SkillCategory[]>('./assets/data/skills.json');
  }

  getProjects() {
    return this.http.get<Project[]>('./assets/data/projects.json');
  }

  getExperience() {
    return this.http.get<Experience[]>('./assets/data/experience.json');
  }

  getEducation() {
    return this.http.get<Education[]>('./assets/data/education.json');
  }

  getResearch() {
    return this.http.get<Research[]>('./assets/data/research.json');
  }

  getAchievements() {
    return this.http.get<Achievement[]>('./assets/data/achievements.json');
  }

  getCertifications() {
    return this.http.get<Certification[]>('./assets/data/certifications.json');
  }
}
