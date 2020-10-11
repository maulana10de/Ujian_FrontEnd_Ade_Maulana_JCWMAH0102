import React from 'react';
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Jumbotron,
  Label,
  Progress,
} from 'reactstrap';
import { API_URL } from '../assets/path/urls';
import Axios from 'axios';
import swal from 'sweetalert2';
import { Redirect } from 'react-router-dom';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      username: '',
      email: '',
      phone: '',
      password: '',
      confpassword: '',
      userValid: false,
      mailValid: false,
      passValue: 0,
      passLvl: '',
      passNotif: '',
      uMessages: '',
    };
  }

  handleChange = (property, value) => {
    // String validation with regex
    let abjad = /[a-z]/i;
    let numb = /[0-9]/;
    let symbol = /[!@#$%^&*():]/;
    let domain = /(.id|.com|.co.id|.edu|.tech)/;

    // membuat properti objek menggunakan string, ['nama property']
    this.setState({ [property]: value });
    // validation for username
    if (property === 'username') {
      this.setState({
        userValid: abjad.test(value) && numb.test(value) ? true : false,
        mailValid:
          abjad.test(value) && symbol.test(value) && domain.test(value)
            ? true
            : false,
      });
      Axios.get(API_URL + `/users?username=${value}`)
        .then((res) => {
          if (res.data.length > 0 && value.length > 1) {
            this.setState({
              uMessages: 'Username All Ready Exist',
              userValid: false,
            });
          } else {
            this.setState({
              uMessages: 'Username ',
            });
          }
        })
        .catch((err) => console.log(err));
    }

    // validation for email
    else if (property === 'email') {
      this.setState({
        mailValid:
          abjad.test(value) && symbol.test(value) && domain.test(value)
            ? true
            : false,
      });
    }

    // validation for password
    else if (property === 'password') {
      if (
        abjad.test(value) &&
        !numb.test(value) &&
        !symbol.test(value) &&
        value.length > 5
      ) {
        this.setState({
          passValue: 30,
          passLvl: 'Weak',
          passNotif: 'danger',
        });
      } else if (
        abjad.test(value) &&
        numb.test(value) &&
        !symbol.test(value) &&
        value.length > 5
      ) {
        this.setState({
          passValue: 70,
          passLvl: 'Middle',
          passNotif: 'warning',
        });
      } else if (
        abjad.test(value) &&
        numb.test(value) &&
        symbol.test(value) &&
        value.length > 5
      ) {
        this.setState({
          passValue: 100,
          passLvl: 'Strong',
          passNotif: 'success',
        });
      } else {
        this.setState({
          passValue: 15,
          passLvl: 'Easy',
          passNotif: 'danger',
        });
      }
    }
  };

  btRegister = () => {
    // Data dari state
    let {
      username,
      email,
      phone,
      password,
      confpassword,
      userValid,
      mailValid,
    } = this.state;

    if (username === '') {
      swal.fire({
        icon: 'error',
        title: 'Oops ....',
        text: 'Fill in the form',
      });
    } else {
      if (password === confpassword && userValid && mailValid) {
        Axios.get(API_URL + `/users?username=${username}`).then((res) => {
          if (res.data.length > 0 && username) {
            alert('username already registered');
          } else {
            Axios.post(API_URL + `/users`, {
              username,
              email,
              phone,
              password,
              cart: [],
              role: 'user',
            })
              .then((res) => {
                localStorage.setItem('id', res.data.id);
                this.setState({ redirect: true });

                swal.fire({
                  icon: 'success',
                  title: 'Congratulations',
                  text: 'Your registration has been successful',
                });

                Axios.get(API_URL + `/users?id=${res.data.id}`)
                  .then((res) => localStorage.setItem('id', res.data.id))
                  .catch((err) => {
                    console.log(err);
                  });
                // this.refreshPage();
                // this.props.redirectLogin();
              })
              .catch((err) => {
                console.log('error user register:', err);
              });
          }
        });
      } else {
        swal.fire({
          icon: 'error',
          title: 'Oops ....',
          text: 'Your password not Match',
        });
      }
    }
  };

  refreshPage = () => {
    window.location.reload(false);
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to='/' />;
    }

    return (
      <div className='container'>
        <Jumbotron
          className='my-2'
          style={{ borderRadius: 0, backgroundColor: '#fff' }}
        >
          <div className='row'>
            <div className='col-12 col-sm-7 p-0 '>
              <img
                src={require('../assets/img/small-banner.jpg')}
                alt='adidas'
                width='100%'
              />
            </div>
            <div className='col-12 col-sm-5'>
              <Form>
                <FormGroup>
                  <Label>Username</Label>
                  <Input
                    type='text'
                    innerRef={(item) => (this.username = item)}
                    onChange={(e) =>
                      this.handleChange('username', e.target.value)
                    }
                    valid={this.state.userValid}
                    invalid={
                      this.state.username.length > 0 && !this.state.userValid
                    }
                  />
                  <FormFeedback valid>Username Valid</FormFeedback>
                  <FormFeedback>{this.state.uMessages}</FormFeedback>

                  <FormText color='black'>
                    Username harus huruf dan angka
                  </FormText>
                </FormGroup>
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    type='email'
                    innerRef={(item) => (this.email = item)}
                    onChange={(e) => this.handleChange('email', e.target.value)}
                    valid={this.state.mailValid}
                    invalid={
                      this.state.email.length > 0 && !this.state.mailValid
                    }
                  />
                  <FormFeedback valid>Email Valid</FormFeedback>
                  <FormFeedback>Email Invalid</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label>Phone</Label>
                  <Input
                    type='text'
                    innerRef={(item) => (this.phone = item)}
                    onChange={(e) => this.handleChange('phone', e.target.value)}
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
                    className='mb-2'
                    placeholder='Min. 6 Character ( Abjad, Number, Symbol)'
                  />
                  {this.state.password.length > 5 && (
                    <Progress
                      value={this.state.passValue}
                      color={this.state.passNotif}
                    >
                      {this.state.passLvl}
                    </Progress>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Confirm Password</Label>
                  <Input
                    type='password'
                    innerRef={(item) => (this.confpassword = item)}
                    onChange={(e) =>
                      this.handleChange('confpassword', e.target.value)
                    }
                  />
                </FormGroup>
              </Form>
              <Button
                outline
                color='info'
                onClick={this.btRegister}
                style={{
                  padding: '7px 27px',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                }}
              >
                Register
              </Button>
            </div>
          </div>
        </Jumbotron>
      </div>
    );
  }
}

export default RegisterPage;
