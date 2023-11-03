/* eslint-disable */

/**
 * This script handles the form submission event. It validates and performs the
 * division operation if inputs are valid. If the inputs are not valid,
 * it displays an error message and logs an error in browser console.
 */

const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

/**
 * Event handler for the form submission event.
 *
 * @param {Event} event - The click event to submit the form.
 */
form.addEventListener("submit", (event) => {
  // Prevent the form from being submitted normally
  event.preventDefault();

  // Get the form data
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);

  // Validate the inputs
  if (!dividend || !divider) {
    // If either or both inputs are empty, display an error message
    result.innerText =
      "Division not performed. Both values are required in inputs. Try again";

    // Log an error in the browser console
    console.error("Invalid input: Both inputs are required");
  } else if (isNaN(dividend) || isNaN(divider)) {
    // If the inputs are not numbers, replace the entire screen with an error message
    document.body.innerHTML =
      "Something critical went wrong. Please reload the page";

    // Log an error in the browser console
    console.error("Invalid input: Both inputs must be numbers");
  } else if (dividend < 0 || divider < 0) {
    // If the inputs are negative, display an error message
    result.innerText =
      "Division not performed. Invalid number provided. Try again";

    // Log an error in the browser console
    console.error(
      "Invalid input: Both inputs must be numbers and not negative"
    );
  } else {
    // If the inputs are valid, perform the division operation and round down to nearest whole number
    result.innerText = Math.floor(dividend / divider);
  }
});
