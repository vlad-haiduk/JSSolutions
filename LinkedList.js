/** Елемент списку */
class LinkItem {
    #next = null; // посилання на наступний елемент
    #prev = null; // попередній

    /**
     * @param {*} value значення елементу
     * @param {Number} index порядковий номер
     */
    constructor(value, index = 0) {
        this.value = value;
        this.index = index;
    }
};

/** Зв'язний масив */
class LinkedArray {
    /**
     * @param  {...any} values список значень
     */
    constructor(...values) {
        this.clear(); // визначення першого елемента
        this.last = this.first; // останній елемент
        if (values)
            this.addArray(values);
    }

    /** Довжина списку */
    get length() {
        return this.first.value; // довжина зберігається в першому елементі
    }

    /** Додати елемент в список
     * @param {*} value значення елементу
     */
    add(value) {
        value = new LinkItem(value);
        this.last.next = value
        value.prev = this.last
        this.last = value
        this.first.value++; // збільшення лічильника довжини
        this.last.index = this.first.value - 1;
    }

    /** Додати колекцію значень
     * @param {Iterable} values колекція
     */
    addArray(...values) {
        for (let value of values) {
            console.log('.', value);
            this.add(value);
        }
    }

    /** Видалення останнього елементу
     * @returns значення елементу
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
     * Пошук значення в списку [O(n)]
     * @param {*} value значення
     * @returns {Number} індекс | undefined за відсутності value
     */
    find(value) {
        let current = this.first;
        while (current = current.next)
            if (current.value === value)
                return current.index;
        return undefined;
    }

    /**
     * Отримати значення за порядковим номером [O(n)]
     * @param {Number} index  0 <= індекс < length
     * @returns {*} значення елементу | undefined за відсутності або некоретності index
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
    
    // Перебір елементів:

    /**
     * Значення з індексами через .value, .index
     * @returns {Generator} генератор
     */
    *withIndexes() {
        let current = this.first;
        while (current = current.next)
            yield current;
    }

    /** 
     * Перевернутий список
     * @returns {Generator} генератор
    */
    *reverse() {
        let current = this.last
        while (current !== this.first) {
            yield current.value;
            current = current.prev;
        }
    }

    /** 
     * Системний символ - ітератор 
     * @param {String} mode режим [default, reverse]
     */
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
