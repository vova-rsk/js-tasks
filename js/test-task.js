const chooseOptimalDistance = (t, k, ls) => {
    if (!inputsCheck(t, k, ls)) {
        console.log('заданы некорректные данные');
        return null;
    }    

    const routes = makeRoutes(makeBlank(ls));

    const maxRouteLength = routes.reduce((max, { length }) => (
        length > max && length <= t ? length : max
    ),0);

    // ф-я для перевірки ввідних даних
    function inputsCheck(t, k, ls) {
        let result = true;

        if (t < 0 || k < 1 || !Array.isArray(ls) || ls.length === 0) {
            result = false;
        };

        if (ls.some(el => isNaN(el) || (el % 1 !== 0) || el < 0)) { 
            result = false;
        }

        return result;
    }

    // ф-я для підготовки даних щодо маршрутів для подальшого опрацювання
    function  makeBlank(ls) { 
        return ls.reduce((acc, el, i, arr) => {
            const targetIdx = arr.length - 1 - (k-1);

            if (i <= targetIdx) {
                acc.push([el, arr.slice(i + 1)]);
            }

            return acc;
        }, []);
    }

    // ф-я для створення масиву об'єктів маршрутів (маршрут, протяжність) 
    function makeRoutes(arr) {
        const routes = arr.reduce((acc, el) => {
            
            if (el.toString() === '[object Object]') { 
                acc.push(el);
                return acc;
            }
                
            const firstSubElemsArr = el.slice(0, el.length - 1);
            let lastSubElArr = el[el.length - 1];

            if (firstSubElemsArr.length === k) {
                const routeObj = {
                    route: firstSubElemsArr,
                    length: firstSubElemsArr.reduce((sum, el) => sum + el)
                };
                acc.push(routeObj);
                return acc;
            }

            while (lastSubElArr.length !== 0) {
                const [firstEl, ...other] = lastSubElArr;
                acc.push([...firstSubElemsArr, firstEl, other]);
                lastSubElArr = other;
            }

            return acc;
        }, []);

        const isFinish = routes.every(el => el.toString() === '[object Object]');

        return isFinish ? routes : makeRoutes(routes);
    };

    return maxRouteLength !== 0 ? maxRouteLength : null;
}

console.log(chooseOptimalDistance(174, 3, [51, 56, 58, 59, 61])); //173
console.log(chooseOptimalDistance(163, 3, [50])); // null
