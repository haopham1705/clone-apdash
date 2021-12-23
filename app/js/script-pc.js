// SideNav action
function navFunc(){
    let navbar = document.getElementById('mySidenav');
    let navItem = document.getElementById('sidenav-list');

    if(navbar.style.display === 'block'){
        navbar.style.display = 'none' ;
        navbar.style.height = "0";
        navItem.style.display = "none";
    }else {
        navbar.style.display = 'block' ;
        navbar.style.height = "auto";
        navItem.style.display = "block";
    }
}

