import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'pipeFirst'
})
export class PipeFirstPipe implements PipeTransform {

    transform(allHeroes: Array<any>): any {
        return allHeroes.filter(hero => hero.canFly);
    }

}
