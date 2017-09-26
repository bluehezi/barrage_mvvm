/* 模型*/
function BarrageModel(data) {
    this.barrage = data || []
}
BarrageModel.prototype = {
    addBarrage: function (barrageItem) {
        this.barrage.unshift(barrageItem)
        observer.publish('barrage.added', Object.assign(barrageItem))
    },
    removeBarrage: function () {
        /*
         todo 
        */
    },
    getAll() {
        return this.barrage
    }
}