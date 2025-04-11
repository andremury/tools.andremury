export const useSrsUpdateKey = () => {
    const updateKey = useState('srs-update-key', () => 0);

    let timeout: NodeJS.Timeout | null;

    const tick = () => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            console.log('ticking..')
            updateKey.value++;
            timeout = null;
        }, 300);
    };

    return { tick, updateKey };
};
