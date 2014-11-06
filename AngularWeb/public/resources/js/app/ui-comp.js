var uiComp = angular.module('uiComp', []);

uiComp.controller('myController',function($scope,$rootScope){
	$scope.listItems = ['a','b','c','d'];
});

uiComp
		.directive(
				'panel',
				function() {
					return {
						restrict : 'AE',
						replace : true,
						scope : {},
						require : '?ngModel',
						template : '<div class="container">'
								+ '<div class="panelHeader"><label class="headerText">{{panel.title}}</lable>'
								+ '</div>' + '<div class="panelBody">'
								+ '</div>' + '</div>',
						link : function($scope, $element, $attr, ngModel) {
							$scope.panel = {};
							var values = $attr.panel.split(",");
							angular.forEach(values, function(value, index) {
								var temp = value.split(":");
								$scope.panel[temp[0].trim()] = temp[1].trim();
							});
						}
					}
				});

uiComp.directive('multiSelect', function() {
	return {
		restrict : 'AE',
		replace : true,
		scope : {
			list : "=dplist"
		},
		require : '?ngModel',
		template : '<div class="wrapper"><span class="itemBorder"><input class="inputAlign" ng-model="selectedItems"/><img class="inputAlign" src="resources/images/arrow-down.png" ng-click="toggleShow($event)"></span>'+
		'<div class="itemBorder hide dropdown"><li class="list" ng-click="toggleSelect($event)" ng-repeat="item in list">{{item}}</li></div></div>',
		link : function($scope, $element, $attrs) {
			
		},
		controller : function($scope){
			$scope.selected = [];
			$scope.toggleSelect = function($event){
				var item = angular.element($event.target);
				if(item.attr('class').indexOf('selected') > -1){
					item.removeClass('selected');
					var index = $scope.selected.indexOf(item[0].innerHTML);
					$scope.selected.splice(index,1);
				}else{
					item.addClass('selected');
					$scope.selected.push(item[0].innerHTML);
				}
				if($scope.selected){
					$scope.selectedItems = "";
				}
				angular.forEach($scope.selected,function(value,index){
					if(index === 0){
						$scope.selectedItems = value;
					}else{
						$scope.selectedItems += ","+value;
					}
				});
			}
			
			$scope.toggleShow = function($event){
				var dp = angular.element($event.target).parent().next();
				if(dp.attr('class').indexOf('hide') > -1){
					dp.removeClass('hide').addClass('show');
				}else{
					dp.removeClass('show').addClass('hide');
				}
			}
		}
	}
});