import express from "express";
import { HangoutsSheet } from "./sheets";

const createServer = () => {
    const app = express();
    app.use(express.json());

    // 1. readAll
    app.get("/hangouts", async (req, res) => {
        try {
            const data = await HangoutsSheet.getAll();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    });

    // 2. readOne
    app.get("/hangouts/:id", async (req, res) => {
        try {
            const data = await HangoutsSheet.getOne(req.params.id);
            if (!data) {
                return res.status(404).json({ error: "Hangout not found" });
            }
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    });

    // 3. create
    app.post("/hangouts", async (req, res) => {
        try {
            const data = await HangoutsSheet.createRow(req.body);
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    });

    // 4. update
    app.patch("/hangouts/:id", async (req, res) => {
        try {
            const data = await HangoutsSheet.updateRow(req.params.id, req.body);
            if (!data) {
                return res.status(404).json({ error: "Hangout not found" });
            }
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    });

    // 5. delete
    app.delete("/hangouts/:id", async (req, res) => {
        try {
            const success = await HangoutsSheet.deleteRow(req.params.id);
            if (!success) {
                return res.status(404).json({ error: "Hangout not found" });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    });

    return app;
};

export default createServer;
