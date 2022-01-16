// handles sveltekit endpoints

import { mode } from "$app/env";
import { getFailedResponse, ServiceResponse } from "$lib/models/ServiceResponse";

const appURL = import.meta.env.VITE_APP_URL

// T1 is what you get back.
export async function get<T1>(endpoint: string): Promise<ServiceResponse<T1>> {
    try {
        console.log(`EndPointClient: GET request at: ${appURL}/${endpoint}`);

        const res = await fetch(`${appURL}/${endpoint}`, {
            method: 'GET'
        });

        const data = await res.json();
        return data as ServiceResponse<T1>;
    } catch (err) {
        console.log(err);
    }
}

// T1 is what you send in, T2 is what you get back.
export async function post<T>(endpoint: string, model: any): Promise<ServiceResponse<T>> {
    try {
        const res = await fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(model)
        });

        return (await res.json()) as ServiceResponse<T>;
    } catch (err) {
        return getFailedResponse();
    }
}


