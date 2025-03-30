let iv: NodeJS.Timeout | null = null;

function ThreadPoll(ttl: number = 1000) {
    const queue: Promise<any>[] = [];
    console.info("Started threadpoll, ttl:", ttl);

    function push(fn: Promise<any>) {
        queue.push(fn);
    }

    async function run() {
        let fn = queue.shift();
        while (fn) {
            await fn;
            fn = queue.shift();
        }
    }

    function start() {
        if (iv) stop();
        iv = setInterval(async () => {
            await run();
        }, ttl);
    }

    function stop() {
        if (!iv) return;
        clearInterval(iv);
        iv = null;
    };

    return {
        push,
        start,
        stop
    };
}

export default ThreadPoll();