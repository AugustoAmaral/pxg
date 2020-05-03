export function cleanAndReload() {
  cleanData();
  reload();
}

export function cleanData() {
  localStorage.clear();
  sessionStorage.clear();
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

export function reload() {
  document.location.reload();
}
export const storeLocalUser = (userInfo) =>
  window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
export const loadLocalUser = () =>
  JSON.parse(window.localStorage.getItem("userInfo"));
export const cleanLocalUser = () =>
  window.localStorage.removeItem("userInfo");
