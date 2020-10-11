import Axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import Swal from 'sweetalert2';
import { API_URL } from '../assets/path/urls';
import { login, checkout } from '../redux/actions/';

class CartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIdx: null,
      redirect: false,
      totalOrder: 0,
    };
  }

  refreshCart = () => {
    Axios.patch(API_URL + `/users/${this.props.id}`, {
      cart: this.props.cart,
    })
      .then((res) => {
        localStorage.setItem('id', res.data.id);
        this.props.login(res.data);
      })
      .catch((err) => {
        console.log('GET ERROR DELETE CART :', err);
      });
  };

  btIncrement = (index) => {
    // console.log('GET PRODUCT ID ++', this.props.cart[index].idproduct);
    // let id_product_cart = this.props.cart[index].idproduct;
    // let id_product = this.props.product.filter(
    //   (item) => item.id === id_product_cart
    // );
    // console.log(id_product, this.props.cart[index].size);

    // let index_product = this.props.product.indexOf(id_product_cart);
    // console.log('INDEX PRODUCT :', index_product);

    this.props.cart[index].qty += 1;
    this.props.cart[index].total =
      this.props.cart[index].qty * this.props.cart[index].price;
    console.log('GET INDEX', this.props.cart[index]);
    this.setState({ totalQty: this.totalQty() });
    this.refreshCart();
  };

  btDecrement = (index) => {
    let { cart } = this.props;
    cart[index].qty -= 1;
    cart[index].total = cart[index].qty * cart[index].price;
    this.setState({ totalQty: this.totalQty() });
    this.refreshCart();
  };

  btDelete = (index) => {
    this.props.cart.splice(index, 1);
    this.refreshCart();
  };

  decrementStock = (id, stock) => {
    Axios.patch(API_URL + `/products/${id}`, stock)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log('GET ERROR DECREMENT_STOCK:', err);
      });
  };

  btCheckout = () => {
    let date = new Date();
    let obj = {
      idUser: this.props.id,
      username: this.props.user.username,
      date: date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear(),
      cart: this.props.cart,
      status: 'unpaid',
    };

    if (this.props.cart.length > 0) {
      this.props.cart.forEach((item, index) => {
        // let indexProduct = this.props.product.findIndex(
        //   (value) => value.id === item.idproduct
        // );
        // let indexStock = this.props.product[indexProduct].stock.findIndex(
        //   (value) => value.code === item.size
        // );
        // this.props.product[indexProduct].stock[indexStock].total -= item.qty;
        // this.decrementStock(item.idproduct, {
        //   stock: this.props.product[indexProduct].stock,
        // });

        // Cara 1
        this.props.product.forEach((value, idx) => {
          if (item.idproduct === value.id) {
            console.log('sama', item.idproduct, value.id);
            let indexStock = value.stock.findIndex(
              (element) => element.code === item.size
            );
            value.stock[indexStock].total -= item.qty;
            this.decrementStock(value.id, { stock: value.stock });
            console.log('GET ==>', value.stock[indexStock]);
          }
        });
      });

      Axios.post(API_URL + `/userTransactions`, obj)
        .then((res) => {
          Axios.patch(API_URL + `/users/${this.props.id}`, { cart: [] })
            .then((response) => {
              this.setState({ redirect: true });
              this.props.checkout();
              console.log(
                'GET SUCCESS UPDATE PRODUCT REDUCER :',
                response.data
              );
            })
            .catch((error) => {
              console.log(error);
            });
          console.log('GET SUCCESS USER_TRANSACTION :', res.data);
        })
        .catch((err) => console.log(err));
    } else {
      Swal.fire({
        icon: 'warning',
        text: 'Sorry, your shopping cart is empty',
      });
    }
  };

  renderCart = () => {
    return this.props.cart.map((item, index) => {
      return (
        <tr key={index}>
          <th>{index + 1}</th>
          <td>
            <img src={item.image} width='120vw' alt={item.title} />
          </td>
          <td>
            {item.name} - {this.state.totalOrder}
          </td>
          <td>{item.category}</td>
          <td>{item.size}</td>
          <td>{item.price.toLocaleString()}</td>
          <td>
            <div className='d-flex'>
              <Button onClick={() => this.btDecrement(index)}>-</Button>
              <p className='m-3 text-center'>{item.qty}</p>
              <Button onClick={() => this.btIncrement(index)}>+</Button>
            </div>
          </td>
          <td>{item.total.toLocaleString()}</td>
          <td>
            <Button color='danger' onClick={() => this.btDelete(index)}>
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  };

  totalPayment = () => {
    let { cart } = this.props;
    let payment = 0;
    cart.forEach((element) => {
      payment += element.total;
    });
    return payment;
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
    if (this.state.redirect) {
      return <Redirect to='/transaction' />;
    }
    return (
      <div>
        <h1>Cart</h1>
        <hr />
        <Table dark>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Size</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.renderCart()}</tbody>
          <tfoot>
            <tr>
              <th colSpan='6' className='text-center'>
                Total Payment
              </th>
              <th className='text-center'>
                {this.totalQty().toLocaleString()}
              </th>
              <th>{this.totalPayment().toLocaleString()}</th>
              <th>
                <Button color='success' onClick={this.btCheckout}>
                  Checkout
                </Button>
              </th>
            </tr>
          </tfoot>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('GET DATA CARTUSER :', state.authReducer.cart);
  console.log('GET DATA CARTUSER PRODUCT :', state.productReducer);
  return {
    user: state.authReducer,
    cart: state.authReducer.cart,
    id: state.authReducer.id,
    product: state.productReducer,
  };
};

export default connect(mapStateToProps, { login, checkout })(CartPage);
