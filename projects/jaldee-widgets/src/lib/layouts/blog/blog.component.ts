import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { applyContentFontDefaults } from '../../utils/font-utils';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnChanges {
  @Input() section: any;
  @Output() actionClicked = new EventEmitter<any>();
  blogs: any = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.blogs = this.section?.content ? [...this.section.content] : [];
    this.normalizeBlogs();
  }

  private normalizeBlogs(): void {
    if (!this.blogs?.length) {
      return;
    }
    this.blogs = this.blogs.map((item: any) => applyContentFontDefaults(this.section, item));
  }

  _actionClicked(action: any, target: string) {
    this.actionClicked.emit({ action, target });
  }
}




