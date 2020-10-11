import Axios from 'axios';
import React from 'react';
import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import Swal from 'sweetalert2';
import { API_URL } from '../assets/path/urls';

class AddCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      title: '',
      image: '',
    };
  }

  handleChange = (property, value) => {
    console.log('GET INPUT VALUE :', value);
    this.setState({ [property]: value });
  };

  btSubmit = () => {
    let { title, image } = this.state;
    if (title === '' || image === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops ....',
        text: 'Fill in the form',
      });
    } else {
      Axios.post(API_URL + `/carousels`, {
        title,
        image,
      })
        .then((res) => {
          Swal.fire({
            icon: 'success',
            title: 'Congratulations',
            text: 'Your submit form has been successful',
          });
          this.props.getSlide();
          this.setState({ modalOpen: false });
        })
        .catch((err) => console.log('ERR SUBMIT CAROUSEL :', err));
    }
  };

  render() {
    return (
      <div style={{ float: 'right', marginBottom: '5px' }}>
        <Button
          onClick={() => this.setState({ modalOpen: !this.state.modalOpen })}
        >
          Add Carousel
        </Button>

        <Modal isOpen={this.state.modalOpen}>
          <ModalHeader>Add Carousel</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Title</Label>
                <Input
                  type='text'
                  onChange={(e) => {
                    this.handleChange('title', e.target.value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label>Image</Label>
                <Input
                  type='text'
                  onChange={(e) => {
                    this.handleChange('image', e.target.value);
                  }}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.btSubmit}>Submit</Button>
            <Button
              onClick={() =>
                this.setState({ modalOpen: !this.state.modalOpen })
              }
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddCarousel;
