import AuthException from "./AuthException";
import DefaultException from "./DefaultException";
import InputException from "./InputException";
import UnauthorizedException from "./UnauthorizedException";

const EXCEPTION = {
    ValidationException: "ValidationException",
    AuthenticationException: "AuthenticationException",
    AccessDeniedHttpException: "AccessDeniedHttpException",
    TokenExpiredException: "TokenExpiredException",
};

export default class ResponseException extends Error {
    constructor(error) {
        super(error);
    }

    static run(error) {
        try {
            const { response } = error;

            if (response && typeof response?.data == "object") {
                const name = response.data.data?.exception;
                const message = response.data.message;
                switch (response.data.data?.exception) {
                    case EXCEPTION.ValidationException:
                        InputException.run(response.data);
                        break;
                    case EXCEPTION.AuthenticationException:
                    case EXCEPTION.TokenExpiredException:
                        AuthException.run({ name, message });
                        break;
                    case EXCEPTION.AccessDeniedHttpException:
                        UnauthorizedException.run({ name, message });
                        break;
                    default:
                        DefaultException.run({ name, message });
                        break;
                }
            } else {
                DefaultException.run({
                    name: response?.data || error?.name,
                    message: response?.message || error?.message,
                });
            }
        } catch (error) {
            DefaultException.run(error);
        }
    }
}
