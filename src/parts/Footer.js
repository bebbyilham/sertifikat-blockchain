import React from "react";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="container mx-auto px-4">
      <div className="flex flex-justify-between flex-wrap">
        <div className="w-full sm:w-1/3">
          <h6 className="text-white">Tentang Kami</h6>
          <ul className="mt-4">
            <li className="mt-2">
              <Link
                to="https://"
                target="_blank"
                rel="noopener noreferrer"
                alt="Bebby Ilham"
                className="text-orange-300 hover:text-green-800 hover:underline"
              >
                Bebby Ilham
              </Link>
            </li>
            <li className="mt-2">
              <Link
                to=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-300 hover:text-green-800 hover:underline"
              >
                -
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full sm:w-1/3">
          <h6 className="text-white">Kontak</h6>
          <p className="mt-4 text-orange-300 leading-loose">
            bebbyilham@gmail.com
            <br />
            Kota Padang,
            <br />
            Sumatera Barat 25157
          </p>
        </div>
      </div>
      <div className="border-t pt-8 mt-8 border-orange-300 text-center">
        <p className="text-orange-300">
          2021 Copyright bebbyilham | besignlabs. All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
