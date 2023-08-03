$(document).ready(function() {
    page = window.location.pathname.split("/").at(-1);
    referrer = document.referrer.split("?")[0].split('/').at(-1).split(".").filter((item,i,arr) => arr.length > 1 && i+1 < arr.length );
    $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover',
    });

    if (page == "index.php") {
        // initial_function();
    }
});