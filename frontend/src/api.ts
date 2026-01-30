import { toast } from "sonner";

export interface HangoutRow {
    id: string;
    name: string;
    description: string;
    location: string;
    googleLink: string;
    emoji: string;
    tag: string;
    tried: boolean;
    offline: boolean;
    upvotes: number;
    dateCreated: string;
}

type apiStateCache = {
    accessToken: string | null;
};

export default class API {
    static backendUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
    static localStorageKey = "duoj-hangout";
    static stateCache: apiStateCache = {
        accessToken: null,
    };
    static init() {
        // load the cache from local storage and set it to state cache
        // if its null set it to null
        const cached = localStorage.getItem(this.localStorageKey);
        if (cached) {
            this.stateCache = JSON.parse(cached);
        } else {
            this.stateCache = { accessToken: null };
        }
    }
    static logout() {
        // make the state cache access token null.
        this.stateCache.accessToken = null;
        // clear the local cache
        localStorage.removeItem(this.localStorageKey);
    }
    static saveCacheTolocal() {
        // stringify the state cache and save it to local sotrage
        localStorage.setItem(
            this.localStorageKey,
            JSON.stringify(this.stateCache),
        );
    }
    static isLoggedIn() {
        // return true or false depending if the accesstoken is null or not
        return this.stateCache.accessToken !== null;
    }
    static async login(password: string) {
        // in a try catch block
        try {
            // make a post fetch to <url>/login
            const response = await fetch(`${this.backendUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            });

            // depending on the status code
            if (response.status === 200) {
                const data = await response.json();
                const token = data.accessToken;

                // and save the token to the statecache and call the save cache to local
                this.stateCache.accessToken = token;
                this.saveCacheTolocal();

                // if 200 return {success: true, accessToken:token}
                return { success: true, accessToken: token };
            } else {
                // else return {success: false, accesstoken: false}
                return { success: false, accessToken: false };
            }
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, accessToken: false };
        }
    }
    static async getAllRows(): Promise<HangoutRow[]> {
        try {
            const response = await fetch(`${this.backendUrl}/hangouts`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${this.stateCache.accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                return await response.json();
            } else {
                console.error("Failed to fetch hangouts:", response.statusText);
                return [];
            }
        } catch (error) {
            console.error("Error fetching hangouts:", error);
            return [];
        }
    }

    static async getRow(id: string): Promise<HangoutRow | null> {
        try {
            const response = await fetch(`${this.backendUrl}/hangouts/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${this.stateCache.accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                return await response.json();
            } else {
                console.error(
                    `Failed to fetch hangout ${id}:`,
                    response.statusText,
                );
                return null;
            }
        } catch (error) {
            console.error(`Error fetching hangout ${id}:`, error);
            return null;
        }
    }

    static async createRow(
        data: Omit<HangoutRow, "id" | "dateCreated" | "upvotes">,
    ): Promise<HangoutRow | null> {
        try {
            const response = await fetch(`${this.backendUrl}/hangouts`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${this.stateCache.accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                return await response.json();
            } else {
                console.error("Failed to create hangout:", response.statusText);
                return null;
            }
        } catch (error) {
            console.error("Error creating hangout:", error);
            return null;
        }
    }

    static async updateRow(
        id: string,
        data: Partial<HangoutRow>,
    ): Promise<HangoutRow | null> {
        try {
            const response = await fetch(`${this.backendUrl}/hangouts/${id}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${this.stateCache.accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                return await response.json();
            } else {
                console.error(
                    `Failed to update hangout ${id}:`,
                    response.statusText,
                );
                return null;
            }
        } catch (error) {
            console.error(`Error updating hangout ${id}:`, error);
            return null;
        }
    }

    static async upvote(id: string): Promise<HangoutRow | null> {
        const row = await this.getRow(id);
        if (!row) return null;
        const result = await this.updateRow(id, { upvotes: (row.upvotes || 0) + 1 });
        if (result) {
            toast.success(`Successfully upvoted ${row.name}!`, {
                position: "top-center",
            });
        }
        return result;
    }

    static async unUpvote(id: string): Promise<HangoutRow | null> {
        const row = await this.getRow(id);
        if (!row) return null;
        const result = await this.updateRow(id, {
            upvotes: Math.max(0, (row.upvotes || 0) - 1),
        });
        if (result) {
            toast.success(`Removed upvote from ${row.name}`, {
                position: "top-center",
            });
        }
        return result;
    }

    static async deleteRow(id: string): Promise<boolean> {
        try {
            const response = await fetch(`${this.backendUrl}/hangouts/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${this.stateCache.accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 204) {
                return true;
            } else {
                console.error(
                    `Failed to delete hangout ${id}:`,
                    response.statusText,
                );
                return false;
            }
        } catch (error) {
            console.error(`Error deleting hangout ${id}:`, error);
            return false;
        }
    }
}
