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
  themeCombos = [
    {
      name: 'Classic Maroon',
      primaryColor: '#6b373b',
      accentColor: '#b78f51',
      backgroundColor: '#f8f5ef',
      surfaceColor: '#fbfaf8'
    },
    {
      name: 'Royal Blue Gold',
      primaryColor: '#243b63',
      accentColor: '#c8a24b',
      backgroundColor: '#f5f7fb',
      surfaceColor: '#ffffff'
    },
    {
      name: 'Forest Green',
      primaryColor: '#2f5d50',
      accentColor: '#b88c4a',
      backgroundColor: '#f5f7f2',
      surfaceColor: '#ffffff'
    }
  ];

  constructor(private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe((params) => {
      this.downloadMode = params.get('mode') === 'download';
    });
  }
}
