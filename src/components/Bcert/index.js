import React, { useState, useEffect, useRef } from "react";
import propTypes from "prop-types";
import Web3 from "web3";

export default function Bcert() {
  //state local

  async function componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3;
    console.log(web3);
  }

  //jika cek komponen react siap atau belum
  //jika siap
  return (
    <>
      {componentWillMount}
      {loadWeb3}
      {loadBlockchainData}
    </>
  );
}

// Modal.defaultProps = {};
// Modal.propTypes = {
//   in: propTypes.bool,
//   toggleModal: propTypes.func,
//   content: propTypes.func.isRequired,
// };
