// 1. Определить среднее арифметическое чисел от 1 до N: программа вычисляет
// среднее арифметическое.

// cherenkov

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Выберите значение N: ', (n) => {
    n = Number(n);
    let sum = (n * (n + 1)) / 2;
    let avg = sum / n;

    console.log(`Среднее арифметическое чисел от 1 до ${n} равен ${avg}`);
    readline.close()
});
