console.log('1');

new Promise((resolve, reject) => { 
    console.log('promise body');
    resolve();

    setTimeout(() => { 
        console.log('promise body timeOut')
    },0)
})
    .then(res => console.log('promise then'))

console.log('2');

setTimeout(() => { 
    console.log('timeOut')
}, 0)

console.log('3');