const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

    test('Whole number input', (done) => {
        let input = '14L'
        assert.equal(convertHandler.getNum(input),14)
        done()
    })

    test('Decimal input', (done) => {
        let input = '14.4L'
        assert.equal(convertHandler.getNum(input), 14.4)
        done()
    })

    test('Fractional input', (done) => {
        let input = '1/14L'
        assert.equal(convertHandler.getNum(input), 1/14)
        done()
    })

    test('Fractional input with decimal', (done) => {
        let input = '1.4/14L'
        assert.equal(convertHandler.getNum(input), 1.4/14)
        done()
    })

    test('Invalid input (double fraction)', (done) => {
        let input = '1/4/14L'
        assert.equal(convertHandler.getNum(input), undefined)
        done()
    })

    test('No numerical input', (done) => {
        let input = 'L'
        assert.equal(convertHandler.getNum(input), 1)
        done()
    })

    suite("Function convertHandler.getUnit(input)", () => {
        test("For each valid unit inouts", (done) => {
            let input = ["gal", "l", "mi", "km", "lbs", "kg", "GAL", "L", "MI", "KM", "LBS", "KG"]
            let output = ["gal", "L", "mi", "km", "lbs", "kg", "gal", "L", "mi", "km", "lbs", "kg"]
            input.forEach((ele, index) => {
                assert.equal(convertHandler.getUnit(ele), output[index])
            })
            done()
        })
        test("unknown unit input", (done) => {
            assert.equal(convertHandler.getUnit("14kilograms", undefined))
            done()
        })
    })

    suite("Function convertHandler.getReturnUnit(initUnit)", () => {
        test("For each valid unit input", (done) => {
            let input = ["gal", "l", "mi", "km", "lbs", "kg"]
            let output = ["L", "gal", "km", "mi", "kg", "lbs"]
            input.forEach((ele, i) => {
                assert.equal(convertHandler.getReturnUnit(ele), output[i])
            })
            done()
        })
    })
    
    suite("Function convertHandler.spellOutUnit(unit)", () => {
        test("For each valid unit inputs", (done) => {
            let input = ["gal", "l", "mi", "km", "lbs", "kg"]
            let expect = ["gallons", "liters", "miles", "kilometers", "pounds", "kilograms"]
            input.forEach((ele, i) => {
                assert.equal(convertHandler.spellOutUnit(ele), expect[i])
            })
            done()
        })
    })

    suite("Function convertHandler.convert(num, unit)", () => {
        test("Gal to L", (done) => {
            let input = [5, "gal"]
            let expected = 18.9271
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
            done()
        })
        test("L to gal", (done) => {
            let input = [5, "L"]
            let expected = 1.32086
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
            done()
        })
        test("Mi to km", (done) => {
            let input = [5, "mi"]
            let expected = 8.0467
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
            done()
        })
        test("Km to mi", (done) => {
            let input = [5, "km"]
            let expected = 3.10686
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
            done()
        })
        test("Lbs to kg", (done) => {
            let input = [5, "lbs"]
            let expected = 2.26796
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
            done()
        })
        test("Kg to lbs", (done) => {
            let input = [5, "kg"]
            let expected = 11.02312
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
            done()
        })
    })
})


