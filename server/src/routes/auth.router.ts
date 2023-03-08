import express from "express";
import * as authController from "../controllers/auth.controller";

const router = express.Router();

router.use(express.json());

router.post("/", (req, res) => res.json());

router.post("/username/valid", authController.usernameIsValid);
router.post("/email/valid", authController.emailIsValid);
router.post("/password/valid", authController.passIsValid);
router.post("/confirmpassword/valid", authController.confirmPassIsValid);
router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

// 404
router.use((req, res, next) => res.status(404).send("404 from /auth*"));

// export router
export default router;
