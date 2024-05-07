import { useState, useContext } from "react";

import Button from "../../../components/button";
import Header from "../../../components/header";
import TextField from "../../../components/text-field";
import TextAreaField from "../../../components/text-area-field";

import Layout from "../../../components/Layout";
import { Context } from "../../../contexts";

export default function WordPage() {
  const [word, setWord] = useState(null);
  const [phrase, setPhrase] = useState(null);
  const [key, setKey] = useState(null);
  const { userId } = useContext(Context);

  const wordHandlerButton = async () => {
    const rawResponse = await fetch("http://localhost:3000/auth/challenge", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        wordCombination: {
          word,
          phrase,
          key,
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
      <Header title="RETO COMBINACIÓN DE PALABRAS" />

      <TextField
        placeholder="Palabra"
        changeHandler={(value) => setWord(value)}
      />
      <TextAreaField
        placeholder="Frase"
        changeHandler={(value) => setPhrase(value)}
      />
      <TextField placeholder="Clave" changeHandler={(value) => setKey(value)} />

      <Button title="Aceptar" handler={() => wordHandlerButton()} />
    </Layout>
  );
}
