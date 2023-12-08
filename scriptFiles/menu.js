document.addEventListener('DOMContentLoaded', function () {
    const hamburgerToggle = document.getElementById('hamburger-toggle');
    const menuItems = document.querySelector('.menu-items');

    hamburgerToggle.addEventListener('change', function () {
        if (this.checked) {
            menuItems.style.display = 'block';
        } else {
            menuItems.style.display = 'none';
        }
    });

    // Close the menu when a menu item is clicked
    menuItems.addEventListener('click', function () {
        hamburgerToggle.checked = false;
        menuItems.style.display = 'none';
    });
});