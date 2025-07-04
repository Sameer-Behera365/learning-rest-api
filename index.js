const express = require("express");
const app = express();
const users = require("./MOCK_DATA.json");
const PORT = 3000;

// Middleware to parse JSON (important for POST and PATCH)
app.use(express.json());

/**
 * Home route to show all user first names in HTML format
 */
app.get("/users", (req, res) => {
  const html = `
    <h1>All Users</h1>
    <ul> 
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
  `;
  res.send(html);
});

/**
 * GET: Get a user by ID (e.g. /api/users/5)
 */
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) return res.status(404).json({ error: "User not found" });

  return res.json(user);
});

/**
 * POST: Add a new user (dummy implementation)
 */
app.post("/api/users", (req, res) => {
  const newUser = req.body; // Assume body has { "id": 101, "first_name": "John", ... }
  users.push(newUser); // In real apps, you store it in DB
  return res.status(201).json({ message: "User added successfully", user: newUser });
});

/**
 * PATCH: Update an existing user by ID (dummy update for first_name only)
 */
app.patch("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) return res.status(404).json({ error: "User not found" });

  user.first_name = req.body.first_name || user.first_name;

  return res.json({ message: "User updated", user });
});

/**
 * DELETE: Remove user by ID
 */
app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) return res.status(404).json({ error: "User not found" });

  const deletedUser = users.splice(index, 1);

  return res.json({ message: "User deleted", user: deletedUser[0] });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
