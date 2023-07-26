import { useState } from "react";
import images from "@/assets/icons";
import Image from "next/image";

export function LoginForm() {
  const [userData, setUserData] = useState({});

  function handleChange(e) {
    console.log(e.target);
  }

  return (
    <section>
      <form id="login-user" className="flex flex-col gap-4">
        <label>
          <Image
            src={images.IconEmail}
            alt="icon-email"
            width={"20"}
            height={"20 "}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label>
          <Image
            src={images.IconPassword}
            alt="icon-password"
            width={"20"}
            height={"20 "}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={(e) => handleChange(e)}
          />
        </label>
      </form>
    </section>
  );
}

export function SignUpForm() {
  const [newUserData, setNewUserData] = useState({});

  function handleChange(e) {
    console.log(e.target);
  }

  return (
    <section>
      <form id="login-user" className="flex flex-col gap-4">
        <label>
          <Image
            src={images.IconEmail}
            alt="icon-username"
            width={"20"}
            height={"20 "}
          />
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={newUserData.username}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label>
          <Image
            src={images.IconEmail}
            alt="icon-email"
            width={"20"}
            height={"20 "}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={newUserData.email}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label>
          <Image
            src={images.IconPassword}
            alt="icon-password"
            width={"20"}
            height={"20 "}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={newUserData.password}
            onChange={(e) => handleChange(e)}
          />
        </label>
      </form>
    </section>
  );
}
