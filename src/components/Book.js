import React from 'react';
import { connect } from 'react-redux';
import {
    SHOW_ALERT,
    HIDE_ALERT
} from '../constants/ActionTypes';
import { Link } from 'react-router-dom';
import { API_URL } from '../utils/ApiUtils';


const Book = ({item, isAlert, showAlert, hideAlert}) => {
	let cardImg = null;
	let cartClicked = false;
	
	const flying = () => {	
		if(!cartClicked){
			cartClicked = true;
			
			if(cardImg){
                let flyingImg = document.createElement('IMG');
                let styles = `
                    width: ${cardImg.width}px;
                    position: absolute;			
                    left: ${cardImg.offsetLeft}px;
                    top: ${cardImg.offsetTop}px;
                    transition: 1s;
                `;
                flyingImg.setAttribute('src', cardImg.src);
                flyingImg.setAttribute('style', styles);
                document.body.appendChild(flyingImg);

                let iconCart = document.getElementById('icon-cart');
                let transform = {
                    width: 0,
                    left: iconCart ? iconCart.offsetLeft+'px' : '0',
                    top: iconCart ? iconCart.offsetTop+'px' : '0'
                };
                setTimeout(() => {
                    for(let x in transform){
                        flyingImg.style[x] = transform[x];
                    }
                }, 0)
                setTimeout(() => {
                    flyingImg.parentNode.removeChild(flyingImg);
                    cartClicked = false;
                }, 1000)  
            } 
		}
		else {
			showAlert({error: true, message: 'CLICKED'});
			setTimeout(() => {
				hideAlert();
			}, 1000);
		}
	}
	
	return(        
		<div className="card-product mb40">
			<div className="card-img">
				<Link to={'product/'+item.id}><img className="w100p" src={API_URL+'/public/images/'+item.img} alt="" ref={el => cardImg = el} /></Link>
			</div>
			<div className="card-content pt10">
				<p className="card-name text-center">{item.name}</p>
				<a onClick={flying} href="javascript:;" className="btnAddToCart">Buy</a>
			</div>
		</div>
	);
};


export default connect(
	state => ({
		isAlert: state.status.showAlert
	}),
	dispatch => ({
		showAlert: payload => dispatch({type: SHOW_ALERT, payload}),
		hideAlert: () => dispatch({type: HIDE_ALERT})
	})
)(Book);