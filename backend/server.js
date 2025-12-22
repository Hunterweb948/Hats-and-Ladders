const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Test route (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("Hats & Ladders backend is running 🎩🪜");
});

// ===== Mock data =====
const EVENTS = [
  {
    id: 1,
    title: "FAFSA Help Desk",
    category: "Financial Aid",
    xpPoints: 75,
    date: "Check website for date",
    time: "TBA",
    location: "TBA",
    organizer: "Hunter College",
    format: "in-person",
    type: "helpdesk",
  },
  {
    id: 2,
    title: "Study Abroad Fair",
    category: "Academic",
    xpPoints: 90,
    date: "Check website for date",
    time: "TBA",
    location: "TBA",
    organizer: "Hunter College",
    format: "in-person",
    type: "fair",
  },
];

const users = {
  "1": {
    interests: ["Academic", "Financial Aid"],
    xp: 0,
    rsvps: []
  }
};


// ===== API Routes =====
app.get("/events", (req, res) => {
  res.json(EVENTS);
});

app.post("/rsvp", (req, res) => {
  const { eventId, userId } = req.body;

  // 1) find user
  const user = users[String(userId)];
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // 2) find event
  const event = EVENTS.find(e => e.id === Number(eventId));
  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }

  // 3) prevent double RSVP
  const eventIdNum = Number(eventId);
  if (user.rsvps.includes(eventIdNum)) {
    return res.status(400).json({ error: "Already RSVPed" });
  }

  // 4) award XP + save RSVP
  user.xp += event.xpPoints;
  user.rsvps.push(eventIdNum);

  // 5) respond
  res.json({
    message: "RSVP successful",
    eventId: eventIdNum,
    userId,
    xpEarned: event.xpPoints,
    totalXp: user.xp
  });
});




app.get("/recommendations/:userId", (req, res) => {
  const user = users[req.params.userId];
  if (!user) return res.status(404).json({ error: "User not found" });

  const recommended = EVENTS.filter(e =>
    user.interests.includes(e.category)
  );

  res.json(recommended.slice(0, 3));
});

app.get("/users/:userId", (req, res) => {
  const user = users[req.params.userId];
  if (!user) return res.status(404).json({ error: "User not found" });

  res.json(user);
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
