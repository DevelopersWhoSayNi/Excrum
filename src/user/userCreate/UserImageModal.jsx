import React, { Component } from 'react';
import {
  Modal,
  Segment,
  Header,
  Label,
  Image,
  Button,
  Icon
} from 'semantic-ui-react';

export default class UserImageModal extends Component {
  constructor() {
    super();
    this.state = {
      userImage: '',
      selectedImage: '',
      modalOpen: false
    };
  }

  componentWillMount() {
    if (this.props.currentImage) {
      this.setState({ userImage: this.props.currentImage });
    }
  }

  handleSubmit(e) {
    this.setState({ modalOpen: false });
    this.props.handleSave(this.state.selectedImage);
  }

  renderPhoto() {
    return (
      <div>
        {this.state.userImage ? (
          <img width={200} src={this.state.userImage} />
        ) : (
          <h4>Please Select an Image</h4>
        )}
      </div>
    );
  }

  photoInputHandleChange() {
    let myFile = this.refs.photoInput.files;

    if (myFile && myFile[0]) {
      let FR = new FileReader();
      FR.onload = data => {
        this.setState({
          selectedImage: data.target.result,
          userImage: data.target.result
        });
      };
      FR.readAsDataURL(myFile[0]);
    }
  }

  handleOpen = e =>
    this.setState({
      modalOpen: true
    });

  handleClose = e =>
    this.setState({
      modalOpen: false
    });

  render() {
    return (
      <Modal
        trigger={
          <Label as="a" corner="left" icon="edit" onClick={this.handleOpen} />
        }
        basic
        size="small"
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Header icon="picture" content={this.props.headerMessage} />
        <Modal.Content>
          <Segment.Group style={{ paddingLeft: '140px' }}>
            <Button.Group>
              <Button>
                <input
                  type="file"
                  ref="photoInput"
                  onChange={() => this.photoInputHandleChange()}
                />
              </Button>
              <Button
                color="green"
                type="submit"
                onClick={e => this.handleSubmit(e)}
              >
                <Icon name="save" size="large" />
                Save
              </Button>
              <Button onClick={this.handleClose}>
                <Icon name="cancel" size="large" />
                Cancel
              </Button>
            </Button.Group>
            <br /> <br />
            <Image.Group size="medium" style={{ paddingLeft: '120px' }}>
              <Image size="medium" shape="rounded">
                {this.renderPhoto()}
              </Image>
            </Image.Group>
          </Segment.Group>
        </Modal.Content>
      </Modal>
    );
  }
}
