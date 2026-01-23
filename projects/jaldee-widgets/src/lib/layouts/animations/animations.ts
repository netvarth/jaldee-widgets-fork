// animations.ts
import { trigger, state, style, transition, animate } from '@angular/animations';

export const bounceAnimation = trigger('bounceAnimation', [
  state('start', style({ transform: 'translateY(0)' })),
  state('end', style({ transform: 'translateY(-20px)' })),
  transition('start <=> end', [
    animate('300ms ease-in-out')
  ])
]);


