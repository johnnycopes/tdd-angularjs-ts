import { TestSupport } from "../test.support";
import * as angular from "angular";

angular.module("shared-services", []);

class MyService {
    getItems() {
        return Promise.resolve([
            { ID: 1, Title: "Item One" },
            { ID: 2, Title: "Item Two" },
            { ID: 2, Title: "Item Three" }
        ]);
    }

    getDetail(id: number): Promise<{ ID: number, Details: string }> {
        return Promise.resolve({
            ID: id,
            Details: `Details for Item ${id}.`
        });
    }
}

angular.module("shared-services")
    .service("myService", MyService);

beforeEach(angular.mock.module("shared-services"));    
TestSupport.enableQ();

describe("Promises", () => {

    let $q, myService, $rootScope;
    beforeEach(inject((_$q_, _myService_, _$rootScope_) => {
        $q = _$q_;
        myService = _myService_;
        $rootScope = _$rootScope_;
    }));

    it("can generate and resolve a promise", () => {
        const p = Promise.resolve("ok");
        const p2 = p.then((value) => {
            expect(value).toEqual("ok");
        });
        return p2;
    });

    it("$q can generate and resolve a deferred", () => {
        const d = $q.defer();
        d.resolve(1);
        const p = d.promise;
        const p2 = p.then((value) => {
            expect(value).toEqual(1);
        });
        return p2;
    });

    it("$q can generate and resolve a deferred asynchronous", () => {
        const d = $q.defer();
        setTimeout(() => {
            d.resolve(1);
            $rootScope.$digest();
        }, 100);
        const p = d.promise;
        const p2 = p.then((value) => {
            expect(value).toEqual(1);
        });
        return p2;
    });

    it("$q can generate and resolve an asynchronous action via constructor form", () => {
        const p = $q((accept, reject) => {
            setTimeout(() => {
                accept(1);
                $rootScope.$digest();
            }, 100);
        });
        const p2 = p.then((value) => {
            expect(value).toEqual(1);
        });
        return p2;
    });

    it("can generate and resolve a promise ($q)", () => {
        const p = $q.resolve("ok");
        const p2 = p.then((value) => {
            expect(value).toEqual("ok");
        });
        return p2;
    });

    describe("then", () => {

        it("transforms values", () => {
            const p = Promise.resolve(1);
            const transform = (n) => n * 2;
            const p2 = p.then(transform);
            const p3 = p2.then((result) => {
                expect(result).toEqual(2);
            });
            return p3;
        });

        it("transforms values (one long chain)", () => {
            const transform = (n) => n * 2;
            return Promise.resolve(1)
                .then(transform)
                .then((result) => {
                    expect(result).toEqual(2);
                });
        });

        it("transforms values (one long chain)", () => {
            return myService.getItems()
                // this then is superfluous
                // .then(getItemsComplete)
                .then((result) => {
                    expect(result).toEqual([
                        { ID: 1, Title: "Item One" },
                        { ID: 2, Title: "Item Two" },
                        { ID: 2, Title: "Item Three" }
                    ]);
                });
            
            function getItemsComplete(response) {
                return response;
            }
        });

        it("allows you to catch a resulting value", () => {
            const vm = { ID: -1 };
            const p = Promise.resolve(6);
            return p.then((id) => {
                vm.ID = id;
                expect(vm.ID).toEqual(6);
            });
        });

        it("can do transforms that are asynchronous", () => {
            const p = myService.getItems();
            const p2Wrapper = p.then((items) => {
                const p2 = myService.getDetail(items[0].ID);
                return p2;
            });
            const p3 = p2Wrapper.then((detail) => {
                expect(detail.Details).toEqual("Details for Item 1.");
            });
            return p3;
        });

        it("can do transforms that are asynchronous (one long chain)", () => {
            return myService.getItems()
                .then((items) => myService.getDetail(items[0].ID))
                .then((detail) => {
                    expect(detail.Details).toEqual("Details for Item 1.");
                });
        });

        it("you can use nesting if you want to use a var in a previous step", () => {
            const p = myService.getItems();
            const p2 = p.then((items) => {
                const p3 = myService.getDetail(items[0].ID);
                const p4 = p3.then((detail) => {
                    const ID = items[1].ID + items[0].ID + items[2].ID;
                    const p5 = myService.getDetail(ID);
                    return p5;
                });
                return p4;
            });
            return p2; 
        });

    });

    describe("error handling", () => {

        // it("should should error", () => {
        //     const p = Promise.reject(new Error("fail"));
        //     return p;
        // });

        it("should catch error", () => {
            const p = Promise.reject(new Error("fail"));
            const p2 = p
                .catch((error) => {
                    expect(error.message).toEqual("fail");
                });
            return p2;
        });

        it("should catch error and still resolve a 'good' value", () => {
            const p = Promise.reject(new Error("fail"));
            const p2 = p
                .catch((error) => {
                    return "ok";
                });
            const p3 = p2
                .then((value) => {
                    expect(value).toEqual("ok");
                });
            return p3;
        });
        
    });


    

});