// 3. Вывести все четные числа до N: программа выводит все четные числа от 1 до N.

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Введите число N: ', (n) => {
    n = Number(n);

    console.log(`Четные числа от 1 до ${n}:`)
    for (let i = 2; i <= n; i += 2) {
        console.log(i);
    };

    readline.close();
})
