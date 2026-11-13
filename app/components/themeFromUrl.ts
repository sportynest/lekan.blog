/**
 * Runs in <head> before next-themes: if the URL has ?theme=light|dark|system
 * (set by the sister site's links), save it as this site's theme choice and
 * drop the parameter from the address bar. Runs before first paint, so there
 * is no flash of the wrong theme.
 */
export const themeFromUrlScript = `(function(){try{var u=new URL(window.location.href);var t=u.searchParams.get("theme");if(t==="light"||t==="dark"||t==="system"){localStorage.setItem("theme",t);u.searchParams.delete("theme");window.history.replaceState(window.history.state,"",u.pathname+u.search+u.hash)}}catch(e){}})()`
