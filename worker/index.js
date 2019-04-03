const Queue = require('bull');
const expensiveFunction = require('./expensiveFunction');

main();

function main () {
    console.log('worker started');
    const queue = new Queue('jobs', 'redis://redis:6379');
    queue.process(process);
}

async function process(job) {
    console.log(`Processing job ${job.id}`);
    let result;
    try {
        result = await expensiveFunction();
    } catch (err) {
        console.error(`Job ${job.id} failed with error: ${err.message}`);
        throw err;
    }
    console.log(`Done processing job ${job.id}`);
    return result;
}
