import { trigger, state, style, animate, transition } from '@angular/animations';

export const stateStyle = trigger('stateStyle', [
    // transition("void => *", [
    //     style({ opacity: 0 }),
    //     animate(1600, style({ opacity: 1 }))
    // ]),
    // transition("* => void", [
    //     animate(1600, style({ opacity: 0 }))
    // ])
    state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
    })),
    state('active', style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.1)'
    })),
    // transition('inactive => active', animate('1000ms ease-in')),
    // transition('active => inactive', animate('1000ms ease-out'))
    transition('inactive <=> active', animate('100ms ease-out'))
]);