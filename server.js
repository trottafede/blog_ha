require("dotenv").config();

const routes = require("./routes/routes");
const express = require("express");
const app = express();

app.use(express.static("public")); // Usa la carpeta publica
app.use(express.urlencoded({ extended: true })); // Puedo recibir del body información
app.set("view engine", "ejs"); //Templates

// const Authenticate = require("./controllers/authController");
// app.use(Authenticate);

const { Author } = require("./db");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

app.use(
  session({
    secret: "cat", // Usa este string para encriptar no se qué?
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
      session: false,
    },
    async function (req, username, password, done) {
      try {
        console.log("Datos ingresados: " + username + " " + password);
        const user = await Author.findOne({ where: { email: username } });

        if (!user) {
          console.log("Usuario incorrecto");
          return done(null, false, {
            message: "Usuario incorrecto",
          });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          console.log("Contraseña incorrecta");
          return done(null, false, {
            message: "Usuario y/o contraseña incorrectos",
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  Author.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      done(error, user);
    });
});

routes(app); // Uso routes para modulizar

// const dbInitialSetup = require("./db/initialSetup");
// dbInitialSetup(); // Crea tablas e inserta datos de prueba.

app.listen(`${process.env.APP_PORT}`, () =>
  console.log(
    `¡Servidor corriendo en el puerto http://localhost:${process.env.APP_PORT}/`
  )
);
