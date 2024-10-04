// 3. Фильтрация массива по индексу.
// Удалите все элементы с индексами, кратными 3.

// cherenkov

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 0, 10]

for (let i = 1; i < numbers.length; i++) {
    if (i % 3 === 0) {
        console.log(`spliced number ${numbers[i]} with index ${i}`)
        numbers.splice(i, 1);
    }
}

console.log(numbers);
