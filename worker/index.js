const Queue = require('bull');
const expensiveFunction = require('./expensiveFunction');

main();

function main () {
    console.log('worker started');
    const queue = new Queue('work', 'redis://redis');
    queue.process(process);
}

function process(job) {
    console.log(`Processing job ${job.id}`);
    return expensiveFunction();
}
