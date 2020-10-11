import React from 'react';
import Axios from 'axios';
import { Button, Table, UncontrolledCollapse } from 'reactstrap';
import Swal from 'sweetalert2';
import { API_URL } from '../assets/path/urls';
import { connect } from 'react-redux';
import { KeepLogin } from '../redux/actions/authAction';

class Transaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dbTransaction: [],
    };
  }

  componentDidMount() {
    this.getTransaction();
  }

  // fungsi getTransaction di filter berdasarkan user id,
  // jadi yang akan tampil hanya yang punya user id tersebut
  getTransaction = () => {
    Axios.get(
      API_URL + `/userTransactions?idUser=${localStorage.getItem('id')}`
    )
      .then((res) => {
        console.log('GET SUCCESS GET_TRANSACTION:', res.data);
        this.setState({ dbTransaction: res.data });
        this.props.KeepLogin();
      })
      .catch((err) => {
        console.log('GET ERROR GET_TRANSACTION:', err);
      });
  };

  btPayment = (id) => {
    // update menggunakan metode patch, yang hanya mengganti "status" menjadi "paid"
    Axios.patch(API_URL + `/userTransactions/${id}`, { status: 'paid' })
      .then((res) => {
        Swal.fire({
          icon: 'success',
          text: 'Your payment has been successful',
        });
        this.getTransaction();

        console.log('GET SUCCESS BT-PAYMENT:', res.data);
      })
      .catch((err) => {
        console.log('GET ERROR BT-PAYMENT:', err);
      });
  };

  renderTransaction = () => {
    return this.state.dbTransaction.map((item, index) => {
      return (
        <>
          <tr key={index} className='text-center'>
            <td>{index + 1}</td>
            <td>{item.date}</td>
            <td>{item.username.toUpperCase()}</td>
            <td>{item.status.toUpperCase()}</td>
            <td>
              <Button className='mr-1' id={`toggler${index}`}>
                Detail
              </Button>
              <Button
                disabled={item.status !== 'unpaid' ? true : false}
                onClick={() => this.btPayment(item.id)}>
                Payment
              </Button>
            </td>
          </tr>
          <UncontrolledCollapse toggler={`#toggler${index}`}>
            <thead>
              <tr>
                <th>No</th>
                <th>Product</th>
                <th>Name</th>
                <th>Category</th>
                <th>Size</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Amount Price</th>
              </tr>
            </thead>
            {item.cart.map((elem, idx) => {
              return (
                <tbody>
                  <tr className='text-center'>
                    <td>{idx + 1}</td>
                    <td>
                      <img src={elem.image} alt={elem.name} width='100vw' />
                    </td>
                    <td>{elem.name}</td>
                    <td>{elem.category}</td>
                    <td>{elem.size}</td>
                    <td>{elem.qty}</td>
                    <td>{elem.price}</td>
                    <td>{elem.total}</td>
                  </tr>
                </tbody>
              );
            })}
          </UncontrolledCollapse>
        </>
      );
    });
  };

  // renderDetailCart = () => {
  //   return this.state.dbTransaction.map((item, index) => {
  //     return item.cart.map((elem, idx) => {
  //       return (
  //         <div>
  //           <UncontrolledCollapse toggler={`#toggler${index}`}>
  //             <Table dark>
  //               <thead>
  //                 <tr className='text-center'>
  //                   <th>No</th>
  //                   <th>Product</th>
  //                   <th>Name</th>
  //                   <th>Category</th>
  //                   <th>Size</th>
  //                   <th>Qty</th>
  //                   <th>Price</th>
  //                   <th>Amount Price</th>
  //                 </tr>
  //               </thead>
  //               <tbody></tbody>
  //             </Table>
  //           </UncontrolledCollapse>
  //         </div>
  //       );
  //     });
  //   });
  // };

  render() {
    return (
      <div>
        <h1>Your Transaction</h1>
        <hr />
        <Table dark>
          <thead>
            <tr className='text-center'>
              <th>#</th>
              <th>Transaction Date</th>
              <th>Name</th>
              <th>Status</th>
              <th style={{ width: '10vw' }}>Action</th>
            </tr>
          </thead>
          <tbody>{this.renderTransaction()}</tbody>
        </Table>
      </div>
    );
  }
}

export default connect(null, { KeepLogin })(Transaction);
