import Axios from 'axios';
import React from 'react';
import { Button, ButtonGroup, Input, Jumbotron } from 'reactstrap';
import { API_URL } from '../assets/path/urls';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      thumbnail: 0,
      total: 0,
      qty: 0,
      disabled: false,
      totalHarga: 0,
    };
  }

  componentDidMount() {
    this.getProductDetail();
  }

  getProductDetail = () => {
    console.log(this.props.location.search);
    Axios.get(API_URL + `/products${this.props.location.search}`)
      .then((res) => {
        console.log('get products:', res);
        this.setState({ detail: res.data[0] });
      })
      .catch((err) => {
        console.log('get error products:', err);
      });
  };

  renderThumbnail = (images) => {
    return images.map((item, index) => {
      return (
        <div
          key={index}
          className='flex-grow-1 select-image'
          onClick={() => this.setState({ thumbnail: index })}
          style={{ padding: '0 1px' }}>
          <img src={item} width='100%' alt={item.title} />
        </div>
      );
    });
  };

  renderStock = (stock) => {
    return stock.map((item, index) => {
      return (
        <Button
          style={{
            borderRadius: 0,
          }}
          disabled={item.total === 0 && true}
          key={index}
          onClick={() => this.setState({ total: item.total, size: item.code })}>
          {item.code}
        </Button>
      );
    });
  };

  btIncrement = () => {
    if (this.state.qty < this.state.total) {
      this.setState({
        qty: (this.state.qty += 1),
        totalHarga: this.state.qty * this.state.detail.price,
      });
    } else {
      alert('out of stock');
    }
  };

  btAddToCart = () => {
    console.log(
      '=> ADD TO CART :',
      this.state.detail.id,
      this.state.detail.price,
      this.state.qty
    );

    let id = localStorage.getItem('id');

    this.props.cart.forEach((item) => {
      if (
        item.size === this.state.size &&
        item.idproduct === this.state.detail.id
      ) {
        console.log(item.qty, this.state.qty);
        item.qty += this.state.qty;
        item.total = item.qty * this.state.detail.price;
        // Axios.patch(API_URL + `/users/${id}`, { cart: this.props.cart })
        //   .then((response) => {
        //     console.log(response.data);
        //     this.setState({ redirect: true });
        //   })
        //   .catch((err) => console.log('ERROR ADD TO CART :', err));
      } else {
        this.props.cart.push({
          idproduct: this.state.detail.id,
          image: this.state.detail.images[0],
          name: this.state.detail.name,
          category: this.state.detail.category,
          size: this.state.size,
          price: this.state.detail.price,
          qty: this.state.qty,
          total: this.state.qty * this.state.detail.price,
        });

        // this.props.cart.push({
        //   idproduct: this.state.detail.id,
        //   image: this.state.detail.images[0],
        //   name: this.state.detail.name,
        //   category: this.state.detail.category,
        //   size: this.state.size,
        //   price: this.state.detail.price,
        //   qty: this.state.qty,
        //   total: this.state.qty * this.state.detail.price,
        // });

        // Axios.patch(API_URL + `/users/${id}`, {
        //   qty: (this.state.qty += 1),
        //   total: this.state.qty * this.state.detail.price,
        // })
        //   .then((response) => {
        //     console.log(response.data);
        //     this.setState({ redirect: true });
        //   })
        //   .catch((err) => console.log('ERROR ADD TO CART :', err));

        // alert('Product dan Size Sama');
      }
    });

    Axios.patch(API_URL + `/users/${id}`, { cart: this.props.cart })
      .then((response) => {
        console.log(response.data);
        this.setState({ redirect: true });
      })
      .catch((err) => console.log('ERROR ADD TO CART :', err));
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to='/cart' />;
    }

    let { detail, thumbnail } = this.state;
    console.log('GET DETAIL PRODUCT :', detail);
    return (
      <div className='container'>
        {detail.id && (
          <Jumbotron
            className='row p-3'
            style={{ borderRadius: 0, backgroundColor: '#fff' }}>
            <div className='col-12 col-md-5 pr-3 border-right'>
              <img src={detail.images[thumbnail]} width='100%' alt='images' />
              <div className='d-flex mt-1'>
                {this.renderThumbnail(detail.images)}
              </div>
            </div>
            <div className='col-12 col-md-7'>
              <div>
                <h5
                  style={{
                    fontSize: '16px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                  }}>
                  {detail.brand} / {detail.category}
                </h5>
                <br />

                <h1
                  style={{
                    fontSize: '52px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    fontStyle: 'italic',
                  }}>
                  {detail.name}
                </h1>
                <br />
                <h5
                  style={{
                    fontSize: '11px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                  }}>
                  {detail.colour}
                </h5>
                <br />
                <br />
                <h4
                  style={{
                    fontSize: '16px',
                    letterSpacing: '1.5px',
                    fontWeight: 700,
                  }}>
                  Rp.{detail.price.toLocaleString()}
                </h4>
                <h4
                  style={{
                    fontSize: '16px',
                    letterSpacing: '1.5px',
                    lineHeight: '30px',
                  }}>
                  {detail.description}
                </h4>
                <br />
                <div>
                  <ButtonGroup>{this.renderStock(detail.stock)}</ButtonGroup>
                  <p
                    style={{
                      fontSize: '12px',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      marginTop: '5px',
                    }}>
                    Stock : {this.state.total}
                  </p>
                </div>
                <div className='d-flex justify-content-center m-1'>
                  <Button
                    onClick={() =>
                      this.setState({
                        qty: this.state.qty > 0 ? (this.state.qty -= 1) : 0,
                        totalHarga: this.state.qty * this.state.detail.price,
                      })
                    }>
                    -
                  </Button>
                  <Input
                    value={this.state.qty}
                    style={{ width: '4vw' }}
                    className='text-center m-1'
                  />
                  <Button onClick={this.btIncrement}>+</Button>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <h3
                      style={{
                        fontSize: '28px',
                        letterSpacing: '1.5px',
                        fontWeight: 700,
                      }}>
                      Rp. {this.state.totalHarga.toLocaleString()}
                    </h3>
                  </div>
                  <div className='col-md-6'>
                    <Button
                      style={{ float: 'right', width: '8vw' }}
                      onClick={this.btAddToCart}>
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Jumbotron>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('CHECK DATA :', state.authReducer);
  return {
    cart: state.authReducer.cart,
  };
};
// nama, harga, kategori, warna, brand dan deskripsi

export default connect(mapStateToProps)(ProductDetail);
