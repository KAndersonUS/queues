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
    const result = await expensiveFunction();
    console.log(`Done processing job ${job.id}`);
    return result;
}
