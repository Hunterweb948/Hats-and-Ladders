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

// ===== Events =====
const EVENTS = [
  // ===== FINANCIAL AID EVENTS =====
  {
    id: 1,
    title: "FAFSA/TAP Helpdesk - Virtual Mondays",
    category: "Financial Aid",
    date: "Mondays",
    time: "Various times",
    location: "Virtual - Zoom",
    organizer: "Hunter Financial Aid Office",
    desc: "Drop in for help with your FAFSA/TAP. Get your questions answered quickly by our Financial Aid staff. RSVP not required. Join virtual meeting at scheduled date/time.",
    keywords: ["fafsa", "tap", "financial aid", "virtual", "helpdesk", "zoom", "monday"],
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
    desc: "Drop in for help with your FAFSA/TAP. Get your questions answered quickly by our Financial Aid staff.",
    keywords: ["fafsa", "tap", "financial aid", "in-person", "helpdesk", "wednesday"],
    type: "helpdesk",
    format: "in-person",
    audience: "all-students",
    xpPoints: 100
  },

  // ===== ARTS & CULTURE EVENTS =====
  {
    id: 3,
    title: "Arts Outing: Madama Butterfly at the Met Opera",
    category: "Arts & Culture",
    date: "Check website for dates",
    time: "Meet at 10:00 AM",
    location: "Metropolitan Opera & Hunter College",
    organizer: "Hunter Office of the Arts",
    desc: "Join Hunter students for a special outing at the Met Opera to experience Giacomo Puccini's iconic opera Madama Butterfly. The Office of the Arts has purchased a limited number of tickets for students.",
    keywords: ["arts", "opera", "met opera", "madama butterfly", "outing", "cultural", "performance"],
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
    desc: "Join Hunter students for a special outing at the Met Opera to experience Giuseppe Verdi's iconic opera La Traviata.",
    keywords: ["arts", "opera", "met opera", "la traviata", "outing", "cultural", "verdi"],
    type: "outing",
    format: "in-person",
    audience: "undergraduate",
    xpPoints: 150
  },
  {
    id: 5,
    title: "We the People: An Assembly of New York Artists",
    category: "Arts & Culture",
    date: "Check website for date",
    time: "To be announced",
    location: "Hunter College",
    organizer: "Hunter College Office of the Arts",
    desc: "The Hunter College Office of the Arts invites all New York artists and arts workers to speak out at this public assembly.",
    keywords: ["arts", "assembly", "artists", "new york", "public forum", "arts workers"],
    type: "forum",
    format: "in-person",
    audience: "all-students",
    xpPoints: 100
  },

  // ===== PROFESSIONAL EVENTS =====
  {
    id: 6,
    title: "Spring 2026 HEO Forum Meeting",
    category: "Professional",
    date: "Spring 2026",
    time: "To be announced",
    location: "Hunter College",
    organizer: "HEO Forum",
    desc: "Professional development meeting with various speakers from Hunter College administration.",
    keywords: ["heo", "forum", "professional", "meeting", "administration", "spring"],
    type: "meeting",
    format: "in-person",
    audience: "all-students",
    xpPoints: 125
  },

  // ===== GRADUATE PROGRAM EVENTS =====
  {
    id: 7,
    title: "MS-IPND Graduate Nutrition Program Information Sessions",
    category: "Graduate Programs",
    date: "Multiple dates (Jan-Aug)",
    time: "Various times (12pm, 1pm, 6pm)",
    location: "Online",
    organizer: "Hunter College Nutrition Program",
    desc: "Join us for an information session re: our Graduate Nutrition tracks Integrated Program in Nutrition and Dietetics (IPND); Focus Study ONLINE Sessions",
    keywords: ["nutrition", "dietetics", "graduate", "information session", "ms-ipnd", "online"],
    type: "info-session",
    format: "virtual",
    audience: "prospective",
    xpPoints: 80
  },
  {
    id: 8,
    title: "Graduate Nursing Information Session",
    category: "Graduate Programs",
    date: "Check website for dates",
    time: "To be announced",
    location: "Hunter College",
    organizer: "Hunter College Nursing Program",
    desc: "This information session is tailored for prospective students interested in the master's, advanced certificate, and DNP specialties.",
    keywords: ["nursing", "graduate", "information session", "in-person", "dnp", "master's"],
    type: "info-session",
    format: "in-person",
    audience: "prospective",
    xpPoints: 80
  },

  // ===== ALUMNI EVENTS =====
  {
    id: 9,
    title: "Hunter Alumni and Friends Networking Social – Tampa",
    category: "Alumni",
    date: "Check website for date",
    time: "Evening",
    location: "Luna Lounge at Bulla Gastrobar, Tampa, FL",
    organizer: "Hunter College Alumni Affairs",
    desc: "Celebrate, Connect & Enjoy the Coastal Vibes! Hunter's Back in the Bay – Let's Toast to Year Two! Join your fellow alumni in Tampa for our second annual Alumni Social.",
    keywords: ["alumni", "tampa", "networking", "social", "florida", "reunion"],
    type: "social",
    format: "in-person",
    audience: "alumni",
    xpPoints: 200
  },
  {
    id: 10,
    title: "Hunter Alumni and Friends Networking Social – Orlando",
    category: "Alumni",
    date: "Check website for date",
    time: "Evening",
    location: "Orlando, FL",
    organizer: "Hunter College Alumni Affairs",
    desc: "Hunter + Orlando = A Magical Night! With more than 1,500 alumni and friends in Orlando, this is your chance to reconnect, mingle, reminisce, and celebrate.",
    keywords: ["alumni", "orlando", "networking", "social", "florida", "reunion"],
    type: "social",
    format: "in-person",
    audience: "alumni",
    xpPoints: 200
  },

  // ===== ACADEMIC & LECTURE EVENTS =====
  {
    id: 11,
    title: "Promoting Civil Discourse & Intellectual Dialogue Series - States of Incarceration",
    category: "Academic",
    date: "Check website for date",
    time: "To be announced",
    location: "Hunter College",
    organizer: "Hunter College",
    desc: "States of Incarceration: Connecting Stories of Immigration Detention and Mass Incarceration and the Movements Against Them.",
    keywords: ["civil discourse", "incarceration", "immigration", "lecture", "dialogue", "academic"],
    type: "lecture",
    format: "in-person",
    audience: "all-students",
    xpPoints: 120
  },
  {
    id: 12,
    title: "Promoting Civil Discourse & Intellectual Dialogue Series - The Future of Conversion Therapy Bans in the US",
    category: "Academic",
    date: "Check website for date",
    time: "To be announced",
    location: "Hunter College",
    organizer: "Hunter College",
    desc: "The Future of Conversion Therapy Bans in the US. Over the last several years, 23 states have barred licensed mental health professionals from providing conversion therapy.",
    keywords: ["civil discourse", "conversion therapy", "lgbtq", "lecture", "dialogue", "academic"],
    type: "lecture",
    format: "in-person",
    audience: "all-students",
    xpPoints: 120
  },
  {
    id: 13,
    title: "Study Abroad Fair",
    category: "Academic",
    date: "Check website for date",
    time: "To be announced",
    location: "Hunter College",
    organizer: "Hunter College Study Abroad Office",
    desc: "Are you interested in exploring the world that lies beyond the classroom? Join us at the Hunter College Annual Study Abroad Fair to learn about hundreds of opportunities!",
    keywords: ["study abroad", "international", "fair", "travel", "education abroad", "academic"],
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
