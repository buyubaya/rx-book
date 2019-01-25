import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProductRequest } from '../redux/actions';
import Book from './Book';
import Pagination from './Pagination';
import Loading from './Loading';
import SearchBox from './SearchBox';
import ClearFilter from './ClearFilter';


class BookList extends Component {
	componentWillMount(){
		this.props.fetchProduct(this.props.filter);
	}

	render(){
        const { list, count, filter } = this.props;
		console.log(this.props.all);
		return (
			<div className='products-page'>
				<SearchBox />
				<ClearFilter />
				<Loading />
                <div className='card-list'>
                    {
                        list && list.map(item =>
                            <Book item={item} key={item.id} />
                        )
                    }
                </div>
                <Pagination page={filter.page} limit={filter.limit} count={count} maxPage={5} />
            </div>
		);
	}
}


export default connect(
	state => ({
		list: state.product.list,
		count: state.product.count,
		filter: state.filter,
		all: state
	}),
	dispatch => ({
		fetchProduct: (payload) => dispatch(fetchProductRequest(payload))
	})
)(BookList);
