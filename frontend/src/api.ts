type apiStateCache = {
    accessToken: string | null;
};

export default class API {
    static backendUrl = "http://localhost:3000";
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
}
