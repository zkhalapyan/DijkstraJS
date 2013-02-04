exports.group = {
    test2: function (test) {
        "use strict";
        test.expect(1);
        test.ok(true, "this assertion should pass");
        test.done();
    },
    test3: function (test) {
        "use strict";
        test.ok(false, "this assertion should fail");
        test.done();
    }
};
