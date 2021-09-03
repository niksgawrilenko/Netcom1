var _scroller;
_scroller = function () { // scroller
    return {
        speed: 5, /*скорость, чем больше значние, тем медленнее движение*/
        direct: +1,/* -1 - движение влево, +1 - вправо*/
        position: 0,
        t: null,
        // Инициализация скроллера
        init: function () {
            var el;
            // Установка обработчика колесика мыши
            el = document.getElementById('scroller_container');
            _scroller.addEvent(el, 'mousewheel', _scroller.wheel);
            _scroller.addEvent(el, 'DOMMouseScroll', _scroller.wheel);

            _scroller.timer(_scroller.direct); // запускаю скроллер
        },

        // Обработчик колесика мыши
        wheel: function (e) {
            _scroller.stop();
            e = e ? e : window.event;  // window.event - объект события
            /*var wheelElem = e.target ? e.target : e.srcElement;*/
            var wheelData = e.detail ? e.detail * -1 : e.wheelDelta / 40;

            // В движке WebKit возвращается значение в 100 раз больше
            if (Math.abs(wheelData) > 100) { // повертає абсолютне значення (модуль) числа
                wheelData = Math.round(wheelData / 100);//повертає значення числа заокруглене до найближчого цілого.
            }
            //_scroller.scroll(wheelData*10);
            _scroller.direct = wheelData > 0 ? 1 : -1;
            _scroller.timer(_scroller.direct);
            if (window.event) {
                e.cancelBubble = true;
                e.returnValue = false;
                e.cancel = true;
            }
            if (e.stopPropagation && e.preventDefault) {
                e.stopPropagation();
                e.preventDefault();
            }
            return false;
        },

        // Функция скроллера
        scroll: function (wheel) {
            var el = document.getElementById('scroller_container').firstElementChild;
            var o, oi, width;
            _scroller.position += wheel;
            if (wheel > 0) {
                if (_scroller.position >= 0) { // берем последнюю картинку и вставляем ёё в начало
                    // В этот момент можно подгружать более левую картинку и удалить последнюю
                    o = el;//.firstElementChild; // контейнер с картинками
                    oi = o.lastElementChild; // последняя картинка вместе с анкором
                    width = oi.firstElementChild.clientWidth; // размер картинки
                    o.insertBefore(oi, o.firstElementChild);
                    _scroller.position -= width;
                }
            }
            else {
                o = el;//.firstElementChild; // контейнер с картинками
                oi = o.firstElementChild; // первая картинка вместе с анкором
                width = oi.firstElementChild.clientWidth; // размер картинки
                if (_scroller.position < -width) { // если картинка ушла влево из зоны видимости переношу её в конец списка
                    // В этот момент можно подгружать следующую картинку и удалить первую
                    o.appendChild(oi);
                    _scroller.position += width;
                }
            }
            el.style.left = _scroller.position + 'px';
        },

        // Таймер скроллера
        timer: function (wheel) {
            _scroller.stop();
            _scroller.t = setInterval("_scroller.scroll(" + wheel + ");", _scroller.speed);
        },

        // Остановка скроллера
        stop: function () {
            if (_scroller.t != null) {
                clearInterval(_scroller.t);
                _scroller.t = null;
            }
        },


    };
}();
/*if(!document.funcDomReady)document.funcDomReady=function(){_scroller.init()};
else onDomReady(_scroller.init);*/
window.onload = function () { setTimeout(_scroller.init, 100); }; // стартуем с задержкой, чтобы все прогрузилось