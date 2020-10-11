import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class Paginate extends Component {
  render() {
    const { itemsPerPage, totalItems, paginate } = this.props;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    console.log(pageNumbers, totalItems);
    return (
      <div>
        <Pagination size='sm' aria-label='Page navigation example'>
          <PaginationItem>
            <PaginationLink first href='#' />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink previous href='#' />
          </PaginationItem>
          {pageNumbers.map((num) => {
            return (
              <PaginationItem>
                <PaginationLink onClick={() => paginate(num)}>
                  {num}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationLink next href='#' />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink last href='#' />
          </PaginationItem>
        </Pagination>
      </div>
    );
  }
}

export default Paginate;
