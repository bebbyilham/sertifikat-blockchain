import React from "react";
import propTypes from "prop-types";

import { Link, withRouter } from "react-router-dom";
import { ReactComponent as Logo } from "assets/images/logo.svg";

function Header({ onLight, location }) {
  const linkColor = onLight ? "text-white sm:text-gray-900" : "text-white";

  // const Account = React.useState(() => null);
  // const [bcert, type, name] = React.useState(() => null);
  // const [files, setUser] = React.useState(() => []);
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const [state, setState] = React.useState({
    account: "",
    dstorage: null,
    files: [],
    loading: false,
    type: null,
    name: null,
  });

  const linkCTA =
    location.pathname.indexOf("/login") > -1 ? `/register` : `/login`;
  const textCTA =
    location.pathname.indexOf("/login") > -1 ? "Daftar" : "Wallet Address";

  const classNameLogo = onLight
    ? toggleMenu
      ? "on-dark"
      : "on-light"
    : "on-light";
  return (
    <header
      className={[
        "flex justify-between items-center",
        toggleMenu ? "fixed w-full -mx-4 px-4" : "",
      ].join(" ")}
    >
      <div style={{ height: 54 }} className="z-50">
        <Link to="/">
          <Logo className={classNameLogo}></Logo>
        </Link>
      </div>
      {/* <div className="flex sm:hidden">
        <button
          onClick={() => setToggleMenu((prev) => !prev)}
          className={["toggle z-50", toggleMenu ? "active" : ""].join(" ")}
        ></button>
      </div> */}

      <ul
        className={[
          "transition-all duration-200 items-center fixed inset-0 bg-orange-500 pt-24 md:pt-0 md:bg-transparent md:relative md:flex md:opacity-100 md:visible",
          toggleMenu ? "opacity-100 visible z-20" : "opacity-0 invisible",
        ].join(" ")}
      >
        {/* <li className="leading-10">
          <a
            rel="noopener noreferrer"
            className={[
              linkColor,
              "hover:text-green-900 text-lg px-6 py-3 my-4 sm:my-0 font-medium",
            ].join(" ")}
            href={`${process.env.REACT_APP_FRONTPAGE_URL}`}
          >
            Beranda
          </a>
        </li> */}
        <li className="leading-10">
          <Link
            to="/"
            className={[
              linkColor,
              "hover:text-green-900 text-lg px-6 py-3 my-4 sm:my-0 font-medium",
            ].join(" ")}
          >
            Tentang Kami
          </Link>
        </li>

        <li className="leading-10">
          {state.account ? (
            <a
              target="_blank"
              rel="noopener noereferrer"
              href={linkCTA}
              className="btn-login hover:bg-green-900 transition-all duration-200 text-white hover:text-teal-500 text-lg px-6 py-3 font-medium ml-6 inline-flex items-center"
            >
              <span className="rounded-full overflow-hidden mr-3 ring-2 ring-white">
                {state.account}
              </span>
              Hi, {state.account}
            </a>
          ) : (
            <a
              target="_blank"
              rel="noopener noereferrer"
              href={linkCTA}
              className="btn-login bg-green-800 hover:bg-green-900 transition-all duration-200 text-white hover:text-teal-500 text-lg px-6 py-3 font-medium ml-6"
            >
              {state.account}
            </a>
          )}
        </li>
      </ul>
    </header>
  );
}

Header.prototype = {
  onLight: propTypes.bool,
};

export default withRouter(Header);
