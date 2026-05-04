const difficultyLevels = [
  { level: "Easy", chances: 10 },
  { level: "Medium", chances: 5 },
  { level: "Hard", chances: 3 },
];

const userScores = difficultyLevels.map(({ level }) => ({
  level,
  attempts: 0,
  time: "0:0:0",
}));

const getInput = (question) =>
  new Promise((resolve) => {
    process.stdout.write(question);
    process.stdin.once("data", (data) => {
      resolve(data.toString().trim());
    });
  });

const parseTime = (time) => {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return { hours, minutes, seconds };
};

const formatElapsedTime = (startTime) => {
  const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);

  const hours = Math.floor(elapsedSeconds / 3600);
  const minutes = Math.floor((elapsedSeconds % 3600) / 60);
  const seconds = elapsedSeconds % 60;

  return `${hours}:${minutes}:${seconds}`;
};

const isBetterTime = (previousTime, currentTime, previousAttempts) => {
  if (previousAttempts === 0) return true;

  const previous =
    previousTime.hours * 3600 +
    previousTime.minutes * 60 +
    previousTime.seconds;

  const current =
    currentTime.hours * 3600 +
    currentTime.minutes * 60 +
    currentTime.seconds;

  return current < previous;
};

const getDifficulty = async () => {
  while (true) {
    const input = Number(await getInput("Enter your choice: "));

    if (input >= 1 && input <= difficultyLevels.length) {
      return difficultyLevels[input - 1];
    }

    console.log("\nInvalid choice. Please select a correct one.\n");
  }
};

const getValidGuess = async () => {
  while (true) {
    const guess = Number(await getInput("Enter your guess: "));

    if (!Number.isNaN(guess)) {
      return guess;
    }

    console.log("\nThe number is required.\n");
  }
};

const updateScore = ({ userScore, attempts, timeFormatted }) => {
  const currentAttempts = attempts + 1;
  const previousTime = parseTime(userScore.time);
  const currentTime = parseTime(timeFormatted);

  const fewerAttempts =
    userScore.attempts === 0 || currentAttempts < userScore.attempts;

  const fasterTime = isBetterTime(
    previousTime,
    currentTime,
    userScore.attempts,
  );

  if (fewerAttempts) {
    userScore.attempts = currentAttempts;
  }

  if (fasterTime) {
    userScore.time = timeFormatted;
  }

  return {
    userScore,
    currentAttempts,
    currentTime,
    fewerAttempts,
    fasterTime,
  };
};

const printWinMessage = ({
  currentAttempts,
  userScore,
  currentTime,
  fewerAttempts,
  fasterTime,
}) => {
  if (fewerAttempts && userScore.attempts !== 0) {
    console.log(
      `\nCongratulations! You broke the last record in ${currentAttempts} attempts in level ${userScore.level}.\n`,
    );
  } else {
    console.log(
      `\nCongratulations! You guessed the correct number in ${currentAttempts} attempts in level ${userScore.level}.\n`,
    );
  }

  if (fasterTime && userScore.attempts !== 0) {
    console.log(
      `You also beat your previous time with ${currentTime.hours}h ${currentTime.minutes}m ${currentTime.seconds}s.\n`,
    );
  } else {
    console.log(
      `The time it took you was ${currentTime.hours}h ${currentTime.minutes}m ${currentTime.seconds}s.\n`,
    );
  }
};

const game = async () => {
  console.log(`
Welcome to the Number Guessing Game!
I'm thinking of a number between 1 and 100.

Please select the difficulty level:
1. Easy (10 chances)
2. Medium (5 chances)
3. Hard (3 chances)
`);

  const difficulty = await getDifficulty();

  console.log(
    `\nGreat! You have selected the ${difficulty.level} difficulty level.`,
  );
  console.log("Let's start the game!\n");

  const target = Math.floor(Math.random() * 100) + 1;
  const startTime = Date.now();

  for (let attempts = 0; attempts < difficulty.chances; attempts++) {
    const guess = await getValidGuess();

    if (guess === target) {
      const userScore = userScores.find(
        (score) => score.level === difficulty.level,
      );

      const timeFormatted = formatElapsedTime(startTime);

      const result = updateScore({
        userScore,
        attempts,
        timeFormatted,
      });

      printWinMessage(result);

      return true;
    }

    console.log(
      `Incorrect! The number is ${guess < target ? "greater" : "less"} than ${guess}.\n`,
    );
  }

  console.log(`You ran out of chances. The number was ${target}.\n`);
  return false;
};

const main = async () => {
  let continueGame = true;

  while (continueGame) {
    await game();

    const answer = (await getInput("Do you want to retry? (y/n): "))
      .toLowerCase()
      .trim();

    continueGame = answer === "y" || answer === "yes";

    if (continueGame) {
      console.clear();
    }
  }

  process.exit();
};

main();