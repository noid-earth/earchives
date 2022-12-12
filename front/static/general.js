document.onkeydown = (e) => {

    if (e.ctrlKey && e.key.toUpperCase() == 'R') {
        e.preventDefault();
        location.reload();
        console.log("RELOADED!");
    }
};