define(['app'], function(app) {
	app.directive('paging', function() {
		return {
	        restrict: 'E',
	        templateUrl: 'scripts/directive/paging.html',
			scope: {
				//分页总个数
				total: '=',
				//当前分页值
				pageNo: '=',
				//点击分页按钮，返回到页面所需要执行的函数
				getPage: '=',
				//用来区分多组分页用的
				echIndex: '=',
	        },
	        controller: ['$scope', '$location', function($scope, $location) {
	        	
	        	var pageNo = $scope.pageNo = 0
	        	
    			$scope.butStyle = {
					normBut: null,
					butOne: null,
					butTwo: null,
					
				}
    			
				var pageMsg = {
					pageNo : 0,
					pageSize : 0,
					totalCount : 0,
					totalPage : 0
				}
				
				pageBut($scope.total, pageNo)
				
				$scope.$watch($scope.total, function() {
					pageBut($scope.total, 0)
				})
							
				//分页按钮的样式
				function pageBut(total, nowPage) {
					for (var k in $scope.butStyle) {
						$scope.butStyle[k] = false;
					}

					if (total > 8) {

						if (nowPage <= 2) {
							$scope.butStyle.butOne = true;
							$scope.butLeft = new Array()
							for( var i = 1; i <= 4; i++) {
								$scope.butLeft.push(i)
							}
							$scope.butRight = [total]
							
						}else if (nowPage >= total - 2) {
							$scope.butStyle.butOne = true;
							$scope.butRight = new Array()
							for( var i = total; i > total - 4; i--) {
								$scope.butRight.push(i)
							}
							$scope.butRight.reverse()
							$scope.butLeft = [1]
						}else if (nowPage > 2 || nowPage < total - 2) {
							$scope.butStyle.butTwo = true;
							$scope.nowPage = nowPage + 1
							$scope.butLeft = [1]
							$scope.butRight = [total]
						}
						return
					}										
					$scope.butStyle.normBut = true
					$scope.butNums = new Array()
					for( var i = 1; i <= total; i++) {
						$scope.butNums.push(i)
					}
				}
				
				$scope.clickButStyle = {
					isButClick : 1,
					isFirstBut : 0,
				}
				
				//跳转页面
				$scope.selBut = function(id) {
					
					if (id === '-1') {
						if (pageMsg.pageNo == 0) {
							alert('已经是第一页了！！！');							
							return;
						}else {
							$scope.pageNo--
							$scope.clickButStyle.isButClick--
						}
					}else if (id === '+1') {
						if (pageMsg.pageNo == pageMsg.totalPage - 1) {
							alert('已经是最后一页了！！！！');
							return;
						}else {
							$scope.pageNo++	
							$scope.clickButStyle.isButClick++
						}				
					}else {	
						id--
						if ($scope.pageNo == id) {
							if ($scope.pageNo == 0) {
								alert('已经是第一页了！！！');
								return;
							}else if(pageMsg.pageNo == pageMsg.totalPage - 1) {
								alert('已经是最后一页了！！！！');
								return;
							}else {
								alert('您当前就在第 '+ ( id + 1 )+' 页！！！！')
								return;
							}
							
						}
						$scope.clickButStyle.isButClick = id + 1
						$scope.pageNo = id;
					}
					
					$scope.clickButStyle.isFirstBut = $scope.pageNo
		
					pageBut($scope.total, $scope.pageNo)

					$scope.getPage($scope.pageNo, $scope.echIndex);
				}

	        }]
	    }
	})
})
						