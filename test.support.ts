interface ITestSupport {
    enableQ(): void;
}

export const TestSupport = {
    enableQ() {
        let $rootScope;
        beforeEach(inject((_$rootScope_) => {
            $rootScope = _$rootScope_;
            setTimeout(() => {
                $rootScope.$digest();
            });
        }));
    }
};