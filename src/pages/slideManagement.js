import Axios from 'axios';
import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardFooter,
} from 'reactstrap';
import { API_URL } from '../assets/path/urls';
import AddCarousel from '../components/AddCarousel';
import EditCarousel from '../components/EditCarousel';

class SlideManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dbSlide: [],
      selectedIdx: null,
      editOpen: false,
    };
  }

  componentDidMount() {
    this.getSlide();
  }

  getFilter = () => {
    let order = this.order.value;
    Axios.get(API_URL + `/carousels?_sort=title&_order=${order}`)
      .then((res) => {
        console.log('GET CAROUSEL :', res.data);
        this.setState({ dbSlide: res.data });
      })
      .catch((err) => console.log('ERR GET CAROUSEL :', err));
  };

  getSlide = () => {
    Axios.get(API_URL + `/carousels`)
      .then((res) => {
        console.log('GET CAROUSEL :', res.data);
        this.setState({ dbSlide: res.data });
        this.getFilter();
      })
      .catch((err) => console.log('ERR GET CAROUSEL :', err));
  };

  renderSlide = () => {
    return this.state.dbSlide.map((item, index) => {
      return (
        <tr key={index}>
          <th>{index + 1}</th>
          <td>
            <img src={item.image} width='400vw' alt={item.title} />
          </td>
          <td>{item.title}</td>
          <td>
            <Button
              color='warning'
              onClick={() =>
                this.setState({
                  editOpen: !this.state.editOpen,
                  selectedIdx: index,
                })
              }
              style={{ marginRight: '5px' }}>
              Edit
            </Button>
            <Button color='danger' onClick={() => this.btDelete(item.id)}>
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  };

  renderSlider = () => {
    console.log('test');
    return this.state.dbSlide.map((item, index) => {
      return (
        <div className='col-12 col-md-4'>
          <Card key={index}>
            <CardImg src={item.image} />
            <CardBody>
              <CardTitle>{item.title}</CardTitle>
            </CardBody>
            <CardFooter>
              <Button
                color='warning'
                onClick={() =>
                  this.setState({
                    editOpen: !this.state.editOpen,
                    selectedIdx: index,
                  })
                }
                style={{ marginRight: '5px' }}>
                Edit
              </Button>
              <Button color='danger' onClick={() => this.btDelete(item.id)}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    });
  };

  btDelete = (id) => {
    console.log('GET ID DELETE:', id);
    Axios.delete(API_URL + `/carousels/${id}`)
      .then((res) => this.getSlide())
      .catch((err) => {
        console.log('ERR FROM DELETE:', err);
      });
  };

  render() {
    return (
      <div className='row'>
        <div className='col-md-12'>
          <br />
          <h3 className='text-center'>Master Slider</h3>
          <AddCarousel getSlide={this.getSlide} />
          <Form>
            <FormGroup className='col-md-4 p-0'>
              <Input
                type='select'
                innerRef={(value) => (this.order = value)}
                onClick={this.getFilter}>
                <option value='Asc'>Sort by Asc</option>
                <option value='Desc'>Sort by Desc</option>
              </Input>
            </FormGroup>
          </Form>
        </div>

        {/* form sorting */}

        {/* start card slider */}
        {/* <Table dark>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.renderSlider()}</tbody>
        </Table> */}
        {this.renderSlider()}
        {this.state.selectedIdx !== null && (
          <EditCarousel
            editOpen={this.state.editOpen}
            editClose={() =>
              this.setState({
                editOpen: !this.state.editOpen,
                selectedIdx: null,
              })
            }
            data={this.state.dbSlide[this.state.selectedIdx]}
            getSlide={this.getSlide}
          />
        )}
      </div>
    );
  }
}

export default SlideManagement;
