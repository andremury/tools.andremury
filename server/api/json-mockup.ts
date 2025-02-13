import { documentMocks } from "~/shared/data/mocks.document";
import { getUrlParams } from "~/shared/get-url-params";



export default defineEventHandler(event => {
    if (event.method !== 'GET') {
        throw createError({
            message: "Method not Allowed",
            status: 405
        });
    }
    const { which = 'user' } = getUrlParams<{
        which?: 'user' | 'hermes' | 'users' | 'hermes-contract';
    }>(event.path);

    const response = documentMocks[which] || {};

    return new Response(JSON.stringify(response));
});
