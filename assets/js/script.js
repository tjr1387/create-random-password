const generateBtn = document.querySelector("#generate");

// object of the 4 different set options; for each, an object with their set (array), and a boolean for whether to include them
  //splitting a string of the charsets make it faster to build the array than typing it out manually!
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
    set : '!@#$%^&*'.split('') // need to ensure what this set should have in it.. right now its just a few
  }
}

// initializing a value for length of password and setting a default value
let passwordLength = 25;

//a counter of the sets that were chosen (0-4 possible)
let numSets = 0;


// Write password to the #password input
function writePassword() {
  const password = generatePassword();
  const passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Generates a password based on criteria provided by the user (one prompt for password length, four boolean 'confirms' for character sets)
function generatePassword() {
  passwordLength = parseInt(prompt("Please choose a length for your password, between 8-128 characters (default is 25).", 25));

  // re-prompts for invalid inputs -- because im using 'parseInt', a lot of invalid inputs will become 'NaN'
    // the 2nd and 3rd conditions are obvious, but would both be false if compared to 'NaN' (thus clearing the loop), which is why the first condition is necessary
  while (!passwordLength || passwordLength > 128 || passwordLength < 8) {
    passwordLength = parseInt(prompt("Invalid input. Please pick a number between 8-128."));
  }

  // this is the section where the options are selected
  // numSets will start off as zero, so we'll get in here once -- it'll only loop again if user selects NO for all options
  while (numSets === 0) {
    options.lower.include = confirm("Would you like lowercase letters? (OK = YES; Cancel = NO)");
    options.upper.include = confirm("Would you like uppercase letters? (OK = YES; Cancel = NO)");
    options.number.include = confirm("Would you like numeric characters? (OK = YES; Cancel = NO)");
    options.special.include = confirm("Would you like special characters? (OK = YES; Cancel = NO)");

  // this loop checks the boolean values of each set -- if NONE are selected, then the user will have to run through the 'confirms' again
    for (let [key, value] of Object.entries(options)) {
      if (options[key].include) {
        numSets++;
      }
    }

  // I only want this alert to show if the user went through everything once and still didn't pick anything
    if (numSets === 0) {
      alert("You have to pick at least one set! Let's try this again..");
    }
  }

}




// Add event listener to generate button, and being the series of prompts to make password
generateBtn.addEventListener("click", writePassword);
