# queues demo
This is the demo repo for [this talk on the benefits of using job queues to scale Node.js apps horizontally](https://slides.com/kyleanderson-1/queues)

There are three demos to run from project root:
1. `./scripts/solo.sh` - Runs a standalone node process to demonstrate lack of retries
1. `./scripts/single-worker.sh` - Runs a single master/worker pair to do the same task as `solo` but with retries
1. `./scripts/multi-worker.sh` - Runs a single master and four workers to achieve job processing concurrency
