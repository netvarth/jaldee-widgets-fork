import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-token-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './token-card.component.html',
  styleUrls: ['./token-card.component.scss']
})
export class TokenCardComponent implements OnInit {
  @Input() token: Record<string, any> | null = null;
  @Input() pdf = false;
  @Input() png = false;
  @Input() fullScreen = false;
  @Input() primaryColor = '#6b373b';
  @Input() accentColor = '#b78f51';
  @Input() backgroundColor = '#f8f5ef';
  @Input() surfaceColor = '#fbfaf8';

  @ViewChild('tokenCard', { static: false }) tokenCardRef?: ElementRef<HTMLElement>;

  ngOnInit(): void {
    this.loadFontAwesome();
  }

  get isDownloadMode(): boolean {
    return this.pdf || this.png;
  }

  get themeVars(): Record<string, string> {
    return {
      '--token-primary': this.primaryColor,
      '--token-accent': this.accentColor,
      '--token-bg': this.backgroundColor,
      '--token-surface': this.surfaceColor
    };
  }

  async downloadEToken(): Promise<void> {
    if (this.pdf) {
      await this.downloadPdf();
      return;
    }
    if (this.png) {
      await this.downloadImage();
    }
  }

  async downloadImage(): Promise<void> {
    const canvas = await this.captureTokenCard();
    if (!canvas || typeof document === 'undefined') {
      return;
    }
    const url = canvas.toDataURL('image/png');
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'token-card.png';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  async downloadPdf(): Promise<void> {
    const canvas = await this.captureTokenCard();
    if (!canvas) {
      return;
    }
    await this.ensureJsPdf();
    const jsPdfCtor = (window as any)?.jspdf?.jsPDF;
    if (!jsPdfCtor) {
      return;
    }
    const imgData = canvas.toDataURL('image/png');
    const pdfDoc = new jsPdfCtor('p', 'mm', 'a4');
    const pageWidth = pdfDoc.internal.pageSize.getWidth();
    const pageHeight = pdfDoc.internal.pageSize.getHeight();
    const maxWidth = pageWidth - 20;
    const maxHeight = pageHeight - 20;
    const widthScale = maxWidth / canvas.width;
    const heightScale = maxHeight / canvas.height;
    const scale = Math.min(widthScale, heightScale);
    const imgWidth = canvas.width * scale;
    const imgHeight = canvas.height * scale;
    const x = (pageWidth - imgWidth) / 2;
    const y = (pageHeight - imgHeight) / 2;
    pdfDoc.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
    pdfDoc.save('token-card.pdf');
  }

  get tokenWatermark(): string {
    return this.stringValue(this.token?.['providerAccount']?.['businessLogo']?.[0]?.['s3path']);
  }

  get titleLineTwo(): string {
    return this.stringValue(this.token?.['serviceName']) || 'Token';
  }

  get dateLabel(): string {
    const localDate = this.stringValue(this.token?.['localdate']);
    if (localDate) {
      const parsedLocal = this.parseDate(localDate);
      if (parsedLocal) {
        return this.formatDisplayDate(parsedLocal);
      }
    }
    const date = this.stringValue(this.token?.['date']);
    const parsedDate = this.parseDate(date);
    return parsedDate ? this.formatDisplayDate(parsedDate) : date;
  }

  get timeLabel(): string {
    const startTime = this.stringValue(this.token?.['queue']?.['queueStartTime']);
    return startTime ? `${startTime} onwards` : '';
  }

  get locationLabel(): string {
    return (
      this.stringValue(this.token?.['queue']?.['location']?.['place']) ||
      this.stringValue(this.token?.['location']?.['place']) ||
      this.stringValue(this.token?.['queue']?.['location']?.['address'])
    );
  }

  get visitorName(): string {
    const person = this.primaryPerson;
    const title = this.stringValue(person?.['title']);
    const first = this.stringValue(person?.['firstName']);
    const last = this.stringValue(person?.['lastName']);
    return `${title} ${first} ${last}`.replace(/\s+/g, ' ').trim() || 'Visitor Name';
  }

  get visitorPhone(): string {
    const person = this.primaryPerson;
    const code =
      this.stringValue(person?.['countryCode']) ||
      this.stringValue(this.token?.['countryCode']) ||
      this.stringValue(this.token?.['consumer']?.['countryCode']);
    const phone = this.stringValue(person?.['phoneNo']) || this.stringValue(this.token?.['consumer']?.['phoneNo']);
    return `${code} ${phone}`.trim();
  }

  get tokenNumber(): string {
    const value = this.token?.['token'];
    if (value === null || value === undefined || value === '') {
      return '#000';
    }
    return `#${String(value).padStart(3, '0')}`;
  }

  private loadFontAwesome(): void {
    if (typeof document === 'undefined') {
      return;
    }
    const existing = document.querySelector('link[data-font-awesome="token-card"]');
    if (existing) {
      return;
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
    link.setAttribute('data-font-awesome', 'token-card');
    document.head.appendChild(link);
  }

  private async captureTokenCard(): Promise<HTMLCanvasElement | null> {
    const card = this.tokenCardRef?.nativeElement;
    if (!card) {
      return null;
    }
    await this.ensureHtml2Canvas();
    await this.waitForImages(card);
    const html2canvas = (window as any)?.html2canvas;
    if (!html2canvas) {
      return null;
    }
    return html2canvas(card, {
      scale: 2,
      useCORS: true,
      imageTimeout: 15000,
      backgroundColor: '#f8f5ef'
    });
  }

  private waitForImages(root: HTMLElement): Promise<void> {
    const images = Array.from(root.querySelectorAll('img'));
    if (images.length === 0) {
      return Promise.resolve();
    }

    return Promise.all(
      images.map((img) => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        return new Promise<void>((resolve) => {
          const done = () => resolve();
          img.addEventListener('load', done, { once: true });
          img.addEventListener('error', done, { once: true });
        });
      })
    ).then(() => undefined);
  }

  private async ensureHtml2Canvas(): Promise<void> {
    const html2canvas = (window as any)?.html2canvas;
    if (html2canvas || typeof document === 'undefined') {
      return;
    }
    await this.loadScript(
      'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
      'html2canvas-lib'
    );
  }

  private async ensureJsPdf(): Promise<void> {
    const jsPdf = (window as any)?.jspdf?.jsPDF;
    if (jsPdf || typeof document === 'undefined') {
      return;
    }
    await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js', 'jspdf-lib');
  }

  private loadScript(src: string, id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const existing = document.getElementById(id) as HTMLScriptElement | null;
      if (existing) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.id = id;
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(script);
    });
  }

  private stringValue(value: unknown): string {
    return typeof value === 'string' ? value : '';
  }

  private parseDate(value: string): Date | null {
    if (!value) {
      return null;
    }
    const ddmmyyyy = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value);
    if (ddmmyyyy) {
      const day = Number(ddmmyyyy[1]);
      const month = Number(ddmmyyyy[2]) - 1;
      const year = Number(ddmmyyyy[3]);
      return new Date(year, month, day);
    }
    const yyyymmdd = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (yyyymmdd) {
      const year = Number(yyyymmdd[1]);
      const month = Number(yyyymmdd[2]) - 1;
      const day = Number(yyyymmdd[3]);
      return new Date(year, month, day);
    }
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  private formatDisplayDate(date: Date): string {
    const weekday = date.toLocaleDateString('en-IN', { weekday: 'long' });
    const month = date.toLocaleDateString('en-IN', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${weekday}, ${day}${this.daySuffix(day)} ${month} ${year}`;
  }

  private daySuffix(day: number): string {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    const last = day % 10;
    if (last === 1) return 'st';
    if (last === 2) return 'nd';
    if (last === 3) return 'rd';
    return 'th';
  }

  private get primaryPerson(): Record<string, any> | null {
    const waitlisted = this.token?.['waitlistingFor'];
    if (Array.isArray(waitlisted) && waitlisted.length > 0 && waitlisted[0]) {
      return waitlisted[0] as Record<string, any>;
    }
    return (this.token?.['consumer'] as Record<string, any>) || null;
  }
}
