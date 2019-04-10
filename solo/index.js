const expensiveFunction = require('./expensiveFunction');

main().catch(err => console.error(err));

async function main () {
    for (let i=0; i<30; i++) {
        console.log(`Invocation ${i} started`);
        try {
            const result = await expensiveFunction();
            console.log(`Invocation ${i} completed successfully. Result: ${JSON.stringify(result)}`);
        } catch (err) {
            console.error(err, `Invocation ${i} threw an error`);
        }
    }
    process.exit(0);
}

// keepalive
setInterval(() => {}, 100);