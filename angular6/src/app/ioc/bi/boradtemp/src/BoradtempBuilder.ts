import { Boradtemp } from './Boradtemp';
import { InjectAnnotationBuilder } from '@ts-ioc/bootstrap';
import { Injectable } from '@ts-ioc/core';


export const BoradtempBuilderToken = new InjectAnnotationBuilder<IBoradtempBuilder>(Boradtemp);

export interface IBoradtempBuilder {

}

@Injectable(BoradtempBuilderToken)
export class BoradtempBuilder {

}


