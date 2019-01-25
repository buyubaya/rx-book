import React from 'react';
import { connect } from 'react-redux';
import {
    filterRequest
} from '../redux/actions';


const Pagination = ({page, limit, count, toPage}) => {
	let pArr = [];
	for(let i=1; i<= Math.ceil(count/limit); i++){
		pArr.push(i);
	}
	console.log(22222);
	return(
		Math.ceil(count/limit)>1
		?
		<ul className="pagination">
			{
			pArr.map(item => 
				<li className={(item === page)?'is-active':''} key={item}>
					<a href="javascript:;" onClick={() => toPage(item)}>{item}</a>
				</li>
			)
			}
		</ul>
		:
		null
	)   
};


export default connect(
	null,
	dispatch => ({
		toPage: page => dispatch(filterRequest({page: page}))
	})
)(Pagination);