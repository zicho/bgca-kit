import { getFailedResponse, getSuccessResponse } from "$lib/models/ServiceResponse";
import type { LoginUserModel } from "$lib/models/user/LoginUserModel";
import { setSessionAsCookie } from "$lib/stores/UserStore";

import { supabase, } from "$lib/utils/db";

export async function post(request: { body: string }) {

    let model: LoginUserModel = JSON.parse(request.body);

    try {
        const { session, error } = await supabase.auth.signIn({ email: model.email, password: model.password });
        if (error) {
            return {
                status: error.status,
                body: getFailedResponse(error.message),
            };
        }

        return {
            status: 200,
            body: getSuccessResponse(session),
            headers: setSessionAsCookie(session)
        };

    } catch (error: unknown) {
        return {
            status: 500,
            body: getFailedResponse(),
        };
    }
}
