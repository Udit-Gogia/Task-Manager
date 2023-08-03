import Cookies from "js-cookie";

export function saveToLS(property, value) {
  localStorage.setItem(property, value);
}

export function biteCookie(key, value) {
  return Cookies.set(key, `${value}`, { expires: 7 });
}

export async function loginUser(userData, setErrMessage) {
  const response = await fetch(`/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const result = await response.json();

  const { token } = await result;
  // token !== undefined && saveToLS("token", token);
  token !== undefined && biteCookie("token", token);

  if (response.status === 404) {
    setErrMessage("Email Address not found");
  } else if (response.status === 400) {
    setErrMessage("Unable to login, Please check credentials");
  } else {
    setErrMessage("");
  }

  return result;
}

export const signinUser = async (userData, setErrMessage) => {
  const response = await fetch(`/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const result = await response.json();

  if (response.status === 409) {
    setErrMessage("Another user with same email address already exists");
  } else if (response.status === 400) {
    const code = response.headers.get("code");
    console.log(response, code);
    if (code === "pwdRep") {
      setErrMessage('Password cannot contain the word "password"');
    }
  } else {
    const { token } = await result;
    // saveToLS("token", token);
    biteCookie("token", token);
    setErrMessage("");
  }

  return result;
};

export async function logoutUser(setErrMessage) {
  // const token = localStorage.getItem("token");
  const token = Cookies.get("token");
  const response = await fetch("/user/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (response.status === 500) {
    setErrMessage("Failed to logout User");
  } else {
    setErrMessage("");
    Cookies.remove("token");
  }
  return result;
}


