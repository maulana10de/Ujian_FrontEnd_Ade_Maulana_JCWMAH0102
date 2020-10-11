import Axios from 'axios';
import React from 'react';
import { Button, Table, UncontrolledCollapse } from 'reactstrap';
import { API_URL } from '../assets/path/urls';

class TransactionAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dbTransaction: [],
    };
  }

  componentDidMount() {
    this.getTransaction();
  }

  getTransaction = () => {
    Axios.get(API_URL + `/userTransactions`)
      .then((res) => {
        this.setState({ dbTransaction: res.data });
      })
      .catch((err) => console.log(err));
  };

  renderTransactions = () => {
    return this.state.dbTransaction.map((item, index) => {
      return (
        <>
          <tr key={index} className='text-center'>
            <td>{index + 1}</td>
            <td>{item.date}</td>
            <td>{item.username}</td>
            <td>{item.status.toUpperCase()}</td>
            <td>
              <Button className='mr-1' id={`toggler${index}`}>
                Detail
              </Button>
              <Button
                disabled={item.status !== 'paid' ? true : false}
                onClick={() => {
                  this.btConfirm(item.id);
                }}>
                Confirm
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

  btConfirm = (id) => {
    Axios.patch(API_URL + `/userTransactions/${id}`, { status: 'Success' })
      .then((res) => {
        this.getTransaction();
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <br />
        <h3 className='text-center'>Order Managements</h3>
        <Table dark>
          <thead className='text-center'>
            <th>No</th>
            <th>Date</th>
            <th>Username</th>
            <th>Status</th>
            <th style={{ width: '10vw' }}>Action</th>
          </thead>
          <tbody>{this.renderTransactions()}</tbody>
        </Table>
      </div>
    );
  }
}

export default TransactionAdmin;
