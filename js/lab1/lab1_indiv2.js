// 2. Найти факториал числа: программа вычисляет факториал введенного числа.

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Введите N для вычисления факториала: ', (n) => {
    let factorial = 1;
    let i = 1;
    do {
        factorial *= i;
        i++;
    } while (i <= n);

    console.log(`${n}! = ${factorial}`);
    readline.close();
});
