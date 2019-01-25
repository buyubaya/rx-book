import React from 'react';
import { connect } from 'react-redux';
import {
    CLEAR_FILTER
} from '../constants/ActionTypes';


const ClearFilter = ({ isFiltered, clearFilter }) => {
	let defaultStyle = {
		padding: '10px',
		color: '#fff',
		border: '1px solid #000',
		background: '#000',
		cursor: 'pointer',
	};
	return(
		isFiltered?<h1 style={defaultStyle} className="btnClearFilter" onClick={clearFilter}>CLEAR FILTER</h1>:null
	)
};


export default connect(
	state => ({
		isFiltered: state.status.isFiltered
	}),
	dispatch => ({
		clearFilter: () => dispatch({type: CLEAR_FILTER})
	})
)(ClearFilter);