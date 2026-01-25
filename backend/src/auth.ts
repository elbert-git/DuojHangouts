import bcrypt from "bcrypt";
import { secrets } from "./secrets";
import jwt from "jsonwebtoken";

export class DuojAuth {
    static async hashPassword(password: string) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }

    static async checkPassword(password: string) {
        const hash = secrets.hashedPassword;
        const pass = await bcrypt.compare(password, hash);
        if (pass) {
            const accessToken = jwt.sign({ username: "duoj" }, secrets.secret, {
                expiresIn: "30d",
            });
            return { success: true, accessToken };
        } else {
            return { success: false, accessToken: null };
        }
    }
}
