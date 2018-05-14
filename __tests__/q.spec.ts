import "angular";
import "angular-mocks";
import { TestSupport } from "../test.support";

describe("$q", () => {
    TestSupport.enableQ();
    let $q, $rootScope;
    beforeEach(inject((_$q_) => {
        $q = _$q_;
    }));

    it("does stuff", () => {
        return $q.resolve(1)
            .then((value) => {
                expect(value).toEqual(1);
            });
    });
});