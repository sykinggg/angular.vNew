import { KPIWidget } from './kpiWidget';
import * as kpiTemp from '../kpiTemps';

export class KPIShowWidget extends KPIWidget {
    constructor(
        public treeService: kpiTemp.TreeConfigService,
        public apiServer: kpiTemp.ApiServer,
        public translate: kpiTemp.TranslateService,
        public dialogService: kpiTemp.DialogService,
    ) {
        super(treeService, apiServer, translate, dialogService);
    }
}