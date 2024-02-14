import BaseApi from "./BaseApi";

class Authenticate extends BaseApi {
    static async login(access_token) {
        const data = await super.post("/login/google", { access_token });
        return data;
    }

    static async logout() {
        const data = await super.post("/logout");
        return data;
    }
}

export default Authenticate;
