import BaseApi from "./BaseApi";

class User extends BaseApi {
    static async getAll(params) {
        const data = await super.get("/user", { params });
        return data;
    }

    static async getData(id) {
        const data = await super.get("/user/" + id);
        return data;
    }

    static async getTeam(params) {
        const data = await super.get("/user/team", { params });
        return data;
    }

    static async createData(payload) {
        const data = await super.post("/user", payload);
        return data;
    }

    static async updateData(id, payload) {
        const data = await super.put("/user/" + id, payload);
        return data;
    }

    static async syncData(key, payload) {
        const data = await super.post("/user/sync/" + key, payload);
        return data;
    }
}

export default User;
