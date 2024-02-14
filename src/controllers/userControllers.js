const users = [
  /* ... */
];

const database = require("../../database");

const getUsers = (req, res) => {
  database
    .query("SELECT * FROM users")
    .then(([users]) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query("SELECT * FROM users WHERE id = ?", [id])
    .then(([users]) => {
      if (users.length > 0) {
        res.status(200).json(users[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const postUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "INSERT INTO users (firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.status(201).send({
        id: result.insertId,
        firstname,
        lastname,
        email,
        city,
        language,
      });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    // Si id n'est pas un nombre, renvoie une erreur 400 (Bad Request)
    return res.status(400).send("Invalid user ID.");
  }
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ? WHERE id = ?",
      [firstname, lastname, email, city, language, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404); // Si l'utilisateur n'est pas trouvé
      } else {
        res.status(204).json({}); // On renvoie les infos de l'utilisateur mis à jour
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500); // Oups, erreur serveur
    });
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  updateUser, // T'as vu, on l'a ajouté ici pour l'exporter ;)
};
