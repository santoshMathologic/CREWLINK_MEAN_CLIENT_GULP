(function () {
	' use strict';
	var app = angular.module('crewMeanApp');
	app.directive('stRatio', function () {
		return {
			link: function (scope, element, attr) {
				var ratio = +(attr.stRatio);

				element.css('width', ratio + '%');

			}
		};
	});

	app.directive('textRatio', function () {
		return {
			restrict: 'AE',
			scope: {
				val: '='
			},
			link: function (scope, elem, attrs) {
				scope.$watch('val', function (newValue, oldValue) {
					if (newValue) {
						elem.css('width', (newValue) + 'px');
						elem.css('height', 25 + 'px');
						elem.css('border-radius', 0 + 'px');
					}

				}, true);

			},
			controller: function ($scope) {
				console.log("at controller");
			}
		};
	});


	app.directive("decoration", function () {
		return {
			restrict: "AE",
			scope: {
				val: '='
			},
			link: function (scope, elem, attrs) {
				scope.$watch('val', function (newValue, oldValue) {
					if (newValue) {
						elem.css('background-color',newValue);

					}

				}, true);


			}


		};


	});

})();
