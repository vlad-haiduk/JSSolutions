/** Finite ordered list of elements */
class Tuple {
    /**
     * @param  {...any} values list of tuple values
     */
    constructor(...values) {
        Object.defineProperty(this, 'length', {
            value: 0,
            enumerable: false,
            writable: true
        })

        for (let item of values) {
            Object.defineProperty(this, this.length++, {
                value: item,
                writable: false
            })
        }
    }
}
