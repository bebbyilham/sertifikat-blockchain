import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import users from "constants/api/users";

import { ReactComponent as RegisterImages } from "assets/images/register-image.svg";

import useForm from "helpers/hooks/useForm";
import fieldErrors from "helpers/fieldErrors";

import Select from "components/Form/Select";
import Input from "components/Form/Input";

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

  return (
    <div className="flex justify-center items-center pb-24">
      <div className="w-full sm:w-3/12">
        <h1 className="text-4xl text-orange-500 mb-6">
          <span className="font-bold">Registrasi </span>
          Data
          <br />
          <span className="text-green-800 font-bold"> Sertifikat </span>
        </h1>
        <form onSubmit={submit}>
          <Input
            value={name}
            error={ERRORS?.name?.message}
            name="name"
            onChange={setState}
            placeholder="Masukan nama lengkap"
            labelName="Nama"
          />
          <Input
            value={badanHukum}
            error={ERRORS?.badanHukum?.message}
            name="badanHukum"
            onChange={setState}
            placeholder="Masukan nama Badan Hukum"
            labelName="Badan Hukum"
          />
          <Input
            value={tanggal}
            error={ERRORS?.tanggal?.message}
            name="tanggal"
            onChange={setState}
            placeholder="Masukan tanggal Badan Hukum"
            labelName="Tanggal"
          />
          <Input
            value={nik}
            error={ERRORS?.nik?.message}
            name="nik"
            onChange={setState}
            placeholder="Masukan NIK "
            labelName="NIK"
          />
          <Input
            value={nomorSertifikat}
            error={ERRORS?.nomorSertifikat?.message}
            name="nomorSertifikat"
            onChange={setState}
            placeholder="Masukan Nomor Sertifikat "
            labelName="Nomor Sertifikat"
          />
          <Input
            value={tanggalSertifikat}
            error={ERRORS?.tanggalSertifikat?.message}
            name="tanggalSertifikat"
            onChange={setState}
            placeholder="Masukan Tanggal Sertifikat "
            labelName="Tanggal Sertifikat"
          />
          <Input
            value={email}
            error={ERRORS?.email?.message}
            name="email"
            type="email"
            onChange={setState}
            placeholder="Masukan alamat email"
            labelName="Email"
          />

          {/* <Select
            labelName="Profesi"
            name="profession"
            value={profession}
            fallbackText="Pilih profesi"
            onClick={setState}
          >
            <option value="Mahasiswa">Mahasiswa</option>
            <option value="others">Lainnya</option>
          </Select> */}

          {/* {profession === "others" && (
            <Input
              value={otherProfession}
              error={ERRORS?.otherProfession?.message}
              name="otherProfession"
              type="text"
              onChange={setState}
              placeholder="Masukan nama lainnya"
              labelName="profesi lainnya"
            />
          )} */}

          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 mt-1 w-full"
          >
            Daftar
          </button>
        </form>
      </div>

      <div className="w-1/12 hidden sm:block"></div>
      <div className="w-5/12 hidden sm:block flex justify-end pt-24 pr-0 pl-20">
        <div className="relative" style={{ width: 369, height: 440 }}>
          <div className="absolute w-full h-full -mb-8 -ml-2">
            <div className="absolute w-full h-full -mb-8 -ml-2">
              <RegisterImages></RegisterImages>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(LoginForm);
