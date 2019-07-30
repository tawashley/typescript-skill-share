// arbitrary TS example is arbitrary
function addTwoNumbers(number1: number, number2: number) {
  return number1 + number2;
}

var five = addTwoNumbers(1, 4); // 5, all good
// var ten = addTwoNumbers("9", 1); // Compilation error, parameter signiture mismatch
// var two = addTwoNumbers(true, true); // same again...
