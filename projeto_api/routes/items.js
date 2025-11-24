import express from "express";
import Item from "../models/Item.js";

const router = express.Router();

// LISTAR TODOS + CONTAGEM
router.get("/", async (req, res) => {
  try {
//    const items = await Item.find().lean();   // pega tudo da collection
    const items = await Item.find().sort({ recvTime: -1 }).lean();
    const total = await Item.countDocuments(); // total da collection

    res.render("dashboard", {
      items,
      total
    });

  } catch (err) {
    console.error("Erro no GET /items:", err);
    res.send("Erro ao listar documentos");
  }
});

// CRIAR
router.post("/", async (req, res) => {
  try {
    await Item.create({
      recvTime: new Date(),
      attrName: req.body.attrName,
      attrType: req.body.attrType,
      attrValue: req.body.attrValue
    });

    res.redirect("/items");
  } catch (err) {
    console.error("Erro ao criar documento:", err);
    res.send("Erro ao criar documento");
  }
});

// EDITAR
router.get("/edit/:id", async (req, res) => {
  const item = await Item.findById(req.params.id).lean();
  res.render("edit", { item });
});

router.post("/edit/:id", async (req, res) => {
  await Item.findByIdAndUpdate(req.params.id, {
    attrName: req.body.attrName,
    attrType: req.body.attrType,
    attrValue: req.body.attrValue
  });
  res.redirect("/items");
});

// DELETAR
router.get("/delete/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.redirect("/items");
});

export default router;
