/** LinkedArray's item */
class LinkItem {
    #next = null; // посилання на наступний елемент
    #prev = null; // попередній

    constructor(value, index = 0) {
        this.value = value;
        this.index = index;
    }
};

/** Сollection of nodes which together represent a sequence */
class LinkedArray {
    constructor(...values) {
        this.clear(); // визначення першого елемента
        this.last = this.first; // останній елемент
        if (values)
            this.addArray(values);
    }

    get length() {
        return this.first.value; // the length is stored in the first element
    }

    add(value) {
        value = new LinkItem(value);
        this.last.next = value
        value.prev = this.last
        this.last = value
        this.first.value++; // increase the length counter
        this.last.index = this.first.value - 1;
    }

    /** Add a collection */
    addArray(...values) {
        for (let value of values) {
            console.log('.', value);
            this.add(value);
        }
    }

    /** Delete the last item
     * @returns element value
     */
    pop() {
        const value = this.last.value;
        this.last.prev.next = null;
        return value;
    }

    /** Очищення списку */
    clear() {
        this.first = new LinkItem(0, -1);
    }

    /**
     * Search for a value in the list [O(n)]
     * @returns {Number} index | undefined if the value is missing
     */
    find(value) {
        let current = this.first;
        while (current = current.next)
            if (current.value === value)
                return current.index;
        return undefined;
    }

    /**
     * Get the value by index [O(n)]
     * @param {Number}  0 <= index < length
     * @returns {*} element value | undefined if the index is missing or incorrect
     */
    get(index) { 
        if (index < 0 || index >= this.length)
            return undefined;
        let current = this.first
        while (current = current.next)
            if (current.index === index)
                return current.value;
        return undefined;
    }
    
    // Enumerate:
    /**
     * Values with indexes by .value, .index
     * @returns {Generator}
     */
    *withIndexes() {
        let current = this.first;
        while (current = current.next)
            yield current;
    }

    /** 
     * Reversed array
     * @returns {Generator}
    */
    *reverse() {
        let current = this.last
        while (current !== this.first) {
            yield current.value;
            current = current.prev;
        }
    }

    [Symbol.iterator]() {
        console.log(this);
        return new LinkIter(this); 
    }
};

/** Стандартний ітератор на зв'язаний список */
class LinkIter {
    /**
     * @param {LinkedArray} list зв'язаний список
     */
    constructor(list) {
        this.list = list;
        this.current = this.list.first;
    }

    /** Наступний елемент */
    next() {
        this.current = this.current.next;
        return this.current
            ? { done: false, value: this.current.value }
            : { done: true };
    }
}

const list = new LinkedArray(7, 8);
list.addArray([5, 'hello', 'all']);

for (let item of list.withIndexes()) {
    console.log(item.index, item.value);
}
console.log(list.length);
