import React, { useEffect } from "react";

import Header from "parts/Header";
import Footer from "parts/Footer";
import RegisterForm from "parts/RegisterForm";
import BcertData from "parts/BcertData";

export default function Register({ history }) {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <section className="container mx-auto pt-10 px-4 guest-page relative z-10">
        <Header onLight></Header>
      </section>
      <section className="container mx-auto pt-10 px-4">
        <RegisterForm></RegisterForm>
      </section>
      <section className="container mx-auto pt-10 px-4">
        <BcertData></BcertData>
      </section>
      <section className="mt-24 bg-orange-500 py-12">
        <Footer></Footer>
      </section>
    </>
  );
}
