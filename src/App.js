import React, { Component } from "react";
import Cert from "../src/abis/Cert.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table, {
  ContractAdress,
  Account,
  SelectColumnFilter,
  DateFormat,
  FileHash,
  ConvertBytes,
} from "./Table";

import "assets/css/style.css";
import Header from "./Header";
import Main from "./Main";
import Web3 from "web3";

const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
}); // leaving out the arguments will default to these values

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      toast.error("Non-Ethereum browser detected.\n Please install metamask", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    console.log(web3);
    // Load account
    const accounts = await web3.eth.getAccounts();
    web3.eth.defaultAccount = accounts[0];
    console.log(accounts);
    this.setState({ account: accounts[0] });
    // Network ID
    const networkId = await web3.eth.net.getId();
    const networkData = Cert.networks[networkId];
    if (networkData) {
      // Assign contract
      const cert = new web3.eth.Contract(Cert.abi, networkData.address);
      this.setState({ cert });
      // Get files amount
      const filesCount = await cert.methods.fileCount().call();
      this.setState({ filesCount });
      // Load files&sort by the newest
      for (var i = filesCount; i >= 1; i--) {
        const file = await cert.methods.files(i).call();
        this.setState({
          files: [...this.state.files, file],
        });
      }
    } else {
      // window.alert("contract not deployed to detected network.");
      toast.warn("contract not deployed to detected network!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  // Get file from user
  captureFile = (event) => {
    event.preventDefault();

    const file = event.target.files[0];
    const reader = new window.FileReader();

    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({
        buffer: Buffer(reader.result),
        type: file.type,
        name: file.name,
      });
      console.log("buffer", this.state.buffer);
    };
  };

  //Upload file
  uploadFile = (description) => {
    console.log("Submitting file to IPFS...");

    // Add file to the IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      console.log("IPFS result", result.size);
      if (error) {
        console.error(error);
        return;
      }

      this.setState({ loading: true });
      // Assign value for the file without extension
      if (this.state.type === "") {
        this.setState({ type: "none" });
      }
      this.state.cert.methods
        .uploadFile(
          result[0].hash,
          result[0].size,
          this.state.type,
          this.state.name,
          description
        )
        .send({ from: this.state.account })
        .on("transactionHash", (hash) => {
          console.log("transaction hash is ", hash);
          this.setState({
            loading: false,
            type: null,
            name: null,
            hash,
          });
          // window.location.reload();
        })
        .on("confirmation", (confirmationNumber, receipt) => {
          // window.location.reload();
          // toast({
          //   render: "transaction success Txn Hash: " + receipt.transactionHash,
          //   type: "success",
          // });

          window.location.reload();
          window.alert(
            "transaction success Txn Hash: " +
              receipt.transactionHash +
              "\n confirmation number:" +
              confirmationNumber
          );
          // toast("transaction success Txn Hash: " + receipt.transactionHash);
          window.open(
            "https://ropsten.etherscan.io/tx/" + receipt.transactionHash,
            "_blank"
          );
          toast.success("Transaction Success", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })

        .on("error", (e) => {
          window.alert("Error");
          this.setState({ loading: false });
        });
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      cert: null,
      files: [],
      loading: false,
      type: null,
      name: null,
      hash: "",
      columns: [
        {
          Header: "File Id",
          accessor: "fileId",
        },
        {
          Header: "Nomor Sertifikat",
          accessor: "fileDescription",
          Cell: ContractAdress,
        },
        {
          Header: "Time",
          accessor: "uploadTime",
          Cell: DateFormat,
          headerClassName: "text-center",
        },
        {
          Header: "File Size",
          accessor: "fileSize",
          Cell: ConvertBytes,
        },
        {
          Header: "Account",
          accessor: "uploader",
          Cell: Account,
          Filter: SelectColumnFilter,
          filter: "includes",
        },
        {
          Header: "File Hash",
          accessor: "fileHash",
          Cell: FileHash,
          filter: "includes",
        },
      ],
    };
  }

  render() {
    return (
      <div>
        <Header account={this.state.account} />
        <ToastContainer />
        <div className="min-h-screen bg-gray-100 text-gray-900">
          {this.state.loading ? (
            <div id="loader" className="text-center">
              <p>Loading...</p>
            </div>
          ) : (
            <section className="container mx-auto pt-28 px-4">
              <Main
                files={this.state.files}
                captureFile={this.captureFile}
                uploadFile={this.uploadFile}
                txhash={this.state.hash}
              />
              <Table columns={this.state.columns} data={this.state.files} />
            </section>
          )}
        </div>
      </div>
    );
  }
}

export default App;
