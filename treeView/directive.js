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

.directive('butPos', [function() {
	
	return {
		restrict: 'A',
		link: function($element) {
			var eleWidth = $element.width();
			var eleHeight = $element.height();
			
			var childDom = $element.children('div');
			var childWidth = childDom.width();
			var childHeight = childDom.height();
			
			$element.CSS({
				'position': 'absolute',
				'bottom': -$element.height(),
				'left': -childDom.width()
			})
		}
	}
}])