
(function(){
'use strict';
describe('Login Controller Tests', function(){

    var module, loginController;

    beforeEach(function() {
        module = angular.module('crewMeanApp');
    });

    beforeEach(inject(function ($controller) {

        loginController = $controller('LoginCtrl', {});
    }));

    describe("Match controller to be defined", function() {

        it("should be created successfully", function () {
            expect(loginController).toBeDefined();
        });
    });

});

})();