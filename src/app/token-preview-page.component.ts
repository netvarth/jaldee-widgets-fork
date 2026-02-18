import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TokenCardComponent } from 'jaldee-widgets';
import { tokenTemplate } from './preview-template.config';

@Component({
  selector: 'app-token-preview-page',
  standalone: true,
  imports: [CommonModule, RouterModule, TokenCardComponent],
  templateUrl: './token-preview-page.component.html',
  styleUrls: ['./token-preview-page.component.scss']
})
export class TokenPreviewPageComponent {
  tokenData = tokenTemplate as Record<string, any>;
  downloadMode = false;

  constructor(private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe((params) => {
      this.downloadMode = params.get('mode') === 'download';
    });
  }
}
