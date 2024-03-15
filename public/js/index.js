let string = "admin";
let stringp = "admin";

function pass_ch(){
    var cp = document.getElementById("cp");
    var contain = document.getElementById("contain");
    var contain2 = document.getElementById("contain2");

    cp.style.visibility = "hidden";
    contain.classList.add("hide");
    contain2.classList.remove("hide2");
}
function vclose(){
    var cp = document.getElementById("cp");
    var contain = document.getElementById("contain");
    var contain2 = document.getElementById("contain2");
    
    contain2.classList.add("hide2");
    contain.classList.remove("hide");
    cp.style.visibility = "visible";
}