const Queue = require('bull');

main();

function main () {
    console.log('main started');
    const queue = new Queue('work', 'redis://redis');
    const jobOpts = {
        attempts: 10,
        removeOnComplete: true,
        removeOnFail: true,
    };

    queue.on('global:completed', (jobID, result) => {
        console.log(`Job ${jobID} completed. Result: ${JSON.stringify(result)}`);
    });

    queue.on('global:error', (jobID, err) => {
        console.error(err, `Job ${jobID} threw an error`);
    });

    for (let i=0; i<30; i++) {
        const data = {
            index: i
        };
        const opts = Object.assign({}, jobOpts, { jobId: i });
        queue.add(data, opts).then(() => {
            console.log(`Added job ${i} to queue`);
        }).catch((err) => {
            console.error(err);
        });
    }
}
