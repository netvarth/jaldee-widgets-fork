import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LazyImageDirective } from '../../utils/lazy-image.directive';

@Component({
  selector: 'app-about-card2',
  standalone: true,
  imports: [CommonModule, LazyImageDirective],
  templateUrl: './about-card2.component.html',
  styleUrls: ['./about-card2.component.scss']
})
export class AboutCard2Component {

  @Input() content: any;
  @Input() smallDevice: boolean | undefined;
  @Output() actionClicked = new EventEmitter<any>();

  get paragraphs(): string[] {
    const description = this.primaryEntry?.description;
    if (Array.isArray(description)) {
      return description.map((paragraph: string) => paragraph.trim()).filter(Boolean);
    }
    const text = description || this.primaryEntry?.content || '';
    const splits = text.split(/\n\s*\n/).map((value: string) => value.trim()).filter(Boolean);
    return splits.length ? splits : (text ? [text] : []);
  }

  get leftImage(): string | null {
    const entries = this.sectionEntries;
    if (entries.length) {
      return this.resolveImage(entries[0], ['image', 'leftImage', 'heroImage']);
    }
    return this.resolveImage(this.content, ['leftImage', 'heroImage', 'image']);
  }

  get leftVideo(): string | null {
    const entries = this.sectionEntries;
    if (entries.length) {
      return this.resolveVideo(entries[0], ['video', 'leftVideo', 'heroVideo']);
    }
    return this.resolveVideo(this.content, ['leftVideo', 'heroVideo', 'video']);
  }

  get leftImageAspectRatio(): string | null {
    const entries = this.sectionEntries;
    if (entries.length) {
      return this.resolveAspectRatio(entries[0], ['image_aspectRatio', 'leftImage_aspectRatio', 'heroImage_aspectRatio']);
    }
    return this.resolveAspectRatio(this.content, ['leftImage_aspectRatio', 'heroImage_aspectRatio', 'image_aspectRatio']);
  }

  get topRightImage(): string | null {
    const entries = this.sectionEntries;
    if (entries.length > 1) {
      return this.resolveImage(entries[1], ['image', 'topRightImage', 'image1']);
    }
    return this.resolveImage(this.content, ['topRightImage', 'image1']);
  }

  get topRightVideo(): string | null {
    const entries = this.sectionEntries;
    if (entries.length > 1) {
      return this.resolveVideo(entries[1], ['video', 'topRightVideo', 'video1']);
    }
    return this.resolveVideo(this.content, ['topRightVideo', 'video1']);
  }

  get topRightImageAspectRatio(): string | null {
    const entries = this.sectionEntries;
    if (entries.length > 1) {
      return this.resolveAspectRatio(entries[1], ['image_aspectRatio', 'topRightImage_aspectRatio', 'image1_aspectRatio']);
    }
    return this.resolveAspectRatio(this.content, ['topRightImage_aspectRatio', 'image1_aspectRatio']);
  }

  get bottomRightImage(): string | null {
    const entries = this.sectionEntries;
    if (entries.length > 2) {
      return this.resolveImage(entries[2], ['image', 'bottomRightImage', 'image2']);
    }
    return this.resolveImage(this.content, ['bottomRightImage', 'image2']);
  }

  get bottomRightVideo(): string | null {
    const entries = this.sectionEntries;
    if (entries.length > 2) {
      return this.resolveVideo(entries[2], ['video', 'bottomRightVideo', 'video2']);
    }
    return this.resolveVideo(this.content, ['bottomRightVideo', 'video2']);
  }

  get bottomRightImageAspectRatio(): string | null {
    const entries = this.sectionEntries;
    if (entries.length > 2) {
      return this.resolveAspectRatio(entries[2], ['image_aspectRatio', 'bottomRightImage_aspectRatio', 'image2_aspectRatio']);
    }
    return this.resolveAspectRatio(this.content, ['bottomRightImage_aspectRatio', 'image2_aspectRatio']);
  }

  _contentClicked(action: { link: string }) {
    this.actionClicked.emit({ action: action ?? this.primaryEntry });
  }

  private get primaryEntry(): any {
    const entries = this.sectionEntries;
    if (entries.length) {
      return entries[0];
    }
    return this.content;
  }

  get backgroundColor(): string | undefined {
    return this.primaryEntry?.backgroundColor ?? this.content?.backgroundColor;
  }

  get sectionStyles(): Record<string, string> {
    const styles: Record<string, string> = {};
    if (this.backgroundColor) {
      styles['background-color'] = this.backgroundColor;
    }
    return styles;
  }

  get titleText(): string {
    return this.primaryEntry?.title ?? this.content?.title ?? '';
  }

  private resolveImage(entry: any, keys: string[]): string | null {
    if (!entry) {
      return null;
    }
    if (typeof entry === 'string') {
      return entry;
    }
    for (const key of keys) {
      if (entry?.[key]) {
        return entry[key];
      }
    }
    return null;
  }

  private resolveVideo(entry: any, keys: string[]): string | null {
    if (!entry || typeof entry === 'string') {
      return null;
    }
    for (const key of keys) {
      if (entry?.[key]) {
        return entry[key];
      }
    }
    return null;
  }

  private resolveAspectRatio(entry: any, keys: string[]): string | null {
    if (!entry || typeof entry === 'string') {
      return null;
    }
    for (const key of keys) {
      if (entry?.[key]) {
        return entry[key].toString();
      }
    }
    return null;
  }

  private get sectionEntries(): any[] {
    if (Array.isArray(this.content)) {
      return this.content;
    }
    if (this.content && Array.isArray(this.content.content)) {
      return this.content.content;
    }
    return [];
  }
}
