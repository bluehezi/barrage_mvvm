// 扩展日期格式化函数
Date.prototype.format = Date.prototype.format || function (fmt) {
    var optFmt = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds()
    }
    if (/(y+)/g.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let key in optFmt) {
        if (optFmt.hasOwnProperty(key)) {
            if (new RegExp('(' + key + ')', 'g').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, ('00' + optFmt[key]).substr(optFmt[key].toString().length))
            }
        }
    }
    return fmt
}