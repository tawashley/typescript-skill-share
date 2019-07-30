// arbitrary example is arbitrary
function addTwoNumbers(number1, number2) {
  return number1 + number2;
}

var five = addTwoNumbers(1, 4); // 5, all good
var ten = addTwoNumbers("9", 1); // "91", uh-oh
var two = addTwoNumbers(true, true); // 2, wut?

console.log(five);
console.log(ten);
console.log(two);
