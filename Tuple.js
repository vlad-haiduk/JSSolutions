/** Finite ordered constant list of elements */
class Tuple {
    #len = 0;

    /** @param  {...any} values list of tuple values */
    constructor(...values) {
        Object.defineProperty(this, 'len', {
            enumerable: false,
            writable: true
        })

        for (let item of values) {
            Object.defineProperty(this, this.#len++, {
                value: item,
                writable: false,
                enumerable: true
            })
        }
    }

    /** Amount of elements */
    get length() {
        return this.#len;
    }

    *[Symbol.iterator]() {
        let current = 0;
        while (current < this.#len) {
            yield this[current++];
        }
    }

    /** String representing the collection */
    toString() {
        let primitive = '(';
        for (let item of this) {
            primitive += item + ', ';
        }
        return primitive.slice(0, -2) + ')';
    }
}
