// Created by trevor on 7/29/2016.

var objectName:string = 'detail';

var module = angular.module('baseItem' + objectName + 'Module', []);

module.controller('basicItem' + objectName);

export var DetailModule = module;
