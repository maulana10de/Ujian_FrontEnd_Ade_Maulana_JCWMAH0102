import Axios from 'axios';
import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
} from 'reactstrap';
import swal from 'sweetalert2';
import { API_URL } from '../assets/path/urls';

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      name: '',
      brand: '',
      category: '',
      colour: '',
      description: '',
      price: 0,
      sizeShoes: [38, 39, 40, 41, 42],
      sizeClothing: ['S', 'M', 'L', 'XL', 'XXL'],
      listGambar: ['images1', 'images2', 'images3', 'images4', 'images5'],
    };
  }

  handleChange = (property, value) => {
    console.table(value);
    this.setState({ [property]: value });
  };

  btSubmit = () => {
    let stock = [],
      images = [];
    let { name, brand, category, colour, description, price } = this.state;

    if (
      name === '' ||
      brand === '' ||
      category === '' ||
      colour === '' ||
      description === '' ||
      price === ''
    ) {
      swal.fire({
        icon: 'error',
        title: 'Oops ....',
        text: 'Fill in the form',
      });
    } else {
      this.state[`size${this.state.category}`].forEach((item, index) => {
        stock.push({
          code: item.toString(),
          total: parseInt(
            this[`code${item}`].value === '' ? 0 : this[`code${item}`].value
          ),
        });
      });

      this.state.listGambar.forEach((item, index) => {
        if (this[item].value.length > 0) {
          images.push(this[item].value);
        }
      });

      Axios.post(API_URL + `/products`, {
        name,
        brand,
        category,
        colour,
        description,
        price,
        stock,
        images,
      })
        .then((res) => {
          swal.fire({
            icon: 'success',
            title: 'Congratulations',
            text: 'Your submit form has been successful',
          });
          this.props.getProduct();
          this.setState({ modalOpen: false });
        })
        .catch((err) => {
          console.log('error user register:', err);
        });
    }
  };

  renderInputStock = () => {
    let { category } = this.state;
    if (category === '') {
      return <p>Waiting Category</p>;
    } else {
      return this.state[`size${category}`].map((item, index) => {
        return (
          <FormGroup className='flex-grow-1' key={index}>
            <Label>{item}</Label>
            <Input
              type='number'
              innerRef={(value) => (this[`code${item}`] = value)}
            />
          </FormGroup>
        );
      });
    }
  };

  render() {
    return (
      <div style={{ marginBottom: '5px' }}>
        <Button
          onClick={() => this.setState({ modalOpen: !this.state.modalOpen })}
        >
          Add Product
        </Button>

        <Modal isOpen={this.state.modalOpen}>
          <ModalHeader>Add Product</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Name</Label>
                <Input
                  type='text'
                  onChange={(e) => {
                    this.handleChange('name', e.target.value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label>Image</Label>
                <div className='d-flex flex-wrap'>
                  {this.state.listGambar.map((item, index) => {
                    return (
                      <Input
                        key={index}
                        style={{ width: '30%' }}
                        type='text'
                        innerRef={(value) => (this[item] = value)}
                        placeholder={`Images ${index + 1}`}
                      />
                    );
                  })}
                </div>
              </FormGroup>
              <div className='row'>
                <div className='col-md-4'>
                  <FormGroup>
                    <Label>Brand</Label>
                    <Input
                      type='text'
                      onChange={(e) =>
                        this.handleChange('brand', e.target.value)
                      }
                    />
                  </FormGroup>
                </div>
                <div className='col-md-4'>
                  <FormGroup>
                    <Label>Category</Label>
                    <Input
                      type='select'
                      name='select'
                      onChange={(e) =>
                        this.handleChange('category', e.target.value)
                      }
                    >
                      <option>Selected...</option>
                      <option value='Shoes'>Shoes</option>
                      <option value='Clothing'>Clothing</option>
                    </Input>
                  </FormGroup>
                </div>
                <div className='col-md-4'>
                  <FormGroup>
                    <Label>Colour</Label>
                    <Input
                      type='text'
                      onChange={(e) =>
                        this.handleChange('colour', e.target.value)
                      }
                    />
                  </FormGroup>
                </div>
              </div>

              <FormGroup>
                <Label>Description</Label>
                <Input
                  type='textarea'
                  onChange={(e) =>
                    this.handleChange('description', e.target.value)
                  }
                />
              </FormGroup>

              <FormGroup>
                <Label>Stock</Label>
                <div className='d-flex'>{this.renderInputStock()}</div>
              </FormGroup>

              <FormGroup>
                <Label>Price</Label>
                <Input
                  type='number'
                  onChange={(e) =>
                    this.handleChange('price', parseInt(e.target.value))
                  }
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

export default AddProduct;
