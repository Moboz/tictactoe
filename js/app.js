'use strict';

var glb = glb || {};


var app = angular.module('myApp', []);


glb.App = function($scope, $location){
	
	$scope.ticTacToe = [{text: '', type:"corner"},
					 {text: '', type:"side"},
					 {text: '', type:"corner"},
					 {text: '', type:"side"},
					 {text: '', type:"center"},
					 {text: '', type:"side"},
					 {text: '', type:"corner"},
					 {text: '', type:"side"},
					 {text: '', type:"corner"}];
					 
	$scope.grid = function(item){
		if (item.text == '') {
			item.text = 'X';
			compPlay();
		}
	}

	function compPlay(){
		//Take the center block if available
		var center = _.where($scope.ticTacToe, {type: "center"})[0];
		if (center.text == '') {
			center.text = 'O';
		}
		else {
			//Take a corner spot if available
			if (pickCorner()) {
			}
		}
	}
	
	function pickCorner(){
		var corners = _.where($scope.ticTacToe, {text: '', type: "corner"});
		if (corners.length > 0) {
			corners[_.random(corners.length-1)].text = 'O';
			console.log('picked corner');
			return false;
		}
		else
			return true;
	}
		

}