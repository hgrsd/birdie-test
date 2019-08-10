import * as express from "express";
import * as cors from "cors";

import {pingController} from "./controllers/ping";

const app = express();

app.use(cors());
app.use(pingController);

export default app;