let favicon_images = '/img/favicon/catalin_';

let frames_number = 13;

let image_counter = 0; // To keep track of the current image

setInterval(function() {
    // remove current favicon
    if(document.querySelector("link[rel='icon']") !== null)
        document.querySelector("link[rel='icon']").remove();
    if(document.querySelector("link[rel='shortcut icon']") !== null)
        document.querySelector("link[rel='shortcut icon']").remove();

    // add new favicon image
    document.querySelector("head").insertAdjacentHTML('beforeend', '<link rel="icon" href="' + favicon_images + (image_counter>9 ? image_counter : '0' + image_counter) + '.png" type="image/gif">');

    // If last image then goto first image
    // Else go to next image    
    if(image_counter == frames_number)
        image_counter = 0;
    else
        image_counter++;
}, 300);