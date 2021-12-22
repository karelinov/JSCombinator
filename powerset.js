function powerset(inputarray) {
  var result = [[]];

  //const inputarraycopy = inputarray.concat();

  for (var inputarayindex =0; inputarayindex < inputarray.length; inputarayindex++ ) {
    console.log('inputarayindex=',inputarayindex,' inputarayitem=',inputarray[inputarayindex]);

    result.push([inputarray[inputarayindex]]);

    for (var inputaraycopyindex =inputarayindex+1; inputaraycopyindex < inputarray.length; inputaraycopyindex++) {
      console.log('inputaraycopyindex=',inputaraycopyindex);


      result.push(result[result.length-1].concat([inputarray[inputaraycopyindex]]));
  
    }

  }
  return result;  
}

var result = powerset(['1','2','3','A']);
for (const resultitem of result) {
  console.log(resultitem);
}
  
