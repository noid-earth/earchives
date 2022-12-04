function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function changeTheme(theme) {

    if(theme !== 'default') {
      if(theme && ['dark', 'light'].includes(theme.trim().toLowerCase())) setCookie('theme', theme);

      if(!theme) 
      setCookie('theme', 
        getCookie('theme') === 'dark' ? 'light' : 'dark'
      )
    }

    if (getCookie('theme') === 'dark' || (getCookie('theme') !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        document.getElementById('THEME_SWITCH').checked = false;
    } else {
        document.documentElement.classList.remove('dark');
        document.getElementById('THEME_SWITCH').checked = true;
    }
}

changeTheme('default');

document.onkeydown = (keyDownEvent) => { 

  if (keyDownEvent.key === 't') changeTheme();
}

function toggleTheme() {
  if(document.getElementById('THEME_SWITCH').checked) {
    changeTheme('light');
  } else {
    changeTheme('dark');
  }
}