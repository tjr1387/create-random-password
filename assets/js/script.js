const generateBtn = document.querySelector("#generate");

//going to need some more variables here
  // the 4 character sets and booleans for whether theyre chosen, the chosen number of characters



// Write password to the #password input
function writePassword() {
  const password = generatePassword();
  const passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// the following is the bulk of the challenge -- the propmts will go in here
function generatePassword() {

}



// Add event listener to generate button, and being the series of prompts to make password
generateBtn.addEventListener("click", writePassword);
