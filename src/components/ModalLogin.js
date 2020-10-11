import React from 'react';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Alert,
} from 'reactstrap';
import { connect } from 'react-redux';
import { login, Login } from '../redux/actions';

class ModalLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      users: [],
      username: '',
      password: '',
      message: '',
      color: '',
      isOpenTrigger: false,
      success: false,
    };
  }

  handleChange = (property, value) => {
    this.setState({ [property]: value });
  };

  btToggle = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  btLogin = () => {
    let { username, password } = this.state;
    if (username === '' || password === '') {
      this.setState({
        message: 'Fill in the form',
        color: 'danger',
        isOpenTrigger: !this.state.isOpenTrigger,
      });
    } else {
      let query =
        username.includes('@') || username.includes('.') ? `email` : `username`;
      this.props.Login(query, username, password);
      // Axios.get(API_URL + `/users` + url + `&password=${password}`)
      //   .then((res) => {
      //     console.log('username in axios get', res.data.length);
      //     if (res.data.length === 0) {
      //       this.setState({
      //         message: 'Your username or password is wrong',
      //         color: 'danger',
      //         isOpenTrigger: !this.state.isOpenTrigger,
      //         success: false,
      //       });
      //     } else {
      //       localStorage.setItem('id', res.data[0].id);
      //       this.props.login(res.data[0]);
      //       this.setState({
      //         message: 'Your login has been successful',
      //         color: 'success',
      //         isOpenTrigger: !this.state.isOpenTrigger,
      //         success: true,
      //       });
      //       // this.props.keep();
      //     }
      //   })
      //   .catch((err) => {
      //     console.log('error user login:', err);
      //   });
    }
  };

  btToggle = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  render() {
    if (this.state.isOpenTrigger) {
      setTimeout(
        () =>
          this.setState({
            isOpenTrigger: !this.state.isOpenTrigger,
            modalOpen: this.state.success ? !this.state.modalOpen : true,
          }),
        1500
      );
    }
    return (
      <>
        <Button
          color='secondary'
          style={{
            margin: '2px',
            padding: '7px 32px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            backgroundColor: '#363738',
          }}
          onClick={this.btToggle}
        >
          Login
        </Button>

        <Modal isOpen={this.state.modalOpen}>
          <ModalHeader>Login</ModalHeader>
          <ModalBody>
            <Alert color={this.state.color} isOpen={this.state.isOpenTrigger}>
              {this.state.message}
            </Alert>
            <Form>
              <FormGroup>
                <Label>Username</Label>
                <Input
                  type='text'
                  innerRef={(item) => (this.username = item)}
                  onChange={(e) => {
                    this.handleChange('username', e.target.value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  type='password'
                  innerRef={(item) => (this.password = item)}
                  onChange={(e) =>
                    this.handleChange('password', e.target.value)
                  }
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color='success' onClick={this.btLogin}>
              Sign In
            </Button>
            <Button color='secondary' onClick={this.btToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default connect(null, { login, Login })(ModalLogin);
