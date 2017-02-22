angular.module('crewMeanApp').directive('stSearch', ['$timeout', function ($timeout) {
    return {
        require: '^stTable',
        scope: {
            predicate: '=?stSearch'
        },
        link: function (scope, element, attr, ctrl) {
            var tableCtrl = ctrl;

            // view -> table state
            element.bind('input', function (evt) {
                evt = evt.originalEvent || evt;
                tableCtrl.search(evt.target.value, 'column1');
                tableCtrl.search(evt.target.value, 'column2');
            });
        }
    };
}]);