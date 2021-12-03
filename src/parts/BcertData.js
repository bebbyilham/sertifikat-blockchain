import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import users from "constants/api/users";

import { ReactComponent as RegisterImages } from "assets/images/register-image.svg";

import useForm from "helpers/hooks/useForm";
import fieldErrors from "helpers/fieldErrors";

// import Select from "components/Form/Select";
import Bcert from "components/Bcert";

function LoginForm({ history }) {
  const [
    {
      name,
      badanHukum,
      tanggal,
      nik,
      nomorSertifikat,
      tanggalSertifikat,
      email,
      profession,
      otherProfession,
    },
    setState,
  ] = useForm({
    name: "",
    badanHukum: "",
    tanggal: "",
    nik: "",
    nomorSertifikat: "",
    tanggalSertifikat: "",
    email: "",
    profession: "",
    otherProfession: "",
  });

  const [errors, seterrors] = useState(null);

  async function submit(e) {
    e.preventDefault();

    users
      .register({
        name,
        badanHukum,
        tanggal,
        nik,
        nomorSertifikat,
        tanggalSertifikat,
        email,
        profession: profession === "others" ? otherProfession : profession,
      })
      .then((res) => {
        history.push("/login");
      })
      .catch((err) => {
        seterrors(err?.response?.data?.message);
      });
  }

  const ERRORS = fieldErrors(errors);

  return <Bcert />;
}

export default withRouter(LoginForm);
