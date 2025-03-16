const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
 
const router = express.Router();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files

// ✅ Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Update if using another user
  password: "", // Add MySQL password if needed
  database: "gm_advocates_db", // Ensure correct DB name
});

// ✅ Check DB Connection
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed: " + err.message);
  } else {
    console.log("✅ Connected to MySQL Database");
  }
});

// ✅ Multer Configuration for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Files will be saved in the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post("/api/register", { name, email, password });
    navigate("/login");
  } catch (err) {
    if (err.response && err.response.data && err.response.data.error) {
      setError(err.response.data.error); // Display backend error
    } else {
      setError("Registration failed. Please check your details and try again.");
    }
  }
};



// Fetch all appointments
app.get("/api/appointments", (req, res) => {
  db.query("SELECT * FROM appointments", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
});

// Update appointment status
app.put("/api/appointments/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  db.query("UPDATE appointments SET status = ? WHERE id = ?", [status, id], (err) => {
    if (err) return res.status(500).json({ error: "Update failed" });
    res.json({ message: "Appointment updated successfully" });
  });
});

// Delete an appointment
app.delete("/api/appointments/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM appointments WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Delete failed" });
    res.json({ message: "Appointment deleted successfully" });
  });
});

// ✅ Fetch All Articles
app.get("/api/articles", (req, res) => {
  db.query("SELECT * FROM articles", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post("/api/register", async (req, res) => {
  try {
      const { username, email, password, role = "subscriber" } = req.body; // Default role

      if (!username || !email || !password) {
          return res.status(400).json({ error: "All fields are required." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const sql = "INSERT INTO system_users (username, email, password_hash, role) VALUES (?, ?, ?, ?)";
      db.query(sql, [username, email, hashedPassword, role], (err, result) => {
          if (err) {
              console.error("Database Error:", err);
              return res.status(500).json({ error: "Database error. Try again." });
          }
          res.json({ message: "User registered successfully!" });
      });
  } catch (error) {
      console.error("Server Error:", error);
      res.status(500).json({ error: "Server error. Try again." });
  }
});   

router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const sql = "SELECT * FROM system_users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Server error. Try again." });
    }

    if (results.length === 0) {
      console.log("User Not Found:", email);
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const user = results[0];

    console.log("Entered Password:", password);
    console.log("Stored Hash:", user.password_hash);

    // Check if password hash is missing or invalid
    if (!user.password_hash || user.password_hash.length < 10) {
      console.error("Invalid password hash for user:", email);
      return res.status(500).json({ error: "Invalid password data. Contact support." });
    }

    try {
      const isMatch = await bcrypt.compare(password, user.password_hash);
      console.log("Password Match:", isMatch);

      if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password." });
      }

      // Generate JWT Token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || "your_secret,_key",
        { expiresIn: "1h" }
      );

      res.json({ message: "Login successful", token, user });
    } catch (error) {
      console.error("Error comparing passwords:", error);
      res.status(500).json({ error: "Server error. Try again." });
    }
  });
});


module.exports = router;


// ✅ Fetch a Single Article by ID
app.get("/api/articles/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM articles WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.json(results[0]); // Return the first (and only) matching article
  });
});


// ✅ Fetch All Appointments
app.get("/api/appointments", (req, res) => {
  db.query("SELECT * FROM appointments", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});



// ✅ Fetch All System Users
app.get("/api/system-users", (req, res) => {
  const sql = "SELECT * FROM system_users";
  
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// ✅ Fetch a Single System User by ID
app.get("/api/system-users/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM system_users WHERE id = ?";
  
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(results[0]);
  });
});

// ✅ Add a New System User
app.post("/api/system-users", (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "INSERT INTO system_users (username, email, password, role) VALUES (?, ?, ?, ?)";
  const values = [username, email, password, role];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ id: result.insertId, username, email, role });
  });
});

// ✅ Update a System User
app.put("/api/system-users/:id", (req, res) => {
  const { id } = req.params;
  const { username, email, role } = req.body;

  if (!username || !email || !role) {
    return res.status(400).json({ error: "Username, email, and role are required" });
  }

  const sql = "UPDATE system_users SET username = ?, email = ?, role = ? WHERE id = ?";
  const values = [username, email, role, id];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated successfully" });
  });
});

// ✅ Delete a System User
app.delete("/api/system-users/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM system_users WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  });
});
// ✅ Add a New Article
app.post("/api/articles", (req, res) => {
  const { title, author, date, image, description } = req.body;

  if (!title || !author || !date || !description) {
    return res.status(400).json({ error: "Title, author, date, and description are required" });
  }

  const sql = "INSERT INTO articles (title, author, date, image, description) VALUES (?, ?, ?, ?, ?)";
  const values = [title, author, date, image, description];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, title, author, date, image, description });
  });
});

// ✅ Update an Article
app.put("/api/articles/:id", (req, res) => {
  const { title, author, date, image, description } = req.body;
  const { id } = req.params;

  if (!title || !author || !date || !description) {
    return res.status(400).json({ error: "Title, author, date, and description are required" });
  }

  const sql = "UPDATE articles SET title = ?, author = ?, date = ?, image = ?, description = ? WHERE id = ?";
  const values = [title, author, date, image, description, id];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.json({ id, title, author, date, image, description });
  });
});

// ✅ Delete an Article
app.delete("/api/articles/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM articles WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.json({ message: "Article deleted successfully" });
  });
});


// ✅ Fetch All Team Members
app.get("/api/team-members", (req, res) => {
  db.query("SELECT * FROM team_members", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ✅ Fetch a Specific Team Member by Name
app.get("/api/team-members/:name", (req, res) => {
  const teamMemberName = req.params.name.replace("-", " ");

  db.query("SELECT * FROM team_members WHERE full_name = ?", [teamMemberName], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ error: "Team member not found" });
    }

    res.json(results[0]);
  });
});

// ✅ Add a New Team Member with File Upload
app.post("/api/team-members", upload.single("profile_picture"), (req, res) => {
  const { full_name, position, email, phone, bio } = req.body;
  const profile_picture = req.file ? `/uploads/${req.file.filename}` : null;

  if (!full_name || !position || !email) {
    return res.status(400).json({ error: "Full name, position, and email are required" });
  }

  const sql =
    "INSERT INTO team_members (full_name, position, email, phone, bio, profile_picture) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [full_name, position, email, phone, bio, profile_picture];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ id: result.insertId, full_name, position, email, phone, bio, profile_picture });
  });
});

// ✅ Update a Team Member with File Upload
app.put("/api/team-members/:id", upload.single("profile_picture"), (req, res) => {
  const { full_name, position, email, phone, bio } = req.body;
  const { id } = req.params;
  const profile_picture = req.file ? `/uploads/${req.file.filename}` : req.body.profile_picture;

  if (!full_name || !position || !email) {
    return res.status(400).json({ error: "Full name, position, and email are required" });
  }

  const sql =
    "UPDATE team_members SET full_name = ?, position = ?, email = ?, phone = ?, bio = ?, profile_picture = ? WHERE id = ?";
  const values = [full_name, position, email, phone, bio, profile_picture, id];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Team member not found" });
    }

    res.json({ id, full_name, position, email, phone, bio, profile_picture });
  });
});

// ✅ Delete a Team Member
app.delete("/api/team-members/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM team_members WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Team member not found" });
    }

    res.json({ message: "✅ Team member deleted successfully" });
  });
});
// ✅ Fetch System Reports (Optimized)
app.get("/api/reports", async (req, res) => {
  try {
    const queries = [
      { name: "users", query: "SELECT COUNT(*) AS count FROM system_users" },
      { name: "articles", query: "SELECT COUNT(*) AS count FROM articles" },
      { name: "appointments", query: "SELECT COUNT(*) AS count FROM appointments" },
      { name: "team_members", query: "SELECT COUNT(*) AS count FROM team_members" }
    ];

    const results = await Promise.all(
      queries.map(q => 
        new Promise((resolve, reject) => {
          db.query(q.query, (err, result) => {
            if (err) reject(err);
            else resolve({ [q.name]: result[0].count });
          });
        })
      )
    );

    const formattedResults = results.reduce((acc, item) => ({ ...acc, ...item }), {});
    res.json(formattedResults);

  } catch (error) {
    res.status(500).json({ error: "❌ Failed to fetch reports" });
  }
});

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("✅ GM Advocates API is running...");
});

// ✅ Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});