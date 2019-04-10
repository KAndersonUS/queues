'use strict';

module.exports = function expensive () {
    const delayMilliseconds = (Math.random() * 1000) + 50;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 1:10 chance of error
            if (Math.round(delayMilliseconds) % 10) {
                return resolve({
                    delayMilliseconds
                });
            }
            return reject(new Error('This is an error'));
        }, delayMilliseconds);
    });
};
