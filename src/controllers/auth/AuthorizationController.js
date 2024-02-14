import User from "./UserController";

export default class Authorization {
    _key = null;

    getDataUser(key) {
        const user = User.get();
        return user ? user[key] : [];
    }

    checkAbilityIfExists(valueInArray) {
        const currData = this.getDataUser(this._key);
        for (const val of valueInArray) {
            if (currData.includes(val)) return true;
        }
        return false;
    }

    ability(valueInArray) {
        return this.checkAbilityIfExists(valueInArray);
    }
}
