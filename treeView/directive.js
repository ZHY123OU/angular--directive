app.directive('treeView', [function() {
        
    return {
        restrict: 'E',
        templateUrl: './views/treeView.html',
		scope: {
			treeData: '=',
			dataName: '@',
			itemClick: '&'
        },
        controller: ['$scope', function($scope) {
        	$scope.hasChild = function(item) {
        		return !item.dataList 
        	}
        }]
    }
}])
