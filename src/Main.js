import React, { Component } from "react";

class Main extends Component {
  render() {
    return (
      <div className="flex justify-center items-center pb-10">
        <div className="row">
          <div className="content">
            <p>&nbsp;</p>
            <div>
              <div className="md:grid md:grid-cols-3 md:gap-6 lg:grid lg:grid-cols-3 lg:gap-6">
                <div className="md:col-span-1 lg:col-span-1">
                  <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Nomor Sertifikat
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Isi Nomor Sertifikat dan unggah file Sertifikat
                    </p>
                  </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      const description = this.fileDescription.value;
                      this.props.uploadFile(description);
                    }}
                  >
                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                      <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-3">
                            <input
                              id="fileDescription"
                              type="text"
                              ref={(input) => {
                                this.fileDescription = input;
                              }}
                              className="mb-2 bg-white focus:outline-none border px-5 py-2 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md  "
                              placeholder="Nomor Sertifikat"
                              required
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-4">
                            <input
                              type="file"
                              onChange={this.props.captureFile}
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                          type="submit"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
                        >
                          <b>Upload</b>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="hidden sm:block" aria-hidden="true">
              <div className="py-5">
                <div className="border-t border-gray-200" />
              </div>
            </div>
          </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
