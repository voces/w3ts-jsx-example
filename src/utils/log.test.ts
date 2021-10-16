import rewire from "rewire"
const log = rewire("./log")
const isArray = log.__get__("isArray")
const userdataType = log.__get__("userdataType")
// @ponicode
describe("isArray", () => {
    test("0", () => {
        let callFunction: any = () => {
            isArray({ 0: 100, 1: 380, key1: "foo bar" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            isArray(550)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            isArray({ 0: 100, 1: 520, key1: "Hello, world!" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            isArray(350)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            isArray({ 0: 1, 1: 520, key1: "foo bar" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            isArray({ 0: Infinity, 1: Infinity, key1: "" })
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("userdataType", () => {
    test("0", () => {
        let callFunction: any = () => {
            userdataType("a1969970175")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            userdataType("bc23a9d531064583ace8f67dad60f6bb")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            userdataType("Michael")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            userdataType(false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            userdataType(56784)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            userdataType(-Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("log.termToString", () => {
    test("0", () => {
        let callFunction: any = () => {
            log.termToString(0, true, 50)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            log.termToString("callback detected, not supported yet", true, 70)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            log.termToString({ key1: "Foo bar", key5: -100 }, false, 90)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            log.termToString({ key1: "Foo bar", key5: 0 }, true, 320)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            log.termToString({ key1: "foo bar", key5: -5.48 }, false, 0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            log.termToString({ key1: "", key5: -Infinity }, true, -Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("log.log", () => {
    test("0", () => {
        let callFunction: any = () => {
            log.log([true, false, -5.48, true, true])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            log.log([-5.48])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            log.log([false, "Software Engineer", true, 1, 0])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            log.log([1])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            log.log([false, false, 100, false, true])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            log.log([])
        }
    
        expect(callFunction).not.toThrow()
    })
})
