import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import itemsRoutes from "./routes/items.js";

const app = express();

// ===========================
// CONFIGURAÇÕES BÁSICAS
// ===========================
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// ===========================
// SESSÃO — AGORA PERSISTENTE
// ===========================
app.use(
  session({
    secret: "chave-super-secreta",
    resave: false,
    saveUninitialized: false,
    rolling: true, // renova sessão a cada request
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hora
      httpOnly: true
    }
  })
);

// ===========================
// MIDDLEWARE DE AUTENTICAÇÃO
// ===========================
async function requireAuth(req, res, next) {
  if (!req.session.mongoURI) {
    return res.redirect("/");
  }

  // Se o Mongoose estiver desconectado, reconecta automaticamente
  if (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(req.session.mongoURI);
      console.log("Reconectado ao MongoDB");
    } catch (err) {
      console.error("Falha ao reconectar:", err);
      return res.redirect("/");
    }
  }

  next();
}

// ===========================
// LOGIN GET
// ===========================
app.get("/", (req, res) => {
  res.render("login", { error: null });
});

// ===========================
// LOGIN POST (Conecta ao Mongo)
// ===========================
app.post("/login", async (req, res) => {
  const { user, pass } = req.body;

  // Conecta com autenticação no FIWARE/Mongo
  const mongoURI = `mongodb://${user}:${pass}@192.168.10.131:27017/sth_smart?authSource=admin`;

  try {
    await mongoose.connect(mongoURI);

    // Salvar URI para reconectar automaticamente
    req.session.mongoURI = mongoURI;

    console.log("Login OK, conectado ao MongoDB");
    res.redirect("/dashboard");
  } catch (err) {
    console.error("Erro ao conectar:", err);
    res.render("login", { error: "Falha ao autenticar no MongoDB." });
  }
});

// ===========================
// DASHBOARD
// ===========================
app.get("/dashboard", requireAuth, (req, res) => {
  res.redirect("/items");
});

// ===========================
// ROTAS CRUD
// ===========================
app.use("/items", requireAuth, itemsRoutes);

// ===========================
// SERVIDOR
// ===========================
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
