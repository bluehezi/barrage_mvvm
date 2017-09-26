/* 观察者模式 */
function Observer() {
    this.data = {}
}
Observer.prototype = {
    subscribe: function (name, cb) {
        if (!this.data[name]) {
            this.data[name] = []
        }
        this.data[name].push(cb)
    },
    publish: function (name) {
        if (!this.data[name]) {
            return
        }
        var i = 0,
            len = this.data[name].length,
            args = Array.prototype.slice.call(arguments, 1)
        for (; i < len; i++) {
            if (this.data[name][i] && typeof this.data[name][i] === 'function') {
                this.data[name][i].apply(null, args)
            }
        }
    },
    remove: function (name, cb) {
        if (!this.data[name]) {
            return
        }
        var i = 0,
            len = this.data[name].length
        for (; i < len; i++) {
            if (this.data[name][i] === cb) {
                this.data[name].splice(i, 1)
            }
        }
    }
}