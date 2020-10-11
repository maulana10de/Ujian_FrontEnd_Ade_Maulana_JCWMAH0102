import Axios from 'axios';
import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
} from 'reactstrap';
import Swal from 'sweetalert2';
import { API_URL } from '../assets/path/urls';

class EditCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.data.id,
      title: props.data.title,
      image: props.data.image,
    };
  }

  handleChange = (property, value) => {
    this.setState({ [property]: value });
  };

  btSave = () => {
    let { title, image, id } = this.state;
    console.log('GET SAVE DATA CAROUSEL', title);
    console.log('GET SAVE DATA CAROUSEL', image);

    Axios.patch(API_URL + `/carousels/${id}`, { title, image })
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Congratulations',
          text: 'Your Update form has been successful',
        });
        this.props.getSlide();
        this.props.editClose();
        // this.setState({ closeModal: !this.state.closeModal });
        console.log('close modal status :', this.state.closeModal);
      })
      .catch((err) => console.log('ERROR SAVE CAROUSEL :', err));
  };

  render() {
    let { title, image } = this.state;
    return (
      <div>
        <Modal isOpen={this.props.editOpen}>
          <ModalHeader>Edit Carousel</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Title</Label>
                <Input
                  value={title}
                  type='text'
                  onChange={(e) => this.handleChange('title', e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Image</Label>
                <Input
                  value={image}
                  type='text'
                  onChange={(e) => this.handleChange('image', e.target.value)}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.btSave}>Save</Button>
            <Button onClick={this.props.editClose}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditCarousel;
