// 1. Создать функцию с использованием ключевого слова function.
// 2. Определить необходимые параметры функции.
// 3. Описать логику внутри функции.
// 4. Вызвать функцию с тестовыми данными.
// 5. Вывести результат в консоль или на страницу для проверки.

// Задание №3:
// Напишите функцию, которая возвращает разность чисел в массиве

// cherenkov

function reduction(list) {
    let res = list[0];
    for (let i = 1; i < list.length; i++) {
        res -= list[i];
    }
    console.log(res);
}

const list = [10, 1, 2];
reduction(list);