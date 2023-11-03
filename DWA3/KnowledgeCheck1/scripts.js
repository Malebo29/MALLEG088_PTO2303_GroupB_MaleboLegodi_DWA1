/* eslint-disable no-console */

/**
 * Adds two numbers together.
 *
 * @param {number} a - The first number of the addition.
 * @param {number} b - The second number of the addition.
 * @returns {number} The sum of the two numbers.
 */
const add = (a, b) => a + b;

/**
 * Multiplies two numbers.
 *
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The product of the two numbers.
 */
const multiply = (a, b) => a * b;

/**
 * Performs a calculation on the properties of the object it's called on.
 *
 * @this {Object} The object that this function is a method of.
 * @returns {number} The result of adding the object's 'a' and 'b' properties and multiplying the result by the 'c' property.
 */
function internal() {
  const added = add(this.internal.a, this.internal.b);
  const results = multiply(added, this.internal.c);
  return results;
}

// Not allowed to change below this

/**
 * An example object with properties for performing calculations.
 *
 * @type {Object}
 * @property {Object} internal - An object with properties for performing calculations.
 * @property {number} internal.a - The first number to add.
 * @property {number} internal.b - The second number to add.
 * @property {number} internal.c - The number to multiply by.
 * @property {Function} add - A function that adds two numbers.
 * @property {Function} multiply - A function that multiplies two numbers.
 * @property {Function} calculate - A function that performs a calculation on the object's properties.
 */
const example1 = {
  internal: {
    a: 2,
    b: 4,
    c: 8,
  },
  add,
  multiply,
  calculate: internal,
};

/**
 * Another example object with properties for performing calculations.
 *
 * @type {Object}
 * @property {Object} internal - An object with properties for performing calculations.
 * @property {number} internal.a - The first number to add.
 * @property {number} internal.b - The second number to add.
 * @property {number} internal.c - The number to multiply by.
 * @property {Function} add - A function that adds two numbers.
 * @property {Function} multiply - A function that multiplies two numbers.
 * @property {Function} calculate - A function that performs a calculation on the object's properties.
 */
const example2 = {
  internal: {
    a: 2,
    b: 2,
    c: 3,
  },
  add,
  multiply,
  calculate: internal,
};

console.log(example1.calculate());
console.log(example2.calculate());
