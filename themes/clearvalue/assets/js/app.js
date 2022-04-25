document.addEventListener("DOMContentLoaded", function (event) {
    var elem = document.querySelector('.feedback-slider');
    var flkty = new Flickity(elem, {
        // options
        wrapAround: true,
        prevNextButtons: false,
        cellAlign: 'left',
        draggable: true,
        pageDots: false,
        contain: true,
        adaptiveHeight: false,
    });

    console.log(flkty)
});