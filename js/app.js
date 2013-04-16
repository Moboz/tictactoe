'use strict';

var glb = glb || {};


var app = angular.module('myApp', []);


glb.App = function($scope, $location){
	
	$scope.box = [{text: "X", },
					 {text: "O",},
					 {text: "",},
					 {text: "",},
					 {text: "",},
					 {text: "",},
					 {text: "",},
					 {text: "",},
					 {text: "",}];

	}