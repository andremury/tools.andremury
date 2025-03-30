// import { toast } from "vue3-toastify";

export const useCopyToClipboard = () => {

    const copy = (text: string) => {
        navigator.clipboard.writeText(text);
        // toast.success('Copiado para a área de transferência');
        alert('Copiado para a área de transferência');
    };

    return {
        copy
    };
};