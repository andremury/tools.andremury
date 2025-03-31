import { toast } from "vue3-toastify";

export const useCopyToClipboard = () => {

    const copy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard.');
    };

    return {
        copy
    };
};
