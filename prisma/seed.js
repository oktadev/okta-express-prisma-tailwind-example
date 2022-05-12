const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

require("dotenv").config();

async function main() {
  const user = await prisma.user.upsert({
    where: { username: process.env.SEED_USER_NAME },
    update: {},
    create: {
      username: process.env.SEED_USER_NAME,
      workoutLogs: {
        create: [
          {
            exercise: "Running",
            amount: 1,
            units: "Miles",
            date: new Date(2022, 1, 1),
            minutes: 8,
            calories: 100
          },
          {
            exercise: "Running",
            amount: 1.2,
            units: "Miles",
            date: new Date(2022, 1, 3),
            minutes: 10,
            calories: 120
          },
          {
            exercise: "Running",
            amount: 1.5,
            units: "Miles",
            date: new Date(2022, 1, 5),
            minutes: 12,
            calories: 150
          },
          {
            exercise: "Heavy Bag",
            amount: 4,
            units: "Rounds",
            date: new Date(2022, 1, 1),
            minutes: 15,
            calories: 100
          },
          {
            exercise: "Heavy Bag",
            amount: 6,
            units: "Rounds",
            date: new Date(2022, 1, 3),
            minutes: 22,
            calories: 150
          },
          {
            exercise: "Heavy Bag",
            amount: 4,
            units: "Rounds",
            date: new Date(2022, 1, 5),
            minutes: 15,
            calories: 100
          },
          {
            exercise: "Situps",
            amount: 50,
            units: "Reps",
            date: new Date(2022, 1, 2),
            minutes: 5,
            calories: 50
          },
          {
            exercise: "Pushups",
            amount: 100,
            units: "Reps",
            date: new Date(2022, 1, 2),
            minutes: 10,
            calories: 100
          },
          {
            exercise: "Situps",
            amount: 50,
            units: "Reps",
            date: new Date(2022, 1, 4),
            minutes: 5,
            calories: 50
          },
          {
            exercise: "Pushups",
            amount: 100,
            units: "Reps",
            date: new Date(2022, 1, 4),
            minutes: 10,
            calories: 100
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
