import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardImg,
  CardText,
} from 'reactstrap';

import logo from '../assets/img/logo.png';
import ModalLogin from './ModalLogin';
import { logout } from '../redux/actions';

class NavbarCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      dropOpen: false,
      dropdownOpen: false,
    };
  }

  btLogout = () => {
    localStorage.removeItem('id');
    this.props.logout();
  };

  totalQty = () => {
    let { cart } = this.props;
    let qty = 0;
    cart.forEach((element) => {
      qty += element.qty;
    });
    return qty;
  };

  render() {
    let { user } = this.props;
    return (
      <Navbar
        color='faded'
        light
        expand='md'
        className='navbar sticky-top navbar-light bg-light border-bottom mb-2 shadow-sm'
        style={{ paddingLeft: 0 }}>
        <NavbarBrand>
          <Link to='/' className='nav-link'>
            <img src={logo} width='80px' alt='logo' />
          </Link>
        </NavbarBrand>
        <NavbarToggler
          onClick={() => this.setState({ collapsed: !this.state.collapsed })}
          className='mr-2'
        />
        <Collapse isOpen={this.state.collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <Link
                to='/product'
                className='nav-link'
                style={{
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontWeight: 700,
                  color: '#000',
                }}>
                Products
              </Link>
            </NavItem>
            <NavItem>
              <Link
                to='/about'
                className='nav-link'
                style={{
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontWeight: 700,
                  color: '#000',
                }}>
                About
              </Link>
            </NavItem>
            <div style={{ marginLeft: '30vw' }}>
              {user.id ? (
                user.role === 'user' ? (
                  <div className='d-flex'>
                    <div>
                      <Dropdown
                        isOpen={this.state.dropdownOpen}
                        toggle={() =>
                          this.setState({
                            dropdownOpen: !this.state.dropdownOpen,
                          })
                        }>
                        <DropdownToggle
                          style={{
                            padding: `5px 30px`,
                            fontSize: '14px',
                            textTransform: 'uppercase',
                            letterSpacing: '3px',
                            backgroundColor: '#363738',
                            marginRight: '2px',
                          }}>
                          Cart
                          <Badge className='ml-1' color='danger'>
                            {this.totalQty()}
                          </Badge>
                        </DropdownToggle>
                        <DropdownMenu>
                          <Card
                            style={{
                              width: '400px',
                              fontSize: '14px',
                              border: 'none',
                            }}>
                            {this.props.cart.length <= 0 ? (
                              <CardBody>Cart is Empy</CardBody>
                            ) : (
                              this.props.cart.map((item, index) => (
                                <div className='row'>
                                  <div
                                    className='col-md-6'
                                    style={{ width: '5vw' }}>
                                    <CardImg
                                      src={item.image}
                                      alt={item.name}
                                      width='2vw'
                                    />
                                  </div>
                                  <div
                                    className='col-md-6'
                                    style={{ width: '15vw' }}>
                                    <CardBody>
                                      <CardText>{item.name}</CardText>
                                      <CardText>Size : {item.size}</CardText>
                                      <CardText>Qty : {item.qty}</CardText>
                                      <CardText>
                                        Price : Rp.{item.price.toLocaleString()}
                                      </CardText>
                                    </CardBody>
                                  </div>
                                </div>
                              ))
                            )}

                            <CardFooter>
                              <Link to='/cart'>Go To Cart</Link>
                            </CardFooter>
                          </Card>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                    <div>
                      {/* User Profile */}
                      <Dropdown
                        isOpen={this.state.dropOpen}
                        toggle={() =>
                          this.setState({ dropOpen: !this.state.dropOpen })
                        }>
                        <DropdownToggle
                          style={{
                            padding: `5px 30px`,
                            fontSize: '14px',
                            textTransform: 'uppercase',
                            letterSpacing: '3px',
                            backgroundColor: '#363738',
                          }}>
                          {user.username}
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem>Profile</DropdownItem>
                          <DropdownItem>
                            <Link
                              to='/cart'
                              style={{
                                textDecoration: 'none',
                                color: '#16181B',
                              }}>
                              Cart
                              <Badge className='ml-1' color='danger'>
                                {this.totalQty()}
                              </Badge>
                            </Link>
                          </DropdownItem>
                          <DropdownItem>
                            <Link
                              to='/transaction'
                              style={{
                                textDecoration: 'none',
                                color: '#16181B',
                              }}>
                              Transaction
                            </Link>
                          </DropdownItem>
                          <DropdownItem onClick={this.btLogout}>
                            Logout
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </div>
                ) : (
                  <>
                    <Dropdown
                      isOpen={this.state.dropOpen}
                      toggle={() =>
                        this.setState({ dropOpen: !this.state.dropOpen })
                      }>
                      <DropdownToggle
                        style={{
                          padding: `5px 30px`,
                          fontSize: '14px',
                          textTransform: 'uppercase',
                          letterSpacing: '3px',
                          backgroundColor: '#363738',
                        }}>
                        {user.username}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>
                          <Link
                            to='product-admin'
                            style={{
                              textDecoration: 'none',
                              color: '#16181B',
                            }}>
                            Products Management
                          </Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link
                            to='/transaction-admin'
                            style={{
                              textDecoration: 'none',
                              color: '#16181B',
                            }}>
                            Transaction Management
                          </Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link
                            to='/slide-admin'
                            style={{
                              textDecoration: 'none',
                              color: '#16181B',
                            }}>
                            Slide Management
                          </Link>
                        </DropdownItem>

                        <DropdownItem onClick={this.btLogout}>
                          Logout
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </>
                )
              ) : (
                <>
                  <ModalLogin />
                  <Button
                    color='secondary'
                    style={{
                      padding: '7px 21px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      backgroundColor: '#363738',
                    }}>
                    <Link
                      to='/register'
                      style={{
                        textDecoration: 'none',
                        color: 'white',
                      }}>
                      Register
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('GET DATA CARTUSER :', state.authReducer.cart);
  console.log('GET DATA CARTUSER PRODUCT :', state.productReducer);
  return {
    cart: state.authReducer.cart,
  };
};

export default connect(mapStateToProps, { logout })(NavbarCom);
