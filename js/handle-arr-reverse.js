// РУЧНОЙ REVERSE() ЗАДАННОГО МАССИВА БЕЗ ИСПОЛЬЗОВАНИЯ МЕТОДОВ И ПЕРЕМЕННЫХ

let arr = [1, 2, 3, 4, 5]

for (let i = 0; i < arr.length/2; i += 1) { 
    [arr[arr.length - 1 - i], arr[i]] = [arr[i], arr[arr.length - 1 - i]]
}

console.log('reversed array: ', arr)
