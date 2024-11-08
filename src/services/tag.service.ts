import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tag } from '../types/tag';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  tags$ = new BehaviorSubject([
    {
      id: 1,
      label: 'Продуктивность',
      className: 'circle__violet',
    },
    {
      id: 2,
      label: 'Образование',
      className: 'circle__green',
    },
    { id: 3, label: 'Здоровье', className: 'circle__orange', isActive: false },
    {
      id: 4,
      label: 'Срочно',
      className: 'circle__red',
    },
  ]);
  activeTagsSubject = new BehaviorSubject<string[]>([]);

  constructor() {}
  get tags(): Observable<Tag[]> {
    return this.tags$.asObservable();
  }
  get activeTags$() {
    return this.activeTagsSubject.asObservable();
  }
  setActiveTag(newTag: string) {
    const currentTags = this.activeTagsSubject.getValue();
    let updatedTags: string[] = [];
    if (currentTags.includes(newTag)) {
      updatedTags = currentTags.filter((id) => id !== newTag);
    } else {
      updatedTags = [...currentTags, newTag];
    }
    this.activeTagsSubject.next(updatedTags);
  }
}
