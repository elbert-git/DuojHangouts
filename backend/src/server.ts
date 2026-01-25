import express from "express";
import cors from "cors";
import { HangoutsSheet } from "./sheets";
import { DuojAuth } from "./auth";

const createServer = () => {
    const app = express();
    app.use(cors());
    app.use(express.json());

    app.post("/login", async (req, res) => {
        // get the password from req.body.password
        const { password } = req.body;
        // return the result from DuojAuth.CheckPassword
        const result = await DuojAuth.checkPassword(password);
        if (result.success) {
            res.json(result);
        } else {
            res.status(401).json(result);
        }
    });

    // Authentication middleware
    app.use((req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: "No authorization header" });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }
        const decoded = DuojAuth.verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ error: "Invalid token" });
        }
        next();
    });

    // 1. readAll
    app.get("/hangouts", async (req, res) => {
        const data = await HangoutsSheet.getAll();
        res.json(data);
    });

    // 2. readOne
    app.get("/hangouts/:id", async (req, res) => {
        const data = await HangoutsSheet.getOne(req.params.id);
        if (!data) {
            return res.status(404).json({ error: "Hangout not found" });
        }
        res.json(data);
    });

    // 3. create
    app.post("/hangouts", async (req, res) => {
        const data = await HangoutsSheet.createRow(req.body);
        res.status(201).json(data);
    });

    // 4. update
    app.patch("/hangouts/:id", async (req, res) => {
        const data = await HangoutsSheet.updateRow(req.params.id, req.body);
        if (!data) {
            return res.status(404).json({ error: "Hangout not found" });
        }
        res.json(data);
    });

    // 5. delete
    app.delete("/hangouts/:id", async (req, res) => {
        const success = await HangoutsSheet.deleteRow(req.params.id);
        if (!success) {
            return res.status(404).json({ error: "Hangout not found" });
        }
        res.status(204).send();
    });

    // Error handling middleware
    app.use(
        (
            err: any,
            req: express.Request,
            res: express.Response,
            next: express.NextFunction,
        ) => {
            console.error(err);
            res.status(500).json({ error: "encountered server error" });
        },
    );

    return app;
};

export default createServer;
