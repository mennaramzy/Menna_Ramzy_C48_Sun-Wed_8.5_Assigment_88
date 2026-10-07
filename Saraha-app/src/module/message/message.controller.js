import { Router } from "express";
import { authentication } from "../../middleware/auth.middleware.js";
import {
    deleteMessageService,
    getMyMessagesService,
    sendMessageService,
} from "./message.service.js";

const messageRouter = Router();

messageRouter.post("/", sendMessageService);
messageRouter.get("/", authentication, getMyMessagesService);
messageRouter.delete("/:messageId", authentication, deleteMessageService);

export default messageRouter;