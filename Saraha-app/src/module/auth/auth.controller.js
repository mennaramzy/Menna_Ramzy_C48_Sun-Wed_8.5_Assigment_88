import { Router } from "express";
import { logInService, signUpService } from "./auth.service.js";

const authRouter = Router();

authRouter.post("/signup", signUpService);
authRouter.post("/login", logInService);

export default authRouter;