import { Router } from "express";
import auth from "./auth/auth.route";
import users from "./users/user.route";
import documento from "./documentos/documento.route";

const router: Router = Router();

router.use("/", auth);
router.use("/users", users);
router.use("/documento", documento);

export default router;
