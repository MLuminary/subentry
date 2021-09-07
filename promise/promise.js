"use strict";
exports.__esModule = true;
exports.State = void 0;
var State;
(function (State) {
    State["PENDING"] = "pending";
    State["FULFILLED"] = "fulfilled";
    State["REJECTED"] = "rejected";
})(State = exports.State || (exports.State = {}));
var isThenable = function (value) {
    if (typeof value === 'object' &&
        value !== null &&
        value.then &&
        typeof value.then === 'function') {
        return true;
    }
    else {
        return false;
    }
};
var MyPromise = /** @class */ (function () {
    function MyPromise(executor) {
        var _this = this;
        this.updateResult = function (value, state) {
            /*
              Process the promise if it is still in pending state.
              An already rejected or resolved promise is not processed
            */
            if (_this.state !== State.PENDING) {
                return;
            }
            _this.value = value;
            _this.state = state;
            // execute handlers
            if (state === State.FULFILLED) {
                _this.onFulfilled.forEach(function (callback) { return callback(); });
            }
            else {
                _this.onRejected.forEach(function (callback) { return callback(); });
            }
        };
        this._resolve = function (value) {
            _this.updateResult(value, State.FULFILLED);
        };
        this._reject = function (error) {
            _this.updateResult(error, State.REJECTED);
        };
        this.then = function (onFulfilled, onRejected) {
            var _onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (value) { return value; };
            var _onRejected = typeof onRejected === 'function'
                ? onRejected
                : function (reason) {
                    throw reason;
                };
            var promise2 = new MyPromise(function (resolve, reject) {
                if (_this.state === State.PENDING) {
                    _this.onFulfilled.push(function () {
                        setTimeout(function () {
                            try {
                                var x = _onFulfilled(_this.value);
                                _this.resolvePromise(promise2, x, resolve, reject);
                            }
                            catch (e) {
                                reject(e);
                            }
                        });
                    });
                    _this.onRejected.push(function () {
                        setTimeout(function () {
                            try {
                                var x = _onRejected(_this.value);
                                _this.resolvePromise(promise2, x, resolve, reject);
                            }
                            catch (e) {
                                reject(e);
                            }
                        });
                    });
                }
                else if (_this.state === State.FULFILLED) {
                    setTimeout(function () {
                        try {
                            var x = _onFulfilled(_this.value);
                            _this.resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                }
                else if (_this.state === State.REJECTED) {
                    setTimeout(function () {
                        try {
                            var x = _onRejected(_this.value);
                            _this.resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                }
            });
            // then 返回一个新的 promise
            return promise2;
        };
        this.state = State.PENDING;
        this.value = undefined;
        this.onFulfilled = [];
        this.onRejected = [];
        try {
            executor(this._resolve, this._reject);
        }
        catch (err) {
            this._reject(err);
        }
    }
    /**
     *
     * @param promise2
     * @param x promise2 的返回值
     * @param resolve promise2 的 resolve
     * @param reject promise2 的 reject
     */
    MyPromise.prototype.resolvePromise = function (promise2, x, resolve, reject) {
        var _this = this;
        if (promise2 === x) {
            reject(new TypeError('the promise and the return value are the same'));
        }
        if (x && (typeof x === 'object' || typeof x === 'function')) {
            var used_1;
            try {
                var then = x.then;
                if (typeof then === 'function') {
                    then.call(x, function (y) {
                        if (used_1)
                            return;
                        used_1 = true;
                        _this.resolvePromise(promise2, y, resolve, reject);
                    }, function (r) {
                        //PromiseA+2.3.3.2
                        if (used_1)
                            return;
                        used_1 = true;
                        reject(r);
                    });
                }
                else {
                    //PromiseA+2.3.3.4
                    if (used_1)
                        return;
                    used_1 = true;
                    resolve(x);
                }
            }
            catch (e) {
                //PromiseA+ 2.3.3.2
                if (used_1)
                    return;
                used_1 = true;
                reject(e);
            }
        }
        else {
            //PromiseA+ 2.3.3.4
            resolve(x);
        }
    };
    return MyPromise;
}());
var promise1 = new MyPromise(function (resolve, reject) {
    setTimeout(function () {
        console.info(2);
        resolve(3);
    }, 0);
});
var promise2 = promise1.then(function (value) {
    return new MyPromise(function (resolve) {
        console.info(value);
        resolve(5);
        return;
    });
});
promise2
    .then(function (value) {
    console.info(value);
    return 6;
})
    .then(function (value) {
    console.info(value);
});
// @ts-ignore
MyPromise.defer = MyPromise.deferred = function () {
    var dfd = {};
    // @ts-ignore
    dfd.promise = new MyPromise(function (resolve, reject) {
        // @ts-ignore
        dfd.resolve = resolve;
        // @ts-ignore
        dfd.reject = reject;
    });
    return dfd;
};
// @ts-ignore
module.exports = MyPromise;
// const promise2 = new Promise((resolve) => {
//   setTimeout(() => {
//     console.info(2)
//     resolve(3)
//   },0)
// }).then((value) => {
//   console.info(value)
// })
