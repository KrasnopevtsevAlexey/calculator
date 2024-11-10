document.getElementById('toggle-button').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme'); // Переключаем класс для темной темы

    // Меняем текст кнопки в зависимости от текущей темы
    const isDarkTheme = document.body.classList.contains('dark-theme');
    document.getElementById('toggle-button').textContent = isDarkTheme ? 'Светлая тема' : 'Темная тема';
});

let a = '';
let b = '';
let sign = '';
let finish = false;

const numb = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', '/', '%', '*'];

const out = document.querySelector('.calc-screen p');

// Функция очистки
function clearAll() {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = '0';
}
document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
    // Нажата не кнопка
    if (!event.target.classList.contains('btn')) return;
    // Нажата кнопка ac
    if (event.target.classList.contains('ac')) return;

    // Получаю нажатую кнопку
    const key = event.target.textContent;

    // Если нажата кнопка от 0 до 9 или .
    if (numb.includes(key)) {
        // Проверяем, какую часть числа мы заполняем (a или b)
        if (b === '' && sign === '') {
            if (a === '0' && key !== '.') {
                a = key; // Заменяем 0 на введенное число
            } else if (key === '.' && !a.includes('.')) {
                a += key; // Добавляем десятичную точку, если её нет
            } else if (key !== '.') {
                a += key; // Добавляем цифру к a
            }
            out.textContent = a;

        } else if (a !== '' && b !== '' && finish) {
            b = key;
            finish = false;
            out.textContent = b;
        
        } else if (key === '.' && !b.includes('.')) {
            b += key; // Добавляем десятичную точку к b, если её нет
            out.textContent = b;
        } else {
            b += key; // Добавляем цифру к b
            out.textContent = b;
        }
        updateFontSize(out);
        return;
    }

    // Если нажата клавиша +, -, /, * или %
    if (action.includes(key)) {
        if (a === '') return; // Предотвращаем операцию без первого числа
        sign = key;
        out.textContent = sign;
        updateFontSize(out);
        return;
    }

    // Обработка кнопки =
    if (key === '=') {
        if (b === '') b = a;  // Если b пустой, присваиваем ему a
        switch (sign) {
            case '+': a = (+a) + (+b); break;
            case '-': a = (+a) - (+b); break;
            case '*': a = (+a) * (+b); break;
            case '/':
                if (b === '0') {
                    out.textContent = 'error';
                    return;
                }
                a = (+a) / (+b); break;
            case '%':
                if (b === '0') {
                    out.textContent = 'error';
                    return;
                }
                a = ((+a) / (+b)) * 100; break;
        }
        finish = true;
        out.textContent = a; 
        updateFontSize(out);
    }
};

function updateFontSize(element) {
    let fontSize = 4; // начальный размер шрифта
    element.style.fontSize = fontSize + 'rem'; // сбросить размер

    while (element.scrollWidth > element.clientWidth) {
        fontSize--; // уменьшаем размер шрифта
        element.style.fontSize = fontSize + 'rem';
    }
}