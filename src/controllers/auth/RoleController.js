import Authorization from "./AuthorizationController";

export default class Role extends Authorization {
    constructor() {
        super();
        this._key = "roles";
    }

    static get list() {
        return {
            ADMIN: "ADMINISTRATOR",
        };
    }
}
