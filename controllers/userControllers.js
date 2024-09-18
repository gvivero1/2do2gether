const users = require("../models/users");

// Handle GET request for login page
exports.getLoginPage = (req, res) => {
  res.render("login");
};

// Handle POST request for login
exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both username and password" });
  }

  const user = users
    .getUserByUsername(username)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid password" });
      }

      res.status(200).json({ message: "Login successful" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Internal server error" });
    });

  req.session.user = user;

  res.redirect("/profile");
};

// Handle GET request for signup page
exports.getSignupPage = (req, res) => {
  // Render the signup page
  res.render("signup");
};

// Handle POST request for signup
exports.signup = (req, res) => {
  const { username, name, password, age } = req.body;

  if (!username || !name || !password || !age) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  const user = new users({
    username,
    name,
    password,
    age,
  });

  user
    .saveUser()
    .then((savedUser) => {
      res.status(201).json({ message: "User created successfully" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Internal server error" });
    });

  req.session.user = user;

  res.redirect("/profile");
};

// Handle GET request for profile page
exports.getProfilePage = (req, res) => {
  // Render the profile page
  res.render("profile");
};

// Handle GET request for edit profile page
exports.getEditProfilePage = (req, res) => {
  // Render the edit profile page
  res.render("editProfile");
};

// Handle POST request for edit profile
exports.editProfile = (req, res) => {
  const { name, age } = req.body;

  if (!name || !age) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  const user = req.session.user;

  user.name = name;
  user.age = age;

  user
    .saveUser()
    .then((savedUser) => {
      res.status(200).json({ message: "Profile updated successfully" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Internal server error" });
    });

  req.session.user = user;

  res.redirect("/profile");
};
