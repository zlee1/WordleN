import json
import random

def get_words(word_len):
    """Get dictionary of all words for given length.

    Parameters:
        word_len (int): length of the target word
    """
    try:
        # Load the appropriate json file into a dictionary and return it
        return dict(json.loads(open(f"data/generated/word_set_{word_len}.json", "r").read()))
    except Exception:
        return None

def pick_word(words):
    """Pick a word from the list of potential options.

    Parameters:
        words (dict): list of words with given length
    """
    # Choose a random word from the possible answer set
    return random.choice(list(words["answers"]))

def guess_info(guess, word):
    """Get information about the guess. Return list of colors for each position.
    Green means the guessed letter is in the word and in correct position.
    Yellow means the guessed letter is in the word but in the wrong position.
    Gray means the guessed letter is not in the word.

    Parameters:
        guess (str): user's guess of the word
        word (str): actual correct answer
    """
    # Initialize all colors to gray
    colors = ["gray"]*len(word)
    # Keep track of letters that have been confirmed/used
    used_letters = []

    # Set color to green if letter is fully correct
    for i in range(len(guess)):
        if(guess[i] == word[i]):
            colors[i] = "green"
            used_letters.append(guess[i])

    # Handle yellow checking
    for i in range(len(guess)):
        # If the current letter is in the word and is not green, continue
        if(guess[i] in word and colors[i] == "gray"):
            # If the letter has already been used, continue
            if(guess[i] in used_letters):
                # Count the number of times the letter occurs in the word and in
                # the list of used letters.
                w_count = 0
                u_count = 0
                for j in word:
                    if(j == guess[i]):
                        w_count += 1
                for j in used_letters:
                    if(j == guess[i]):
                        u_count += 1

                # If there are more instances of the letter in the word than in
                # the list of used letters, the color should be changed to yellow.
                if(w_count > u_count):
                    colors[i] = "yellow"
                    used_letters.append(guess[i])
            # If the letter has not already been used, set the color to yellow
            else:
                colors[i] = "yellow"
                used_letters.append(guess[i])
    return colors


def wordle(word_len, num_guesses):
    """Play Wordle.

    Parameters:
        word_len (int): length of the words used
        num_guesses (int): total number of guesses allowed
    """
    # Get the words list
    words = get_words(word_len)
    # If the words list does not exist, exit
    if(words is None):
        print("Error. Word list does not exist.")
        return None

    # Pick a word
    word = pick_word(words)

    guess = None
    g = 0
    # Continue while the word has not been guessed and the number of used guesses
    # is not greater than the number of allowed guesses
    while(guess != word and g <= num_guesses):
        guess = input("Enter your guess: ")

        # If the guess is a legal word, continue
        if(guess in words["legal"]):
            g += 1
            # Output the guess info
            print(guess_info(guess, word))
        else:
            print("Illegal guess.")

    # Output whether the word was correctly guessed or not
    if(guess == word):
        print("Correct!")
    else:
        print(f"Out of guesses. Word was: {word}")

def run_game():
    """Start the game and take letter count and guess count inputs"""
    word_len = int(input("How many letters in each word do you want? (3 - 10): "))
    num_guesses = int(input("How many guesses do you want? (>= 1): "))
    wordle(word_len, num_guesses)


if __name__ == "__main__":
    run_game()
