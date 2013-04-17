'use strict';

// root namespace for global scoped variables
var glb = glb || {};

// Declare app level module which depends on filters, and services

var app = angular.module('myApp', []);

glb.App = function($scope, $location){
	
	$scope.ticTacToe = [{magic:8, text: '', type:"corner", xpos: 1, ypos: 1},
					 {magic:1, text: '', type:"side", xpos: 2, ypos: 1},
					 {magic:6, text: '', type:"corner", xpos: 3, ypos: 1},
					 {magic:3, text: '', type:"side", xpos: 1, ypos: 2},
					 {magic:5, text: '', type:"center", xpos: 2, ypos: 2},
					 {magic:7, text: '', type:"side", xpos: 3, ypos: 2},
					 {magic:4, text: '', type:"corner", xpos: 1, ypos: 3},
					 {magic:9, text: '', type:"side", xpos: 2, ypos: 3},
					 {magic:2, text: '', type:"corner", xpos: 3, ypos: 3}];
	
	$scope.blocked = false;
					 
	$scope.grid = function(item){
		if (item.text == '') {
			item.text = 'X';
			compPlay();
		}
	}

	function compPlay(){
		$scope.allX = _.where($scope.ticTacToe, {text: 'X'});
	
		//First check to see if can Win, then check to see if needs to block to prevent Loss 
		if (blockOrWin() && blockOrWin($scope.allX)) {
			//Third check if needs to block a Fork
			if (blockFork()) {
				//Take the center block if available
				var center = _.where($scope.ticTacToe, {type: "center"})[0];
				if (center.text == '') {
					center.text = 'O';
				}
				else {
					//Take a corner spot if available
					if (pickCorner()) {
						pickSide();
					}
				}
			}
		}
	}

	function blockOrWin(allXO){
		var available = _.where($scope.ticTacToe, {text: ''});
		//if allXO is undefined = need to use O dataset, not X
		if (!allXO) allXO = _.where($scope.ticTacToe, {text: 'O'});
		
		for (var i=0; i < allXO.length; i++) {
			for (var j=i+1; j < allXO.length; j++) {
				for (var k=0; k < available.length; k++) {
					if (allXO[i].magic + allXO[j].magic + available[k].magic == 15) {
						available[k].text = 'O';
						console.log((allXO[0].text == 'O') ? 'won' : 'blocked');
						$scope.blocked = true;
						return false;
					}
				}
			}
		}	
		return true;
	}
	
	function blockFork(){
		//only need to block a fork if no other block has occurred yet
		if (!$scope.blocked) {
			//block Fork case 1 - X has two opposite corners
			if (_.where($scope.allX, {type: 'corner'}).length == 2) {
				pickSide();
				console.log('blocked Fork type 1');
				$scope.blocked = true;
				return false;
			}
			
			//block Fork case 2 - X has two sides, not opposite of each other
			if ((_.where($scope.allX, {type: 'side'}).length == 2) && ($scope.allX[0].xpos != $scope.allX[1].xpos) && ($scope.allX[0].ypos != $scope.allX[1].ypos)) {
				var cornerpos = ($scope.allX[0].xpos == 2) ? $scope.allX[0].ypos : $scope.allX[0].xpos;
				(_.where($scope.ticTacToe, {xpos: cornerpos, ypos: cornerpos}))[0].text = 'O';
				console.log('blocked Fork type 2');
				$scope.blocked = true;
				return false;
			}
			
			//block Fork case 3 - X has one side and one corner
			if ((_.where($scope.allX, {type: 'side'}).length > 0) && (_.where($scope.allX, {type: 'corner'}).length > 0)) {
				var cornerXpos = 0,
					cornerYpos = 0,
					xSide = _.where($scope.allX, {type: 'side'})[0],
					xCorner = _.where($scope.allX, {type: 'corner'})[0];
				
				if (xSide.xpos == 2) {
					cornerXpos = xCorner.xpos
					cornerYpos = xSide.ypos;
				}
				else {
					cornerXpos = xSide.xpos
					cornerYpos = xCorner.ypos;				
				}
				
				(_.where($scope.ticTacToe, {xpos: cornerXpos, ypos: cornerYpos}))[0].text = 'O';
				console.log('blocked Fork type 3');
				$scope.blocked = true;
				return false;
			}			
		}
		return true;
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
	
	function pickSide(){
		var sides = _.where($scope.ticTacToe, {text: '', type: "side"});
		if (sides.length > 0) {
			sides[_.random(sides.length-1)].text = 'O';
			console.log('picked side');
			return false;
		}
		else
			return true;
	}	
}