// Created by trevor on 7/29/2016.
import {BasicListFactory} from './factory';

export var ListModule = angular.module('baseItemListModule', []);

ListModule.factory(BasicListFactory.factoryName, BasicListFactory.Factory());