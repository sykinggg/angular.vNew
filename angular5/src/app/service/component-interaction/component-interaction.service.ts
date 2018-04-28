import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

// 提供服务的实例，并将其共享给它的子组件(通过providers元数据数组)，子组件可以通过构造函数将该实例注入到自身
@Injectable()
export class ComponentInteractionService {
    // Observable string sources
    private missionAnnouncedSource = new Subject<string>();
    private missionConfirmedSource = new Subject<string>();

    // Observable string streams
    missionAnnounced$ = this.missionAnnouncedSource.asObservable();
    missionConfirmed$ = this.missionConfirmedSource.asObservable();

    // Service message commands
    announceMission(mission: string) {
        this.missionAnnouncedSource.next(mission);
    }

    confirmMission(astronaut: string) {
        this.missionConfirmedSource.next(astronaut);
    }

    constructor() { }

}
