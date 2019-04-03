const Queue = require('bull');

main();

function main () {
    console.log('main started');
    const queue = new Queue('jobs', 'redis://redis');
    const jobOpts = {
        attempts: 3,
        removeOnComplete: true,
        removeOnFail: true,
    };

    queue.on('completed', (job) => {
        console.log(`Job ${job.jobId} completed successfully`);
    });

    queue.on('failed', (job, err) => {
        console.error(err, `Job ${job.jobId} threw an error`);
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
