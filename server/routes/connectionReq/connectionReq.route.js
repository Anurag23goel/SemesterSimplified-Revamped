import express from "express";
import {
  ACCEPT_CONNECTION_REQUEST,
  CREATE_CONNECTION_REQUEST,
  DELETE_CONNECTION_REQUEST,
} from "../../contollers/connectionReq/connectionReq.controller.js";
import { authenticateUser } from "../../utils/auth.middleware.js";
const connectionRouter = express.Router();

connectionRouter.post("/create", authenticateUser, CREATE_CONNECTION_REQUEST);
connectionRouter.post("/accept",authenticateUser, ACCEPT_CONNECTION_REQUEST);
connectionRouter.delete("/delete",authenticateUser, DELETE_CONNECTION_REQUEST);

export default connectionRouter;
