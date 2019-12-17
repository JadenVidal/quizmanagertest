
function setCookie(variable, value, expires_seconds) {
  var d = new Date();
  d = new Date(d.getTime() + 1000 * expires_seconds);
  document.cookie = variable + '=' + value + '; expires=' + d.toGMTString() + ';';
}
  
  function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  function getCookie(c_name) {
    var c_value = " " + document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start === -1) {
        c_value = null;
    }
    else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end === -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start,c_end));
    }
    return c_value;
}
  
export { setCookie, deleteCookie, getCookie }