import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../App.css';
import { connect } from 'react-redux';

function CardProduct({ data }) {
  return (
    <div className='col-12 col-md-4 mb-2 '>
      <Card key={data.id} style={{ borderRadius: 0, margin: '1px' }}>
        <CardImg top width='100%' src={data.images[0]} alt='Card image cap' />
        <Link
          to={`/product-detail?id=${data.id}`}
          style={{ textDecoration: 'none' }}>
          <CardBody className='card-body-hover'>
            <CardSubtitle
              className='text-muted'
              style={{ letterSpacing: '2px' }}>
              {data.category}
            </CardSubtitle>
            <CardTitle
              style={{ letterSpacing: '1.3px', fontWeight: 700, color: '#000' }}
              className='card-body-hover'>
              {data.name}
            </CardTitle>
            <CardSubtitle
              style={{ letterSpacing: '1px', fontWeight: 800, color: '#000' }}>
              {' '}
              Rp. {data.price.toLocaleString()}
            </CardSubtitle>
          </CardBody>
        </Link>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.productReducer,
  };
};

export default connect(mapStateToProps)(CardProduct);
