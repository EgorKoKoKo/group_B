let menu = document.getElementById('main_left_navigation');
let icon = document.getElementById('minimize_icon');
let content = document.getElementById('content');
let elements_to_hide = document.querySelectorAll('.menu_text')
let custom = document.getElementById('custom');
let isBig = true;

icon.addEventListener("click", event => {
    if (isBig) {
        menu.style.width = 'calc(4%)';
        icon.style.paddingLeft= '0svh';
        content.style.width = 'calc(96%)';
        content.style.left = 'calc(4%)';
        isBig = false;
        elements_to_hide.forEach(elem => {
            elem.style.display= 'none';
        });
        if (custom!=null) custom.style.left='calc(5%)';
    } else {
        isBig= true;
        icon.style.paddingLeft= '3svh';
        menu.style.width = 'calc(10%)';
        content.style.width = 'calc(90%)';
        content.style.left = 'calc(10%)';
        elements_to_hide.forEach(elem => {
            elem.style.display= '';
        });
        if (custom!=null) custom.style.left='calc(11%)';
    }
});