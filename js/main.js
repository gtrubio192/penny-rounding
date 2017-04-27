'use strict'

function moneySplitter(total, count) {
  let monies = [];
  let confirmedMonies = {};
  monies = splitTotal(total, count);
  console.log('Results from splitting and rounding: ', monies);

  confirmedMonies = confirmTotal(total, monies);
  console.log('Results from confirming total: ', confirmedMonies.message, confirmedMonies.amount);

  $('.js-array').text('[' + monies + ']');
  $('.js-results').text(confirmedMonies.message + ', ' + confirmedMonies.amount);
  $('.results').addClass('is-active');
}

/**
 * Divide value by count.
 * Rounds a divided values to the nearest 2 decimal places
 *
 * @param {number} value
 * @param {number} count
 * @returns {array}
 */
function splitTotal(value, count) {
  // Check for correct input
  if (isNaN(value) && isNaN(count)) {
    return NaN;
  }
  // Divide our value by count, and round to 2 decimal places.
  // toFixed() returns a string, so we parse it to return a float
  let dividedValue = parseFloat((value/count).toFixed(2));
  let evenlyDividedValues = [];
  // Create an array size of 'count' and populate each element with dividedValue
  for (var i = 1; i <= count; i++) {
    evenlyDividedValues.push(dividedValue);
  }
  return evenlyDividedValues;
}

function confirmTotal(originalTotal, moniesArray) {
  let total = { amount: 0, message: ''};
  let difference = 0;

  total.amount = addArray(moniesArray);

  if (total.amount === originalTotal) {
    total.message = 'Everythings gonna be alright now child';
  }
  else if (total.amount > originalTotal) {
    total.message = 'Houston we have a problem: rounded array was higher than expected ';
    // If the rounded amount was too high, we subtract
    total.amount = pennyWise(false, moniesArray, parseFloat((total.amount - originalTotal).toFixed(2)*100  ));
  }
  else if (total.amount < originalTotal) {
    total.message = 'Houston we have a problem: rounded array was lower than expected ';
    // If the rounded amount was too low, we add
    total.amount = pennyWise(true, moniesArray, parseFloat((originalTotal - total.amount).toFixed(2)*100 ));
  }
  return total;
}

/**
 * Add or subtract 1 penny from the divided values until all elements add up to the correct amount
 *
 * @param {boolean} add
 * @param {array} miscalculatedArray
 * @param {number} difference
 * @returns {array}
 */
function pennyWise(add, miscalculatedArray, difference) {
  let increment = 0.01;
  let misCalculatedTotal = 0;
  if (miscalculatedArray.length > difference) {
    for (var i = 0; i < difference; i++) {

      if (add) {
        miscalculatedArray[i] = parseFloat((miscalculatedArray[i] + increment).toFixed(2));
      }
      else {
        miscalculatedArray[i] = parseFloat((miscalculatedArray[i] - increment).toFixed(2));
      }
    }
  }

  return addArray(miscalculatedArray);
}

function addArray(numbersArray) {
  let total = 0;
  numbersArray.forEach( element => {
    total += element;
  });

  return parseFloat((total).toFixed(2));
}

$('.js-submit').click( () => {
  let count = $('.js-count').val();
  let total = $('.js-total').val();
  moneySplitter(total, count);
})


// REDO Ideas:
// 1)
// Instead of parseFloat((666).toFixed(2)) method to round and format number,
// redo whole project as an angular 2 app.
// Angular 2 provides easy methods to format and display numbers using pipes | :
// {{ floatNumber | currency: 'USD': true: '1.2-2'}}
// '1.2-2' => at least 1 number on left of decimal :: at least 2 nums after decimal :: max of 2 nums after decimal
// USD = currency code :: true = show currency symbol vs 'USD'
//
// 2)
// Multiply rounded float numbers by 100 during all calculations, then divide by 100.
// This will keep whole numbers and avoid having to re-round everytime
