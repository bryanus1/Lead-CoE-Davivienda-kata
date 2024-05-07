import { useState, useContext } from "react";

import Button from "../../../components/button";
import Header from "../../../components/header";
import TextField from "../../../components/text-field";

import Layout from "../../../components/Layout";
import { Context } from "../../../contexts";

export default function ProductPage() {
  const [documentNumber, setDocumentNumber] = useState(null);
  const [documentType, setDocumentType] = useState(null);
  const [productNumber, setProductNumber] = useState(null);
  const [keyProduct, setKeyProduct] = useState(null);
  const { userId } = useContext(Context);

  const productHandlerButton = async () => {
    const rawResponse = await fetch("http://localhost:3000/auth/challenge", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        product: {
          documentNumber,
          documentType,
          productNumber,
          keyProduct,
        },
      }),
    });

    const response = await rawResponse.json();

    if (rawResponse.ok) {
      if (response.passedChallenge) {
        window.location.assign("http://github.com");
      } else {
        alert("No pasa el reto");
      }
    } else {
      alert(response.message);
    }
  };

  return (
    <Layout>
      <Header title="RETO SERVICIO EXTERNO" />

      <TextField
        placeholder="Tipo Identificación"
        changeHandler={(value) => setDocumentType(value)}
      />
      <TextField
        type="number"
        placeholder="Número Identificación"
        changeHandler={(value) => setDocumentNumber(Number(value))}
      />
      <TextField
        type="number"
        placeholder="Número Producto"
        changeHandler={(value) => setProductNumber(Number(value))}
      />
      <TextField
        placeholder="Clave Producto"
        changeHandler={(value) => setKeyProduct(value)}
      />

      <Button title="Aceptar" handler={() => productHandlerButton()} />
    </Layout>
  );
}
