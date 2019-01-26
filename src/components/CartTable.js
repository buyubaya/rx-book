import React from 'react';
import { connect } from 'react-redux';
import { API_URL } from '../utils/ApiUtils';
import { REMOVE_FROM_CART, EDIT_CART_ITEM } from '../constants/ActionTypes';


class CartTable extends React.Component {
    constructor(props){
        super(props);

        this.editQty = this.editQty.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        window.addEventListener('click', this.handleClick);
    }

    componentWillUnMount(){
        window.removeEventListener('click', this.handleClick);
    }

    handleClick(e){
        if(this.cart_table && !this.cart_table.contains(e.target)){
            const iconCart = document.getElementById('icon-cart');
            iconCart.classList.remove('is-active');
        }
    }

    editQty(id, qty){
        const { editQty } = this.props;
        editQty && editQty(id, qty);
    }

    removeFromCart(id){
        const { removeFromCart } = this.props;
        removeFromCart && removeFromCart(id);
    }

    render(){
        const { cart } = this.props;
        
        return(
            <div className='cart-table' ref={el => this.cart_table = el}>
                <table>
                    <thead>
                        <tr className='tr-heading'>
                            <td className='td-img'>Image</td>
                            <td className='td-name'>Name</td>
                            <td className='td-qty'>Quantity</td>
                            <td className='td-price-unit'>Price / Unit</td>
                            <td className='td-price'>Price</td>
                            <td className='td-edit'>Edit</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.list.map(item =>
                                <tr key={item.id}>
                                    <td className='td-img'><img className='w100p' src={API_URL+'/public/images/'+item.img} alt="" /></td>
                                    <td className='td-name'>{item.name}</td>
                                    <td className='td-qty'>
                                        <div className='qty-group'>
                                            <span className='btn-edit-cart' onClick={() => this.editQty(item.id, item.qty + 1)}>+</span>
                                            <span className='btn-edit-cart'>{item.qty}</span>
                                            <span className='btn-edit-cart' onClick={() => this.editQty(item.id, item.qty - 1)}>-</span>
                                        </div>
                                    </td>
                                    <td className='td-price-unit'>{item.price}</td>
                                    <td className='td-price'>{item.price * item.qty}</td>
                                    <td className='td-edit'><span className='btn-edit-cart' onClick={() => this.removeFromCart(item.id)}>X</span></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}


export default connect(
    state => ({
        cart: state.cart
    }),
    dispatch => ({
        editQty: (id, qty) => dispatch({type: EDIT_CART_ITEM, payload: { id, qty }}),
        removeFromCart: id => dispatch({type: REMOVE_FROM_CART, payload: { id }})
    })
)(CartTable);