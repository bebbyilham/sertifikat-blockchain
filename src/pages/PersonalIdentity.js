import React, { useEffect } from "react";

import { useSelector } from "react-redux";

import Sidebar from "parts/Sidebar";
import PersonalIdentityForm from "parts/PersonalIdentityForm";
export default function PersonalIdentity() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const DETAILS = useSelector((state) => state.users);

  return (
    <div className="flex">
      <Sidebar></Sidebar>

      <main className="flex-1">
        <div className="px-4 sm:px-16">
          <section className="flex flex-col mt-8 pl-12 sm:pl-0">
            <h1 className="text-xl sm:text-4xl text-gray-900 font-medium">
              Identitas Keperawatan
            </h1>
            <p className="text-sm sm:text-lg text-gray-600">
              Data Profil Keperawatan
            </p>
          </section>

          <PersonalIdentityForm details={DETAILS}></PersonalIdentityForm>
        </div>
      </main>
    </div>
  );
}