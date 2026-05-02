const difficultyLevels = [
  {
    level: "Easy",
    chances: 10,
  },
  {
    level: "Medium",
    chances: 5,
  },
  {
    level: "Hard",
    chances: 3,
  },
];

let userScores = [];
difficultyLevels.forEach((difficultyLevel) => {
  userScores.push({
    level: difficultyLevel.level,
    attempts: 0,
  });
});

const askDifficultyLevel = async (question) => {
  return new Promise((resolve) => {
    process.stdout.write(question);

    process.stdin.once("data", (data) => {
      const input = data.toString().trim();
      const value = parseInt(input);

      resolve(difficultyLevels[value - 1]);
    });
  });
};

const askNumber = async (question) => {
  return new Promise((resolve) => {
    process.stdout.write(question);

    process.stdin.once("data", (data) => {
      const input = data.toString().trim();
      const value = parseInt(input);

      resolve(value);
    });
  });
};
const askRetry = async (question) => {
  return new Promise((resolve) => {
    process.stdout.write(question);

    process.stdin.once("data", (data) => {
      const input = data.toString().trim();

      resolve(input == "y" || input == "yes");
    });
  });
};

const game = async () => {
  console.log(`
Welcome to the Number Guessing Game!
I'm thinking of a number between 1 and 100.
You have 5 chances to guess the correct number.

Please select the difficulty level:
1. Easy (10 chances)
2. Medium (5 chances)
3. Hard (3 chances) \n`);

  let iteration = 0,
    attempts = 0,
    won = false;

  let numberGenerated = Math.floor(Math.random() * 100) + 1;

  let difficultyLevel = await askDifficultyLevel("Enter your choice: ");

  console.log(
    `\nGreat! You have selected the ${difficultyLevel.level} difficulty level.`,
  );
  console.log("Let's start the game! \n");

  console.log("Number generated: " + numberGenerated)

  while (iteration < difficultyLevel.chances) {
    let numberTyped = await askNumber("Enter your guess: ");
    let isNumberHigherOrLower = numberTyped < numberGenerated ? true : false;

    if (numberTyped == numberGenerated) {
      let userScoreIndex = userScores.findIndex(
        (userScore) => userScore.level == difficultyLevel.level,
      );
      let userScore = userScores[userScoreIndex];

      if ((attempts + 1) < userScore.attempts) {
        attempts++;
        userScore.attempts = attempts;

        console.log(
          `\nCongratulations! You broke the last record in ${attempts} attempts in level ${userScore.level}.`,
        );

        return true
      } else {
        attempts++;

        if(userScore.attempts === 0) userScore.attempts = attempts;

        console.log(
          `\nCongratulations! You guessed the correct number in ${attempts} attempts in level ${userScore.level}.`,
        );
      }

      return true;
    } else {
      console.log(
        `Incorrect! The number is ${isNumberHigherOrLower ? "greater" : "less"} than ${numberTyped}.\n`,
      );
      iteration++;
    }

    attempts++;
  }

  console.log(`You ran out of chances. The number was ${numberGenerated}. \n`);
  return false;
};

const cleanInputs = (iteration, attempts, won) => {
  ((iteration = 0), (attempts = 0), (won = false));
};

const main = async () => {
  let continueGame = true;

  while (continueGame) {
    await game();

    continueGame = await askRetry("Do you want to retry? (y/n): ");

    if (continueGame) console.clear();
  }
  process.exit();
};

main();
