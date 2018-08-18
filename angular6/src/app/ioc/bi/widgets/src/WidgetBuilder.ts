import { Widget } from './Widget';
import { InjectAnnotationBuilder } from '@ts-ioc/bootstrap';
import { Injectable } from '@ts-ioc/core';

export const WidgetBuilderToken = new InjectAnnotationBuilder<IWidgetBuilder>(Widget);

export interface IWidgetBuilder {

}

@Injectable(WidgetBuilderToken)
export class WidgetBuilder {

}