describe("Filters", function () {

    beforeEach(module("crewMeanApp"));

    describe("reverse", function () {

        var reverse;
        beforeEach(inject(function ($filter) {
            reverse = $filter("reverse", {});
        }));


        it("it should reverse a string", function () {
            expect(reverse("santosh")).toBe("dasdsa");

        });


    });




});