export function getUrlParams<T extends Record<string, string>>(url: string): T {
    const params: Record<string, string> = {};

    const urlParams = new URLSearchParams(url.split('?')[1]);

    urlParams.forEach((value, key) => {
        params[key] = value;
    });

    return params as T;
}
