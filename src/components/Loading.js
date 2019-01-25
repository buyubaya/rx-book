import React from 'react';
import { connect } from 'react-redux';


const Loading = ({ isLoading, count }) => (
    isLoading
    ?
    <div className="text-center mt20 mb20">...Loading...</div>
    :
    <div className="text-center mt20 mb20">{count + ' items found'}</div>
);


export default connect((state) => {
	return {isLoading: state.status.isLoading, count: state.product.count};
})(Loading);