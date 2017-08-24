let buttons = document.getElementsByClassName("menu_button");
for (var i = 0; i < buttons.length; i++) {
    let button = buttons[i]
    button.addEventListener("mouseover", function() {
        button.style.fontSize = "40pt";
    });
    button.addEventListener("mouseleave", function() {
        button.style.fontSize = "30pt";
    });
}
