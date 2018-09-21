import { trigger, state, style, animate, transition } from '@angular/animations';

export const flyInOut = trigger('flyInOut', [
    // state('in', style({ transform: 'translateX(0)' })),
    transition("void => *", [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
    ]),
    transition("* => void", [
        animate(1000, style({ opacity: 0 }))
    ])
])