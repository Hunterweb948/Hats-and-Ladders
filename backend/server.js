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

const EVENTS = [
  {
    id: 1,
    title: "FAFSA/TAP Helpdesk - Virtual Mondays",
    category: "Financial Aid",
    date: "Mondays",
    time: "Various times",
    location: "Virtual - Zoom",
    organizer: "Hunter Financial Aid Office",
    desc: "Drop in for help with your FAFSA/TAP. Get your questions answered quickly by our Financial Aid staff.",
    keywords: ["fafsa", "tap", "financial aid", "virtual"],
    type: "helpdesk",
    format: "virtual",
    audience: "all-students",
    xpPoints: 75
  },
  {
    id: 2,
    title: "FAFSA/TAP Helpdesk In-person Wednesdays",
    category: "Financial Aid",
    date: "Wednesdays",
    time: "Various times",
    location: "Financial Aid Office",
    organizer: "Hunter Financial Aid Office",
    desc: "Drop in for help with your FAFSA/TAP in person.",
    keywords: ["fafsa", "tap", "financial aid"],
    type: "helpdesk",
    format: "in-person",
    audience: "all-students",
    xpPoints: 100
  },
  {
    id: 3,
    title: "Arts Outing: Madama Butterfly at the Met Opera",
    category: "Arts & Culture",
    date: "Check website for dates",
    time: "Meet at 10:00 AM",
    location: "Metropolitan Opera",
    organizer: "Hunter Office of the Arts",
    desc: "Experience Puccini's Madama Butterfly with Hunter students.",
    keywords: ["opera", "arts"],
    type: "outing",
    format: "in-person",
    audience: "undergraduate",
    xpPoints: 150
  },
  {
    id: 4,
    title: "Arts Outing: La Traviata at the Met Opera",
    category: "Arts & Culture",
    date: "Check website for dates",
    time: "Performance time varies",
    location: "Metropolitan Opera",
    organizer: "Hunter Office of the Arts",
    desc: "Experience Verdi's La Traviata with Hunter students.",
    keywords: ["opera", "arts"],
    type: "outing",
    format: "in-person",
    audience: "undergraduate",
    xpPoints: 150
  },
  {
    id: 5,
    title: "Study Abroad Fair",
    category: "Academic",
    date: "Check website for date",
    time: "To be announced",
    location: "Hunter College",
    organizer: "Hunter College Study Abroad Office",
    desc: "Learn about study abroad opportunities.",
    keywords: ["study abroad", "academic"],
    type: "fair",
    format: "in-person",
    audience: "undergraduate",
    xpPoints: 90
  }
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


// Get user profile
app.get("/users/:id", (req, res) => {
  const user = users[req.params.id];

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});


// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
