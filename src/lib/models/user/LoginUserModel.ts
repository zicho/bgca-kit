import { isNullOrEmpty } from "$lib/validation/strings";
import { ValidationResult } from "../core/ValidationResult";

export class LoginUserModel {
    public email: string;
    public password: string;

    public validate(): ValidationResult {
        if (isNullOrEmpty(this.email) || isNullOrEmpty(this.password)) {
            return ValidationResult.getNegative('Required fields are empty')
        }

        return ValidationResult.getPositive();
    }
}
