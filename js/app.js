'use strict';

var glb = glb || {};


var app = angular.module('myApp', []);


glb.App = function($scope, $location){
	
	$scope.ticTacToe = [{magic:8, text: '', type:"corner"},
					 {magic:1, text: '', type:"side"},
					 {magic:6, text: '', type:"corner"},
					 {magic:3, text: '', type:"side"},
					 {magic:5, text: '', type:"center"},
					 {magic:7, text: '', type:"side"},
					 {magic:4, text: '', type:"corner"},
					 {magic:9, text: '', type:"side"},
					 {magic:2, text: '', type:"corner"}];
					 
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