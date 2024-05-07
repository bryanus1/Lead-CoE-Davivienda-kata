import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/button";
import Header from "../../components/header";
import TextField from "../../components/text-field";

import Layout from "../../components/Layout";
import { Context } from "../../contexts";

export default function SignInPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const { setUserId } = useContext(Context);

  const acceptHandlerButton = async () => {
    const rawResponse = await fetch("http://localhost:3000/auth/sign-in", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const response = await rawResponse.json();

    console.log(response);

    setUserId(response.userId);
    if (response.challengeType === "OTP") {
      navigate("/challenge/otp");
    }

    if (response.challengeType === "PRODUCT") {
      navigate("/challenge/product");
    }

    if (response.challengeType === "WORD_COMBINATION") {
      navigate("/challenge/word");
    }
  };

  const cancelHandlerButton = () => {
    console.log("Cancel");
  };

  return (
    <Layout>
      <Header title="LOGIN" />

      <TextField
        placeholder="username"
        changeHandler={(value) => setUsername(value)}
      />
      <TextField
        placeholder="password"
        type="password"
        changeHandler={(value) => setPassword(value)}
      />

      <div className="flex flex-row gap-5">
        <Button title="Aceptar" handler={() => acceptHandlerButton()} />
        <Button title="Cancelar" handler={() => cancelHandlerButton()} />
      </div>
    </Layout>
  );
}
