/**
 * Перевантаження функцій
 */
class Overload {
    #funcs = {};
    /**
     * @param  {...function} functions перелік функцій
     */
    constructor(...functions) {
        // Формування об'єкта-визначника:
        for (let func of functions) {
            this.#funcs[func.length] = func;
        }

        // якщо не надано стандартної функції
        if (!(0 in this.#funcs))
            this.#funcs[0] = (...args) => undefined;
    }

    /**
     * Виклик функції в залежності від кількості аргументів
     * @param  {...any} args аргументи функції
     * @returns функція
     */
    call(...args) {
        return args.length in this.#funcs
        ? this.#funcs[args.length](...args)
        : this.#funcs[0](...args);
    }
}

// Приклад
class Summator {
    #sumOverload = new Overload(this.#singleSum, this.#binarySum, this.#multipleSum);

    #singleSum(a) {
        console.log('single')
        return a + a;
    }

    #binarySum(a, b) {
        console.log('binary')
        return a + b;
    }

    #multipleSum(...adds) {
        console.log('multiply')
        return adds.reduce((x, current) => x + current);
    }

    sum(...args) {
        return this.#sumOverload.call(...args);
    }
}

const action = new Summator();
console.log(action.sum(1));
console.log(action.sum(1, 7));
console.log(action.sum(1, 7, 3));
