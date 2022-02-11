// ФОРМИРОВАНИЯ МАССИВА КЛЮЧЕЙ ОБЪЕКТА

// ЧЕРЕЗ РЕКУРСИЮ
function getKeysArray(object) {
  const parsedObj = Object
    .entries(object)
    .reduce((acc, [key, value]) => {
      const TYPES = ['number', 'boolean', 'string', 'undefined', 'symbol', 'function'];
      
      if (TYPES.includes(typeof value) || !value) return { ...acc, [key]: null };
      if (Array.isArray(value)) {
        return {                                 
          ...acc,
          ...value.reduce((acc, _, i) => ({ ...acc, [`${key}.${i}`]: null }), {})
        };
        
      }
      
      return {
        ...acc,
        ...Object.entries(value).reduce((acc, [elKey, elValue]) => (
          { ...acc, [`${key}.${elKey}`]: elValue }
        ), {})
      };
    }, {});
  
  const isFullyParsed = Object
    .values(parsedObj)
    .every(value => value === null);

    if (!isFullyParsed) return getKeysArray(parsedObj);

    return Object.keys(parsedObj);
};

// ЧЕРЕЗ ЦИКЛ WHILE
// function getKeysArray(object) {
//   let parsedObj = { ...object };
//   let isParsed = isFullyParsed(parsedObj);
  
//   while (!isParsed) {
//     parsedObj = parsing(parsedObj);
//     isParsed = isFullyParsed(parsedObj);
//   }

//   function parsing(obj) {
//     return Object
//       .entries(obj)
//       .reduce((acc, [key, value]) => {
//         const TYPES = ['number', 'boolean', 'string', 'undefined', 'symbol', 'function'];
        
//         if (TYPES.includes(typeof value) || !value) return { ...acc, [key]: null };
//         if (Array.isArray(value)) {
//           return {
//             ...acc,
//             ...value.reduce((acc, _, i) => ({ ...acc, [`${key}.${i}`]: null }), {})
//           };
//         }
      
//         return {
//           ...acc,
//           ...Object.entries(value).reduce((acc, [elKey, elValue]) => (
//             { ...acc, [`${key}.${elKey}`]: elValue }
//           ), {})
//         };
//       }, {});
//   }

//   function isFullyParsed (obj) {
//     return Object
//       .values(obj)
//       .every(value => value === null);
//   }

//   return Object.keys(parsedObj);
// };

  console.log(getKeysArray({
    a: {
      b: 2,
      c: 4,
    },
  }));  // will return ["a.b", "a.c"]


  console.log(getKeysArray({
    a: {
      b: 2,
      q: [0, 3, 4],
    },
    x: true,
    d: { f: null },
  }));    // will return ["a.b", "a.q.0", "a.q.1", "a.q.2", "x", "d.f"]


    console.log(getKeysArray({
    a: {
      b: 2,
      q: [0, 3, 4],
    },
    x: true,
        d: { f: null },
        o: {
            x: null,
            y: [1, 4, 6],
            z: {
                q: true,
                w: [1, 2, 3],
                e: {
                    last:true
                }
            }
        }
    }));    // will return ['a.b', 'a.q.0', 'a.q.1', 'a.q.2', 'x', 'd.f', 'o.x', 'o.y.0', 'o.y.1', 'o.y.2', 'o.z.q', 'o.z.w.0', 'o.z.w.1', 'o.z.w.2', 'o.z.e.last']

