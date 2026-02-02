/**
 * Angular 15 still needs Zone.js patch to enable change detection for default
 * change detection strategy. We only need the global bundle used by the CLI.
 */
import 'zone.js'; // Included with Angular CLI.
