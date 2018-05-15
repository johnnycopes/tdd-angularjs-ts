import { TestSupport } from "../test.support";
TestSupport.enableQ();

describe("Promises", () => {

    let $q;
    beforeEach(inject((_$q_) => {
        $q = _$q_;
    }))

});