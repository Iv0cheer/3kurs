// 2. Создание массива чисел, кратных 5.
// Создайте массив чисел от 1 до N, кратных 5

// cherenkov

let numbers = [5]
let N = 23

for (let i = 6; i <= N; i++) {
    if (i % 5 === 0) {
        numbers.push(i);
    }
}

console.log(numbers)