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
app.use(cors({ origin: "https://home.gmorinaadvocates.org", credentials: true }));
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

app.use("/uploads", express.static("uploads"));





// ✅ Fetch All Articles
app.get("/api/articles", (req, res) => {
  db.query("SELECT * FROM articles", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

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

// ✅ Add a New Article with Image Upload
app.post("/api/articles", upload.single("image"), (req, res) => {
  const { title, author, date, description } = req.body;
  const image = req.file ? req.file.filename : null; // Save only the filename

  db.query(
    "INSERT INTO articles (title, author, date, image, description) VALUES (?, ?, ?, ?, ?)",
    [title, author, date, image, description],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ id: result.insertId, title, author, date, image, description });
    }
  );
});

// ✅ Update an Article (With Image Upload)
app.put("/api/articles/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { title, author, date, description } = req.body;
  const image = req.file ? req.file.filename : req.body.image; // Keep existing image if none uploaded

  db.query(
    "UPDATE articles SET title = ?, author = ?, date = ?, image = ?, description = ? WHERE id = ?",
    [title, author, date, image, description, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Article not found" });
      }

      res.json({ message: "Article updated successfully" });
    }
  );
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
app.post("/api/system-users", async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO system_users (username, email, password, role) VALUES (?, ?, ?, ?)";
    const values = [username, email, hashedPassword, role];

    db.query(sql, values, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ id: result.insertId, username, email, role });
    });
  } catch (error) {
    res.status(500).json({ error: "Error hashing password", details: error.message });
  }
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




// ✅ Add a New Article with Image Upload
app.post("/api/articles", upload.single("image"), (req, res) => {
  const { title, author, date, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null; // Save image path
  

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

// ✅ Update an Article (Including Image)
app.put("/api/articles/:id", upload.single("image"), (req, res) => {
  const { title, author, date, description } = req.body;
  const { id } = req.params;
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image; // Keep old image if no new image

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

// ✅ User Login Route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  const sql = "SELECT * FROM system_users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ success: false, message: "Database error", error: err.message });
    }

    if (results.length === 0) {
      console.warn("User not found:", email);
      return res.status(401).json({ success: false, message: "User not found" });
    }

    const user = results[0];
    console.log("User found:", user);

    try {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password match result:", isMatch);

      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

      // ✅ Fix: Include `username` in the JWT Token
      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email, role: user.role }, // 🔥 Added username
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({ 
        success: true, 
        token, 
        user: { id: user.id, username: user.username, email: user.email, role: user.role } // 🔥 Added username
      });
    } catch (error) {
      console.error("Error verifying password:", error.message);
      return res.status(500).json({ success: false, message: "Error verifying password", error: error.message });
    }
  });
});

// ✅ Manage Practice Areas

// 🔹 Get All Practice Areas
app.get("/api/practice-areas", (req, res) => {
  db.query("SELECT * FROM practice_areas", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// 🔹 Get Single Practice Area by ID
app.get("/api/practice-areas/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM practice_areas WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
});

// 🔹 Add New Practice Area
app.post("/api/practice-areas", upload.single("image"), (req, res) => {
  const { title, description, areas_of_focus } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const sql =
    "INSERT INTO practice_areas (title, description, image, areas_of_focus) VALUES (?, ?, ?, ?)";
  db.query(sql, [title, description, image, areas_of_focus], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Practice area added successfully", id: result.insertId });
  });
});

// 🔹 Update a Practice Area
app.put("/api/practice-areas/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { title, description, areas_of_focus } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

  const sql =
    "UPDATE practice_areas SET title = ?, description = ?, image = ?, areas_of_focus = ? WHERE id = ?";
  db.query(sql, [title, description, image, areas_of_focus, id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Practice area updated successfully" });
  });
});

// 🔹 Delete a Practice Area
app.delete("/api/practice-areas/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM practice_areas WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Practice area deleted successfully" });
  });
});

// Serve uploaded images
app.use("/uploads", express.static("uploads"));



    const PORT = process.env.PORT || 5000;
    
    app.get("/", (req, res) => {
      res.send("✅ GM Advocates API is running...");
    });
    
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
    