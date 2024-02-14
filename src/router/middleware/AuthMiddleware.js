import User from "@/controllers/auth/UserController";
import NavigationRoute from "./NavigationRoute";
import {
    setPathRedirect,
    checkPathRedirect,
    removePathRedirect,
} from "@/helpers/utils";

class AuthMiddleware extends NavigationRoute {
    constructor(toFromNext) {
        super(toFromNext);
        this.run();
    }

    run() {
        const user = User.get();
        const path = checkPathRedirect();

        if (user && path) {
            this.next(path);
            removePathRedirect();
        } else if (this.to.meta.needAuth && !user) {
            this.next({ name: "login" });
            setPathRedirect(this.to.path);
        } else if (user && this.to.name == "login") {
            this.next({ name: this.from.name });
        }
    }
}

export default AuthMiddleware;
