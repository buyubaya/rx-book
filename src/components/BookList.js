import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProductRequest } from '../redux/actions';
import Book from './Book';
import Pagination from './Pagination';


class BookList extends Component {
	componentWillMount(){
		this.props.fetchProduct();
	}

	render(){
        const { list, count } = this.props;

		return (
			<div>
                <div className='card-list'>
                    {
                        list && list.map(item =>
                            <Book item={item} key={item.id} />
                        )
                    }
                </div>
                <Pagination limit={10} count={count} />
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
