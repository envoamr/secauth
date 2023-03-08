import express from "express";

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  res.json(req.session);
});

// 404
router.use((req, res, next) => res.status(404).send("404 from /dashboard*"));

// export router
export default router;
