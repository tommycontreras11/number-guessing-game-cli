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
    time: "0:0:0",
  });
});

const getInput = async (question) => {
  return new Promise((resolve) => {
    process.stdout.write(question);

    process.stdin.once("data", (data) => {
      const input = data.toString().trim();

      resolve(input);
    });
  });
};

const retrieveTime = (time) => {
  const [hours, minutes, seconds] = time.split(":");

  return {
    hours: parseInt(hours),
    minutes: parseInt(minutes),
    seconds: parseInt(seconds),
  };
};

const validateTime = (lastTimeElapsed, timeElapsed) => {
  let newHour = 0,
    newMinute = 0,
    newSecond = 0;
  beatTime = false;

  if (
    lastTimeElapsed.hours > timeElapsed.hours ||
    lastTimeElapsed.hours === 0
  ) {
    newHour = timeElapsed.hours;
    beatTime = true;
  }

  if (
    lastTimeElapsed.minutes > timeElapsed.minutes ||
    lastTimeElapsed.minutes === 0
  ) {
    newMinute = timeElapsed.minutes;
    beatTime = true;
  }

  if (
    lastTimeElapsed.seconds > timeElapsed.seconds ||
    lastTimeElapsed.seconds === 0
  ) {
    newSecond = timeElapsed.seconds;
    beatTime = true;
  }

  return {
    newHour,
    newMinute,
    newSecond,
    beatTime,
  };
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
    won = false,
    continueGame = false,
    message = "";

  let numberGenerated = Math.floor(Math.random() * 100) + 1;

  let difficulty;

  while (!difficulty) {
    let input = parseInt(await getInput("Enter your choice: "));

    if (input >= 1 && input <= difficultyLevels.length) {
      difficulty = difficultyLevels[input - 1];
    } else {
      console.log("\nInvalid choice. Please, select a correct one\n");
    }
  }

  console.log(
    `\nGreat! You have selected the ${difficulty.level} difficulty level.`,
  );
  console.log("Let's start the game! \n");

  let startTime = Date.now();

  while (iteration < difficulty.chances) {
    let numberTyped = parseInt(await askNumber("Enter your guess: "));
    let isNumberHigherOrLower = numberTyped < numberGenerated ? true : false;

    if (numberTyped == numberGenerated) {
      let endTime = Date.now();
      let elapsedSeconds = (endTime - startTime) / 1000;

      let hours = Math.floor(elapsedSeconds / 3600);
      let minutes = Math.floor((elapsedSeconds % 3600) / 60);
      let seconds = Math.floor(elapsedSeconds % 60);

      let timeFormatted = `${hours}:${minutes}:${seconds}`;

      let userScoreIndex = userScores.findIndex(
        (userScore) => userScore.level == difficulty.level,
      );
      let userScore = userScores[userScoreIndex];

      let userLastTimeElapsed = userScore.time;
      let userLastTimeElapsedFormatted = retrieveTime(userLastTimeElapsed);

      let nowTimeElapsedFormatted = retrieveTime(timeFormatted);

      let { newHour, newMinute, newSecond, beatTime } = validateTime(
        userLastTimeElapsedFormatted,
        nowTimeElapsedFormatted,
      );

      if (attempts + 1 < userScore.attempts) {
        attempts++;
        userScore.attempts = attempts;
        userScore.time = timeFormatted;

        console.log(
          `\nCongratulations! You broke the last record in ${attempts} attempts in level ${userScore.level}.`,
        );

        console.log(
          `\nYou also beat your previous time by ${newHour}h ${newMinute}m ${newSecond}s.`,
        );

        return true;
      } else {
        attempts++;

        console.log(
          `\nCongratulations! You guessed the correct number in ${attempts} attempts in level ${userScore.level}.`,
        );

        if (beatTime) {
          if (userScore.attempts == 0) {
            console.log(
              `\nThe time it took you was ${newHour}h ${newMinute}m ${newSecond}s.\n`,
            );
          } else {
            console.log(
              `\nYou also beat your previous time by ${newHour}h ${newMinute}m ${newSecond}s.`,
            );
          }
        }

        if (userScore.attempts === 0) {
          userScore.attempts = attempts;
          userScore.time = timeFormatted;
        }
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

    continueGame = await getInput("Do you want to retry? (y/n): ");

    if (continueGame == "y" || continueGame == "yes") console.clear();
  }
  process.exit();
};

main();
