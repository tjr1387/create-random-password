
# Week 3 Homework Challenge
# Creating a random, customized password

## Description

The intention of this repo is to take an existing 'password generator' page and add the core functionality to actually make the password. A series of prompts will ask the user to define the character sets they want in the password; the password will then be automatically created based on the character sets chosen.

## Installation

N/A

## Usage (incomplete)

The user will be able to provide parameters for a password to be automatically generated. They will pick the password's length (between 8-128 characters, inclusive) and then select whether they want characters from four separate sets (uppercase letters, lowercase letters, number characters, 'special' characters). The user must pick at least one set of characters; if they don't, they'll need to run through the 'set selection' prompts again. In the case of more than one set being chosen (should occur very often), the algorithm will use an equal number (or as close to equal as possible) of characters from the selected sets, as well as 'shuffle' the characters around to make it as random as possible, and as evenly spread (across sets) as possible. This password will be displayed in the text area once the user answers all of the questions. Without reloading, the user can repeat the process again (if they so choose) by hitting the button.

Screenshots: 

Link to live site: 

## Flaws

In the effort of trying to get an equal number of characters from the selected sets into the password, I figured a good way to do it was loop through the 'options' object I built, adding one character at a time. I'm not overly confident/experienced in using this type of loop so a few inefficiencies arose from that. I found that I had to pass in 'value' as a 2nd arg into the loop, even though I never referred to it. However, without it, I wasn't accessing the key I wanted. Also, I was afraid of reaching my requisite password length in the middle of that loop and then not breaking out of it properly, seeing as I had that 'for' loop already inside a 'while' loop. To get around those concerns, I intentionally overshot the prescribed password length (if it wasn't equally divisble by the number of sets chosen) to cleanly complete the last time through the loop, then after I formed the password, I chopped off the excess characters. It works fine, but I feel it does add some unnecessary steps compared to just exiting the loop mid-iteration effectively.

Also, I noticed styling for a disabled button in the CSS; I chose not to disable the button after the password had been generated so that the user can just hit the button and run through the process again without reloading.

## Credits

The Fisher-Yates 'shuffle' algorithm, as well as Richard Durstenfeld for applying it to CS.

## License

MIT License (as referred to in the repo)