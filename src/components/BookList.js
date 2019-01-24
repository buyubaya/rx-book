import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProductRequest } from '../redux/actions';
import Book from './Book';


class BookList extends Component {
	componentWillMount(){
		this.props.fetchProduct();
	}

	render(){
        const { list } = this.props;

		return (
			<div className='card-list'>
				{
                    list && list.map(item =>
                        <Book item={item} key={item.id} />
                    )
                }
			</div>
		);
	}
}


export default connect(
	state => ({
		list: state.product.list,
		count: state.product.count,
		filter: state.filter
	}),
	dispatch => ({
		fetchProduct: (payload) => dispatch(fetchProductRequest(payload))
	})
)(BookList);
