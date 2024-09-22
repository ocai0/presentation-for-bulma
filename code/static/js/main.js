function manageFullscreenMode () {
    isFullscreen = window.innerHeight == screen.height
    if(isFullscreen)
        document.querySelector('button.fullscreen-toggle').classList.add('is-invisible')
    else 
        document.querySelector('button.fullscreen-toggle').classList.remove('is-invisible')
}

window.onload = function() {
    picoSlider = new PicoSlider({selector: '.slide-frame', addClickListeners: true, addArrowListeners: true})
    manageFullscreenMode()
}

window.addEventListener('resize', manageFullscreenMode);
