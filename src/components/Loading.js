import React from 'react';
import { connect } from 'react-redux';


const Loading = ({ isLoading }) => (
    isLoading
    ?
    <div className="text-center mt20 mb20">...Loading...</div>
    :
    null
);


export default connect((state) => {
	return {isLoading: state.status.isLoading};
})(Loading);