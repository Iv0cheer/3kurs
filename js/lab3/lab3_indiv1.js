// 1. Создать функцию с использованием ключевого слова function.
// 2. Определить необходимые параметры функции.
// 3. Описать логику внутри функции.
// 4. Вызвать функцию с тестовыми данными.
// 5. Вывести результат в консоль или на страницу для проверки.

// Задание №1:
// Напишите функцию, которая возвращает сумму чисел от a до b.

// cherenkov

function first(a, b) {
    let res = 0;
    for (let i = a; i <= b; i++) {
        res = res + i;
    }
    console.log(res);
}

first(1, 3);