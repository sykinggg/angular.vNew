import { Component, OnInit } from '@angular/core';

// 父组件调用@ViewChild()
import { AfterViewInit, ViewChild } from '@angular/core';
import { ComponentInteractionChildComponent } from './component-interaction-child/component-interaction-child.component';
// 父组件和子组件通过服务来通讯
import { ComponentInteractionService } from '../../service/component-interaction/component-interaction.service';

@Component({
    selector: 'app-component-interaction',
    templateUrl: './component-interaction.component.html',
    styleUrls: ['./component-interaction.component.scss'],
    providers: [ComponentInteractionService]
})
export class ComponentInteractionComponent implements OnInit {

    // 通过输入型绑定把数据从父组件传到子组件
    arrData1: Array<Object> = [
        {
            name: 'Illidan',
            content: 'Tydrande ？ It is your voice ，After all this ages spent in darkness , your voice is like the pure light of moon upon my mind . ”'
        },
        {
            name: '地精飞艇',
            content: '呱呱呱'
        },
        {
            name: 'Timmy',
            content: 'How about the people who were taken away？'
        }
    ]
    // 通过setter截听输入属性值的变化
    arrData2: Array<Object> = [
        {
            name: ' ',
            content: 'Tydrande ？ It is your voice ，After all this ages spent in darkness , your voice is like the pure light of moon upon my mind . ”'
        },
        {
            name: '地精飞艇',
            content: '呱呱呱'
        },
        {
            name: 'Timmy',
            content: 'How about the people who were taken away？'
        }
    ]

    alittleArr: any = {
        name: 'Alsace',
        content: 'Don’t worry son， I will bring them home.'
    }
    logShow: Boolean = true;
    logHide: Boolean = false;
    pushArr: Function = () => {
        if (this.alittleArr.name == 'Alsace') {
            this.alittleArr.name = 'Alsace1'
        } else {
            this.alittleArr.name = 'Alsace'
        }
    }
    delLastArr: Function = () => {
        if (this.alittleArr.content == 'Don’t worry son， I will bring them home.1') {
            this.alittleArr.content = 'Don’t worry son， I will bring them home.'
        } else {
            this.alittleArr.content = 'Don’t worry son， I will bring them home.1'
        }
    }
    agreed: number = 0;
    disagreed: number = 0;
    onVoted: Function = (agreed: Boolean) => {
        agreed ? this.agreed++ : this.disagreed++;
    }

    // 父组件调用@ViewChild()
    @ViewChild(ComponentInteractionChildComponent)
    private timerComponent: ComponentInteractionChildComponent;

    seconds() { return 0; }

    ngAfterViewInit() {
        setTimeout(() => this.seconds = () => this.timerComponent.seconds, 0);
    }

    start() { this.timerComponent.start(); }
    stop() { this.timerComponent.stop(); }

    // 父组件和子组件通过服务来通讯

    astronauts = ['Lovell', 'Swigert', 'Haise'];
    history: string[] = [];
    missions = ['Fly to the moon!',
        'Fly to mars!',
        'Fly to Vegas!'];
    nextMission = 0;

    announce() {
        let mission = this.missions[this.nextMission++];
        this.missionService.announceMission(mission);
        this.history.push(`Mission "${mission}" announced`);
        if (this.nextMission >= this.missions.length) { this.nextMission = 0; }
    }

    constructor(private missionService: ComponentInteractionService) {
        missionService.missionConfirmed$.subscribe(
            astronaut => {
                this.history.push(`${astronaut} confirmed the mission`);
            });
    }

    ngOnInit() {
    }
}
