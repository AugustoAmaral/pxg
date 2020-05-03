import { generateParseURL, defaultHeaders } from "./parseConfig";
import {
  storeLocalUser,
  cleanAndReload,
  loadLocalUser,
  cleanLocalUser,
} from "../../lib/localStorageFunctions";

function User() {
  this.loggedIn = false;
  this.token = null;

  this.parseUserInfo = (response) => {
    const storageUserInfo = response || loadLocalUser();
    if (response) storeLocalUser(response);
    this.loggedIn = true;
    this.token = storageUserInfo.token;
  };

  this.login = ({ username, password }) =>
    fetch(generateParseURL(`login?username=${username}&password=${password}`), {
      headers: {
        ...defaultHeaders(),
        "X-Parse-Revocable-Session": "1",
      },
    }).then((res) => res.json());

  this.authorized = () => this.loggedIn;
  this.logout = () => {
    cleanLocalUser();
    cleanAndReload();
  };

  this.init = () => {
    if (loadLocalUser()) {
      this.parseUserInfo();
    }
  };
}

const user = new User();

export default user;
