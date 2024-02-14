import Authorization from "./AuthorizationController";

export default class Permission extends Authorization {
    constructor() {
        super();
        this._key = "permissions";
    }

    static get list() {
        return {
            MASTER_CREATE: "MASTER_CREATE",
        };
    }
}
