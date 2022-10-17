const generateBtn = document.querySelector("#generate");

// Object of the 4 different set options; for each, an object with their set (array), and a boolean for whether to include them (tied to the 'confirms')
  // Splitting a string of the charsets make it faster to build the array than typing it out manually!
const options = {
  lower : {
    include : true,
    set : 'abcdefghijklmnopqrstuvwxyz'.split('')
  },
  upper : {
    include : true,
    set : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  },
  number : {
    include : true,
    set : '1234567890'.split('')
  },
  special : {
    include : true,
    set : '!@#$%^&*~'.split('') // need to ensure what this set should have in it.. right now its just a few
  }
}

// Initializing a variable for length of password; setting a default value
let passwordLength = 25;

// This will count the sets that were chosen (0-4 possible)
let numSets = 0;

// Write password to the #password input
function writePassword() {
  const password = generatePassword();
  const passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Helper function for the primary one; returns one random element from a given array
  // Compartmentalizing this piece helped me visualize the critical loop that will build the password
function randChar(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex]
}

// The Fisher-Yates shuffle algorithm for JS!
  // I did not make this, I am just using it
function shuffleArray(array) {
  let currentIndex = array.length;
  // While there are remaining elements to shuffle..
  while (0 !== currentIndex) {
    // Picks a remaining element
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // Swaps it with the current element
    let temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

// Generates a password based on criteria provided by the user (one prompt for password length, four boolean 'confirms' for character sets)
function generatePassword() {
  passwordLength = parseInt(prompt("Please choose a length for your password, between 8-128 characters (default is 25).", 25));

  // Re-prompts on invalid inputs; because im using 'parseInt', a lot of invalid inputs will become 'NaN'..
    // The 2nd and 3rd conditions are obvious, but would both be false if compared to 'NaN' (thus clearing the loop), which is why the first condition is necessary
  while (!passwordLength || passwordLength > 128 || passwordLength < 8) {
    passwordLength = parseInt(prompt("Invalid input. Please pick a number between 8-128."));
  }

  // Option selection block
  // numSets will start off as zero, so we'll get in here once; it'll only loop again if user selects NO for all options
  while (numSets === 0) {
    options.lower.include = confirm("Would you like lowercase letters? (OK = YES; Cancel = NO)");
    options.upper.include = confirm("Would you like uppercase letters? (OK = YES; Cancel = NO)");
    options.number.include = confirm("Would you like numeric characters? (OK = YES; Cancel = NO)");
    options.special.include = confirm("Would you like special characters? (OK = YES; Cancel = NO)");

  // Checks the boolean values of each set (based on the 'confirms') -- if NONE are selected, then the user will have to run through the 'confirms' again
    for (let [key, value] of Object.entries(options)) {
      if (options[key].include) {
        numSets++;
      }
    }

  // I only want this alert to show if the user went through everything once and didn't pick anything
    if (numSets === 0) {
      alert("You have to pick at least one set! Let's try this again..");
    }
  }

  // Begin password build; I'm doing it this way to get an equal (or close) number of characters from each selected set in the password
    // I'm going to overshoot on the character total, in order to complete a full for loop of the for the 'true' sets, then chop the excess off after
    
  let genLoopIters = Math.floor(passwordLength / numSets) + 1;

  //If there's no remainder, I actually don't want the '+1' added to it -- the odds are higher there IS a remainder than not, which is why I started at '+1' and pulled it back (instead of vice versa)
  if (passwordLength % numSets === 0) {
    genLoopIters--;
  }

  // This will start empty, and I'll add one character at a time to it, utilizing that helper function I made
  const resultArray = [];

  // Best part of the code! This is actually builds the password
  while (genLoopIters > 0) {
    for (let [key, value] of Object.entries(options)) {
      if (options[key].include) {
        resultArray.push(randChar(options[key].set));
      }
    }
    genLoopIters--;
  }
  
  // Shuffles the array using the above shuffle algorithm
  let shuffledArray = shuffleArray(resultArray);

  // Turns the array into a string
  let resultString = shuffledArray.join('');

  // Identifies the overshoot in length, if it exists
  let excessChars = resultString.length - passwordLength;
  // Easiest way to chop the excess characters off; it does it from the start of the string, but that doesn't really matter for this
  if (excessChars > 0) {
    resultString = resultString.slice(excessChars);
  }

  // Resetting 'set count' to 0 in case user wants to go through the process again, without reloading
  numSets = 0;

  // Disables the button (there is some CSS styling for this status); however, I chose to not do this (see above line)
  // generateBtn.disabled = true;

  return resultString
}


// Add event listener to generate button, and being the series of prompts to make password
generateBtn.addEventListener("click", writePassword);
