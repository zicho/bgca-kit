import { isEmail, isNullOrEmpty } from "$lib/validation/strings";
import { ValidationResult } from "../core/ValidationResult";

export class RegisterUserModel {
    public email: string;
    public username: string;
    public password: string;
    public confirmPassword: string;

    public validate(): ValidationResult {
        if(isNullOrEmpty(this.email) || isNullOrEmpty(this.password) || isNullOrEmpty(this.confirmPassword)) {
            return ValidationResult.getNegative('Required fields are empty')
        }

        if(!isEmail(this.email)) {
            return ValidationResult.getNegative('Invalid email address format')
        }

        if(this.password != this.confirmPassword) {
            return ValidationResult.getNegative('Passwords do not match')
        }

        return ValidationResult.getPositive();
    }
}
