import { useState, useContext } from "react";

import Button from "../../../components/button";
import Header from "../../../components/header";
import TextField from "../../../components/text-field";

import Layout from "../../../components/Layout";
import { Context } from "../../../contexts";

export default function OtpPage() {
  const [otp, setOTP] = useState(null);
  const { userId } = useContext(Context);

  const otpHandlerButton = async () => {
    const rawResponse = await fetch("http://localhost:3000/auth/challenge", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        otp: {
          token: otp,
        },
      }),
    });

    const response = await rawResponse.json();

    if (response.passedChallenge) {
      window.location.assign("http://github.com");
    } else {
      alert("No pasa el reto");
    }
  };

  return (
    <Layout>
      <Header title="OTP" />

      <TextField placeholder="otp" changeHandler={(value) => setOTP(value)} />

      <Button title="Aceptar" handler={() => otpHandlerButton()} />
    </Layout>
  );
}
