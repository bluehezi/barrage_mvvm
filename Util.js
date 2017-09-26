/**
        工具类
    */
function Utils() {

}
Utils.filterInfo = function (str) {
    /*
        过滤信息
    */
    return str
}
// 在范围内获得随机数
Utils.randomRange = function (start, end) {
    return ~~((end - start) * Math.random() + start)
}