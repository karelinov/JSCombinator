export {powerset}

/**
 * Функция комбинирования всех значений входного массива
 * @param {*} inputarray Массив комбинируемых значений 
 * @returns Массив, каждый элемент которого содержит массив с одной из возможных комбинаций
 */
function powerset(inputarray) {
  var result = [];

  for (var inputarrayindex =0; inputarrayindex < inputarray.length; inputarrayindex++ ) {
    //console.log('inputarrayindex=',inputarrayindex,' inputarrayitem=',inputarray[inputarrayindex]);

    result.push([inputarray[inputarrayindex]]);

    for (var inputarraycopyindex =inputarrayindex+1; inputarraycopyindex < inputarray.length; inputarraycopyindex++) {
      //console.log('inputaraycopyindex=',inputarraycopyindex);

      result.push(result[result.length-1].concat([inputarray[inputarraycopyindex]]));
  
    }
  }
  return result;  
}
