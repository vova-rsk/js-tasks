// console.log('1');

// new Promise((resolve, reject) => {
//     console.log('promise body');
//     resolve();

//     setTimeout(() => {
//         console.log('promise body timeOut')
//     },0)
// })
//     .then(res => console.log('promise then'))

// console.log('2');

// setTimeout(() => {
//     console.log('timeOut')
// }, 0)

// console.log('3');

const arr = [1, 2, 3, 4];
console.log([...arr].map(arr.pop, arr));
console.log(arr);

console.log(new Date(2022, 02, 02).toISOString());