var express = require("express");
var router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ensureLoggedIn = require("../ensureLoggedIn");

/* GET home page. */
router.get("/", ensureLoggedIn, async function (req, res) {
  const username = req.user.username;

  const dbUser = await prisma.user.findUnique({
    where: {
      username: username,
    },
    include: {
      workoutLogs: true,
    },
  });

  res.render("dashboard", {
    title: "The Workout Tracker - Dashboard",
    isAuthenticated: req.isAuthenticated(),
    user: dbUser
  });
});

module.exports = router;
