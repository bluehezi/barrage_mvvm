/* 视图模型 */
function BarrageViewModel(model, view) {
    this.model = model
    this.view = view
    var that = this

    this.methods = {
        addBarrage: function (barrage) {
            that.model.addBarrage(barrage)
        }
    }
}
BarrageViewModel.prototype = {
    initialize: function () {
        this.oBox = this.view.querySelectorAll('[barrage-area]')[0]
        this.barrageSpan = this.oBox.querySelectorAll('span.item')[0]
        this.list = this.view.querySelector('[data-info]')
        this.listItem = this.list.querySelector('[info-item]')

        this.oBox.removeChild(this.barrageSpan)
        this.bindElements()
        this.bindList()
        this.bindEvents()
    },
    bindElements: function () {
        var barrageInput = this.view.querySelector('[barrage-input]'),
            barrageSend = this.view.querySelector('[barrage-send]'),
            methodName = barrageSend.getAttribute('data-click')
        bW = this.oBox.offsetWidth,
            bH = this.oBox.offsetHeight
        // 绑定发送弹幕事件
        barrageSend.addEventListener('click', (function () {
            var message = ''
            // 检测弹幕内容有效性
            if (barrageInput.value.length <= 0 || /^\s+$/.test(barrageInput.value)) {
                alert('请输入弹幕信息...!^o^!')
                return
            }

            // 过滤弹幕敏感信息
            message = Utils.filterInfo(barrageInput.value)
            // 动态创建弹幕元素
            createBarrageEle.call(this, message)
            // 弹幕信息添加到模型
            if (this.methods[methodName] && typeof this.methods[methodName] === 'function') {
                var date = new Date()
                this.methods[methodName]({
                    date: date.format('yy-MM-dd'),
                    time: date.format('hh:mm:ss'),
                    message: message
                })
            }
            // 清除输入框内容
            barrageInput.value = ''
        }).bind(this))

        // 动态创建弹幕元素
        function createBarrageEle(message) {
            var ele = this.barrageSpan.cloneNode(true)
            ele.innerHTML = message
            ele.style.left = bW + 'px'
            roll.call(ele, {
                timming: ["ease-out", 'linear'][~~(Math.random() * 2)],
                color: '#' + (~~(Math.random() * (1 << 24))).toString(16),
                fontSize: Utils.randomRange(16, 32),
                top: Utils.randomRange(32, bH - 32)
            })
            this.oBox.appendChild(ele)
        }
        //  移动
        function roll(opt) {
            var timming = opt.timming || 'ease-out',
                color = opt.color || '#fff',
                fontSize = opt.fontSize || 16,
                top = opt.top || 100
            this.style.color = color
            this.style.fontSize = fontSize + 'px'
            this.style.top = top + 'px'
            this._left = parseInt(this.style.left)
            this.timer = window.setInterval((function () {
                // 弹幕离开视口，清除定时器，清除节点
                if (~~this._left <= 1) {
                    clearInterval(this.timer)
                    this.timer = null
                    this.parentNode.removeChild(this)
                    return
                }
                switch (timming) {
                    case 'ease-out':
                        this._left += (0 - this.offsetLeft) * .01
                        break
                    case 'linear':
                        this._left += -2
                        break
                    default:
                        break
                }
                this.style.left = this._left + 'px'
            }).bind(this), 1000 / 60)
        }
    },
    bindList: function () {
        var data = this.model.getAll()

        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                var ele = this.listItem.cloneNode(true),
                    time = ele.getElementsByClassName('time')[0],
                    message = ele.getElementsByClassName('message')[0],
                    date = ele.getElementsByClassName('date')[0]
                time.innerHTML = data[key].time
                date.innerHTML = data[key].date
                message.innerHTML = data[key].message
                this.list.appendChild(ele)
            }
        }
    },
    bindEvents: function () {
        function updateListView(item) {
            var ele = this.listItem.cloneNode(true),
                time = ele.getElementsByClassName('time')[0],
                message = ele.getElementsByClassName('message')[0],
                date = ele.getElementsByClassName('date')[0]

            time.innerHTML = item.time
            date.innerHTML = item.date
            message.innerHTML = item.message
            this.list.appendChild(ele)
        }
        observer.subscribe('barrage.added', updateListView.bind(this))
    }
}