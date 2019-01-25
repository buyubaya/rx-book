import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProductRequest } from '../redux/actions';
import Book from './Book';
import Pagination from './Pagination';
import Loading from './Loading';
import SearchBox from './SearchBox';
import SortBox from './SortBox';
import FilterBox from './FilterBox';
import ClearFilter from './ClearFilter';
import CartTable from './CartTable';


class BookList extends Component {
	constructor(props){
		super(props);

		this.handleClickIconCart = this.handleClickIconCart.bind(this);
	}
		
	componentWillMount(){
		this.props.fetchProduct(this.props.filter);
	}

	handleClickIconCart(e){
		this.icon_cart.classList.toggle('is-active');
	}

	render(){
		const { list, count, filter, cart } = this.props;
		const totalQty = cart.list && cart.list.reduce((total, current) => total + current.qty, 0);
		console.log(this.props.all);
		return (
			<div className='products-page'>
				<div className='cart-area text-right'>
					<span id='icon-cart' ref={el => this.icon_cart = el} onClick={this.handleClickIconCart}>
						<img src={require('../images/icon-cart.png')} />
						{
							totalQty > 0 &&
							<span className='notification'>{totalQty}</span>
						}
					</span>
					{
						cart.list && cart.list.length > 0 && <CartTable />
					}
				</div>
				<div className='filter-area'>
					<div className='filter-row row'>
						<div className='column column-8-sm'>
							<SearchBox />
						</div>
						<div className='column column-4-sm'>
							<SortBox />
						</div>
					</div>
					<div className='filter-row row'>
						<div className='column column-4-sm'>
							<FilterBox 
								filterName='cate'
								placeholder='Select category'
							/>
						</div>
						<div className='column column-4-sm'>
							<FilterBox 
								filterName='author'
								placeholder='Select author'
							/>
						</div>
						<div className='column column-4-sm'>
							<FilterBox 
								filterName='brand'
								placeholder='Select brand'
							/>
						</div>
					</div>
					<ClearFilter />
					<div className='item-found'>
						Results: {count}
					</div>
				</div>
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
		cart: state.cart,
		all: state
	}),
	dispatch => ({
		fetchProduct: (payload) => dispatch(fetchProductRequest(payload))
	})
)(BookList);
