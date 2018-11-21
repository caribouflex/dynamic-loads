import React, { Component } from "react";

class FileUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadURL: this.props.uploadURL,
      uploadTitle: this.props.uploadTitle,
      childrens: this.props.childrens
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append("file", this.uploadInput.files[0]);
    data.append("filename", this.fileName.value);

    fetch(this.state.uploadURL, {
      method: "POST",
      body: data
    })
      .then(response => {
        console.log("Upload Succeed !");
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div style={{ border: "1px solid #e3e3e3" }}>
        {this.state.uploadTitle}
        <form onSubmit={this.handleUploadImage}>
          <div>
            <input
              ref={ref => {
                this.uploadInput = ref;
              }}
              type="file"
            />
          </div>
          <div>
            <input
              ref={ref => {
                this.fileName = ref;
              }}
              type="text"
              placeholder="Enter the component name"
            />
          </div>
          <br />
          <div>
            <button>Upload</button>
          </div>
        </form>
      </div>
    );
  }
}
export default FileUpload;
