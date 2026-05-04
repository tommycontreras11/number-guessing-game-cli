# 🎯 Number Guessing Game CLI

**Project URL:** https://roadmap.sh/projects/number-guessing-game

A simple command-line interface (CLI) game where the computer randomly selects a number between 1 and 100, and the player must guess it within a limited number of attempts based on the selected difficulty level.

---

## 🚀 Features

- Three difficulty levels with different attempt limits
- Random number generation between 1 and 100
- Interactive terminal input
- Input validation for difficulty selection and guesses
- Hints after incorrect guesses (greater or less)
- Tracks attempts made during each round
- Measures elapsed time for successful guesses
- Stores best score per difficulty level
- Detects when a player beats their previous record
- Replay support without restarting the program

---

## 📦 Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd number-guessing-game
```

2. Make sure you are using Node.js (v18+ recommended).

---

## ▶️ Usage

Run the game:

```bash
node index.js
```

---

## 🧠 How to Play

1. Choose a difficulty level.
2. The game generates a random number between **1 and 100**.
3. Enter your guesses.
4. After each incorrect guess, the game will tell you whether the number is **greater** or **less**.
5. If you guess correctly before running out of chances, you win.

---

## 🎚 Difficulty Levels

| Level  | Chances |
|--------|---------|
| Easy   | 10      |
| Medium | 5       |
| Hard   | 3       |

---

## ✨ Example Gameplay

```bash
Welcome to the Number Guessing Game!
I'm thinking of a number between 1 and 100.

Please select the difficulty level:
1. Easy (10 chances)
2. Medium (5 chances)
3. Hard (3 chances)

Enter your choice: 2

Great! You have selected the Medium difficulty level.
Let's start the game!

Enter your guess: 40
Incorrect! The number is greater than 40.

Enter your guess: 70
Incorrect! The number is less than 70.

Enter your guess: 56

Congratulations! You guessed the correct number in 3 attempts in level Medium.

The time it took you was 0h 0m 8s.
```

---

## 🧾 Record Tracking

The game stores the best result for each difficulty level during execution.

Each record includes:

- Minimum number of attempts
- Best completion time

If a player performs better than the previous record, the game notifies them.

Example:

```bash
Congratulations! You broke the last record in 2 attempts in level Hard.

You also beat your previous time with 0h 0m 5s.
```

---

## 🧠 How It Works

- Reads user input directly from the terminal using `stdin`
- Uses `Math.random()` to generate a number between `1` and `100`
- Validates:
  - Difficulty selection
  - Numeric guesses
  - Required input
- Tracks elapsed time from the first valid guess
- Compares current performance against previous best records
- Stores score data in memory during program execution

---

## ⚠️ Notes

- Scores are stored **only while the program is running**
- Closing the application resets all records
- Only numeric values are accepted as guesses
- Invalid difficulty selections will prompt the user again
- The game starts timing from the first valid guess

---

## 🔁 Replay

After each round, the program asks whether you want to play again:

```bash
Do you want to retry? (y/n):
```

---

## 💡 Future Improvements (Ideas)

- Persist scores in a JSON file
- Display a leaderboard
- Add player names
- Add custom difficulty levels
- Improve terminal styling with `chalk`
- Add interactive prompts with `inquirer`
- Show statistics across multiple games
- Add unit tests

---

## 🧑‍💻 Author

Tommy Contreras

---

## 📄 License

MIT
