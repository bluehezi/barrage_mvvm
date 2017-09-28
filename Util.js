/**
        工具类
    */
function Utils() {

}
Utils.filterInfo = function (str) {
    /*
        过滤信息
    */
    var sensitiveInfo = ['卧槽','你妹','日','滚','傻逼','sb','我是你爹','bb','智障'],
        i = 0,
        len = sensitiveInfo.length
    for (; i < len; i++) {
        str = str.replace(new RegExp('('+ sensitiveInfo[i]+')','g'), function () {
            return new Array(arguments[0].length + 1).join('*')
        })
    }
    return str
}
// 在范围内获得随机数
Utils.randomRange = function (start, end) {
    return ~~((end - start) * Math.random() + start)
}