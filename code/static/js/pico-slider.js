class PicoSlider {
    slides = [];
    current = 0;
    DIRECTION_KEYS = {
        'ArrowLeft': -1,
        'ArrowRight': 1,
        'ArrowDown': 1,
        'ArrowUp': -1
    }
    constructor({selector, addClickListeners, addArrowListeners}) {
        this.slides = Array.from(document.querySelectorAll(selector))
        if(addClickListeners) this.addClickListener();
        if(addArrowListeners) this.addArrowListener();

        this.killScroll()
    }
    killScroll() {
        window.addEventListener('scroll', () => window.scroll(0, this.slides[this.current].offsetTop))
    }

    addArrowListener() {
        const _keyPressHandler = (evt) => {
            const _direction = this.DIRECTION_KEYS[evt.code]
            if(!_direction) return console.warn(`direction not defined: ${evt.code}`);
            this.killNativeEvents(evt)
            const _index = clamp(_direction + this.current, 0, this.slides.length - 1)
            this.navigateTo(_index)

        }
        window.addEventListener('keydown', (evt) => _keyPressHandler.apply(this, [evt]))
    }
    addClickListener() {
        const _clickHandler = function(evt) {
            const {x, target} = evt
            if(this.isInteractiveElement(target)) return;
            this.killNativeEvents(evt);
            const _direction = x > (window.innerWidth / 2) ? 1 : -1
            const _index = clamp(_direction + this.current, 0, this.slides.length - 1)
            this.navigateTo(_index)
        }
        document.addEventListener('click', (evt) => _clickHandler.apply(this, [evt]))
    }
    navigateTo(index) {
        window.scroll(0, this.slides[index].offsetTop)
        this.current = index
    }
    isInteractiveElement(element) {
        return element.closest('.keep-interaction') != null
    }
    killNativeEvents(e) {
        e.stopPropagation()
        e.preventDefault()
    }
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);