import React from 'react';
import { connect } from 'react-redux';
import { API_URL, fetchData } from '../utils/ApiUtils';
import {
    filterRequest
} from '../redux/actions';


class FilterBox extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            list: []
        };
        this.handleFilter = this.handleFilter.bind(this);
    }

    componentWillMount(){
        if(this.props.filterName){
            fetchData(API_URL+'/api/'+this.props.filterName)
            .then(data => {
            	this.setState({ list: data });
            })
        }
    }

    handleFilter(e){
        const { filterParams, filterName } = this.props;
        this.props.filter && this.props.filter({
            ...filterParams,
            [filterName]: e.target.value
        });
    }

    render(){
        const { placeholder } = this.props;

        return(
            this.state.list.length > 0
            ?
            <select className="filter-box" onChange={this.handleFilter}>
                <option value={''} key={'empty'}>{placeholder || 'Select'}</option>
                {
                    this.state.list.map(item =>
                        <option value={item.id} key={item.id}>{item.name}</option>
                    )
                }
            </select>
            :
            <div>Loading...</div>
        );
    }
}


export default connect(
	state => ({
		filterParams: state.filter
	}),
	dispatch => ({
		filter: q => dispatch(filterRequest(q))
	})
)(FilterBox);