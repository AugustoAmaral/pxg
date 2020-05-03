import { generateParseURL, defaultHeaders } from "./parseConfig";
import {
  storeLocalUser,
  cleanAndReload,
  loadLocalUser,
  cleanLocalUser,
} from "../lib/localStorageFunctions";

function User() {
  this.loggedIn = false;
  this.id = null;
  this.name = null;
  this.email = null;
  this.parseToken = null;

  this.parseUserInfo = (response) => {
    const storageUserInfo = response || loadLocalUser();
    if (response) storeLocalUser(response);
    this.loggedIn = true;
    this.id = storageUserInfo.sub;
    this.name = storageUserInfo.name;
    this.email = storageUserInfo.email;
    this.parseToken = storageUserInfo.parseToken;
  };

  this.login = ({ username, password }) =>
    fetch(
      generateParseURL(`parse/login?username=${username}&password=${password}`),
      {
        headers: {
          ...defaultHeaders(),
          "X-Parse-Revocable-Session": "1",
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        return console.log(json);
      });

  this.authorized = () => this.loggedIn;
  this.logout = () => {
    cleanLocalUser();
    cleanAndReload();
  };
}

const user = new User();

if (process.env.NODE_ENV === "production") {
  setInterval(() => user.refreshAndUpdateToken(), 10 * 60 * 1000);
}

export default user;
