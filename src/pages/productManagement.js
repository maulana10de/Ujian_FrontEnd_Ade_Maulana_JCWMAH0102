import Axios from 'axios';
import React from 'react';
import {
  Badge,
  Button,
  Dropdown,
  Table,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';
import { API_URL } from '../assets/path/urls';
import AddProduct from '../components/AddProduct';
import EditProduct from '../components/EditProduct';
import Paginate from '../components/Pagination';

class ProductManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dbProducts: [],
      selectedIdx: null,
      editOpen: false,
      dropdownOpen: false,
      totalStock: 0,
      currentPage: 1,
      itemsPerPage: 5,
    };
  }

  componentDidMount() {
    this.getProduct();
  }

  btSort = (param, order) => {
    Axios.get(API_URL + `/products?_sort=${param}&_order=${order}`)
      .then((res) => {
        console.log('get product success:', res.data);
        this.setState({ dbProducts: res.data });
      })
      .catch((err) => {
        console.log('get error:', err);
      });
  };

  getProduct = () => {
    Axios.get(API_URL + `/products`)
      .then((res) => {
        console.log('get product success:', res.data);
        this.setState({ dbProducts: res.data });
      })
      .catch((err) => {
        console.log('get error:', err);
      });
  };

  btDelete = (id) => {
    console.log('GET ID DELETE:', id);
    Axios.delete(API_URL + `/products/${id}`)
      .then((res) => this.getProduct())
      .catch((err) => {
        console.log('ERR FROM DELETE:', err);
      });
  };

  renderProduct = () => {
    const indexOfLastItem = this.state.currentPage * this.state.itemsPerPage;
    const indexOfFirstItems = indexOfLastItem - this.state.itemsPerPage;
    const currentItems = this.state.dbProducts.slice(
      indexOfFirstItems,
      indexOfLastItem
    );

    return currentItems.map((item, index) => {
      return (
        <tr key={index}>
          <th>{index + 1}</th>
          <td>
            <img src={item.images[0]} width='90vw' alt={item.name} />
          </td>
          <td>{item.name}</td>
          <td>{item.brand}</td>
          <td>{item.category}</td>
          <td>{item.colour}</td>
          <td>{item.description.substr(0, 150)} </td>
          <td>{this.renderStock(item.stock)}</td>
          <td>Rp.{item.price.toLocaleString()}</td>
          <td>
            <Button
              color='warning'
              onClick={() =>
                this.setState({
                  editOpen: !this.state.editOpen,
                  selectedIdx: index,
                })
              }
              style={{ marginBottom: '5px', padding: '7px 20px' }}>
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

  renderStock = (stock) => {
    return stock.map((item, index) => {
      return (
        <Badge
          key={index}
          style={{ fontSize: '14px', width: '5vw', marginBottom: '2px' }}>
          {item.code} = Stock : {item.total}
        </Badge>
      );
    });
  };

  render() {
    const paginate = (pageNumber) => this.setState({ currentPage: pageNumber });
    return (
      <div>
        <br />
        <h3 className='text-center'>Master Product</h3>
        <div className='d-flex justify-content-between'>
          {/* button sorting */}
          <Dropdown
            isOpen={this.state.dropdownOpen}
            toggle={() =>
              this.setState({ dropdownOpen: !this.state.dropdownOpen })
            }>
            <DropdownToggle caret>Sorting</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => this.btSort('name', 'asc')}>
                Sort by Name Asc
              </DropdownItem>
              <DropdownItem onClick={() => this.btSort('name', 'desc')}>
                Sort by Name Desc
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => this.btSort('price', 'desc')}>
                Sort by Max Price
              </DropdownItem>
              <DropdownItem onClick={() => this.btSort('price', 'asc')}>
                Sort by Min Price
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => this.btSort('brand', 'asc')}>
                Sort by Brand Asc
              </DropdownItem>
              <DropdownItem onClick={() => this.btSort('brand', 'desc')}>
                Sort by Brand Desc
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => this.btSort('stock.total', 'desc')}>
                Sort by Stock
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {/* button add product */}
          <AddProduct getProduct={this.getProduct} />
        </div>
        <Table dark>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Colour</th>
              <th>Description</th>
              <th>Stock</th>
              <th>Total Stock</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.renderProduct()}</tbody>
        </Table>
        <Paginate
          paginate={paginate}
          totalItems={this.state.dbProducts.length}
          itemsPerPage={this.state.itemsPerPage}
        />
        {this.state.selectedIdx !== null && (
          <EditProduct
            getProduct={this.getProduct}
            editOpen={this.state.editOpen}
            editClose={() =>
              this.setState({
                editOpen: !this.state.editOpen,
                selectedIdx: null,
              })
            }
            data={this.state.dbProducts[this.state.selectedIdx]}
          />
        )}
      </div>
    );
  }
}

export default ProductManagement;
