// const chooseOptimalDistance = (t, k, ls) => {
//     if (t < 0 || k < 1 || ls.length < k) {
//         return null
//     };

//     // В данных примерах не обязательно, но в случае передачи 
//     // несортированного массива - маст хев)
//     const sortedLs = [...ls].sort();
    
//     let max = 0;
    
//     for (let first = 0; first < sortedLs.length - 2; first += 1) {
//         let second = first + 1;
//         let third = sortedLs.length - 1;

//         while (second < third) {
//             const sum = sortedLs[first] + sortedLs[second] + sortedLs[third];

//             if (sum === t) {
//                 max = sum;
//                 break;
//             } else if (sum > t) {
//                 third -= 1;
//             } else {
//                 second += 1;
                
//                 if (sum > max) {
//                     max = sum;
//                 }
//             }
//         }
//     }
    
//     return max;
// }

const chooseOptimalDistance = (t, k, ls) => {
    if (t < 0 || k < 1 || ls.length < k) {
        return null
    };

    const blank = makeBlank(ls);
    const variants = makeVariants(blank);
    console.log(variants);

    const sumArr = variants
        .map(el => el.reduce((sum,item)=>sum+item),0)
        .filter(el => el <= t);
    const maxRouteLength = Math.max(...sumArr);

    function  makeBlank(ls) { 
        return ls.reduce((acc, el, i, arr) => {
            const targetIdx = arr.length - 1 - (k-1);

            if (i <= targetIdx) {
                return [...acc, [el, arr.slice(i + 1)]];
            }

            return acc;
        }, []);
    }

    function makeVariants(arr) {
        const variants = arr.reduce((acc, el) => {

            const firstSubElemsArr = el.slice(0, el.length - 1);
            let lastSubEl = el[el.length - 1];

            if (firstSubElemsArr.length === k) { 
                acc.push(firstSubElemsArr);
                return acc;
            }
            
            while (lastSubEl.length !==0 ) {
                const [first, ...other] = lastSubEl;
                lastSubEl = other;

                if (firstSubElemsArr.length + 1 === k) {
                    acc.push([...firstSubElemsArr, first]);
                } else { 
                    acc.push([...firstSubElemsArr, first, other]);
                }                    
            }
            
            return acc;
        }, []);

        const isAllDone = variants.every(el => !Array.isArray(el[el.length - 1]));

        if (!isAllDone) {
            return makeVariants(variants);
        }
        
        return variants;
    };

    return maxRouteLength;
}




// console.log(chooseOptimalDistance(174, 3, [51, 56, 58, 59, 61])); //173
// console.log(chooseOptimalDistance(174, 3, [59, 61,56, 51, 58 ])); //173
// console.log(chooseOptimalDistance(163, 3, [50])); // null

console.log(chooseOptimalDistance(174, 3, [51, 56, 58, 59, 61, 65, 70])); 
console.log(chooseOptimalDistance(250, 5, [51, 56, 58, 59, 61, 65, 70, 35, 56,78, 100 ])); //173