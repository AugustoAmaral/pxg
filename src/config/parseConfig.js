import user from "./User";
const parseConfig = {
  appId: "3XtW5ql7KanfRSC7i4YF84834cL3LDOqqsWeWaEd",
  appUrl: "https://parseapi.back4app.com",
  restApiKey: "Mnnd7zSq0RxmSeXdkypbT6ASmJ3OKsohPJwRxPl6",
};

export function defaultHeaders() {
  if (user.loggedIn) {
    return {
      "X-Parse-Application-Id": parseConfig.appId,
      "X-Parse-Session-Token": user.token,
      "X-Parse-Rest-Api-Key": parseConfig.restApiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  } else {
    return {
      "X-Parse-Application-Id": parseConfig.appId,
      "X-Parse-Rest-Api-Key": parseConfig.restApiKey,
    };
  }
}
export function generateParseURL(url) {
  return parseConfig.appUrl+ "/" + url;
}
export function generateParseFunctionURL(url) {
  return parseConfig.appUrl + "/functions/" + url;
}

export function generateClassURL(className, queryStrings = null) {
  let query = queryStrings && new URLSearchParams(queryStrings);
  return query
    ? parseConfig.appUrl + "/classes/" + className + "?" + query.toString()
    : parseConfig.appUrl + "/classes/" + className;
}
