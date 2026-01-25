import { HangoutsSheet } from "./sheets";
import createServer from "./server";
import { secrets } from "./secrets";
import { DuojAuth } from "./auth";

const PORT = secrets.port;

const main = async () => {
    try {
        // start the sheet interface
        await HangoutsSheet.init();
        console.log("HangoutsSheet initialized");
        // start the server
        const app = createServer();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

main();
