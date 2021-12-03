// eslint-disable-next-line
import React, { Component } from "react";
import { ReactComponent as Logo } from "assets/images/logo.svg";
import Identicon from "identicon.js";

class Header extends Component {
  render() {
    return (
      <>
        <header
          style={{ height: 100 }}
          className="flex justify-between items-center fixed w-full px-0 mx-auto h-20 mb-10 bg-green-500"
        >
          <div className="ml-6">
            <Logo />
          </div>
          <ul>
            <li className="leading-10">
              <a
                target="_blank"
                rel="noopener noereferrer noreferrer"
                href={"https://etherscan.io/address/" + this.props.account}
                className="btn-login bg-blue-300 hover:bg-blue-900 transition-all duration-200 text-indigo-900 hover:text-blue-300 text-lg px-4 py-2 font-medium ml-6 inline-flex items-center mr-3"
              >
                <span id="account" className="rounded-full overflow-hidden">
                  {this.props.account
                    ? this.props.account.substring(0, 6)
                    : "Connect Wallet"}
                  ...
                  {this.props.account
                    ? this.props.account.substring(38, 42)
                    : ""}
                </span>
                {this.props.account ? (
                  <img
                    alt=""
                    className="h-10 w-10 rounded-full ml-2"
                    width="30"
                    height="30"
                    src={`data:image/png;base64,${new Identicon(
                      this.props.account,
                      30
                    ).toString()}`}
                  />
                ) : (
                  <span></span>
                )}
              </a>
            </li>
          </ul>
        </header>
      </>
    );
  }
}

export default Header;
