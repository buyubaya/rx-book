import React from 'react';
import PropTypes from 'prop-types';
import { fetchData } from '../../utils/ApiUtils';
import { ADMIN_API_URL } from '../../constants/ApiUrls';


class AdminBookList extends React.Component {
    constructor(props, context){
        super(props, context);

        this.state = {
            bookList: []
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    static contextTypes = {
        editItem: PropTypes.object,
        handleEdit: PropTypes.func,
        handleAdd: PropTypes.func
    };

    componentDidMount(){
        fetchData(ADMIN_API_URL + '/book')
        .then(data => {
            this.setState({ bookList: data });
        });
    }

    handleEdit(item){
        this.context.handleEdit && this.context.handleEdit(item);
    }

    handleRemove(id){
        fetch(`http://nodejs-book-api.herokuapp.com/book/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(json => {
            console.log('DELETE SUCCESS', json);
        });
    }

    handleAdd(){
        this.context.handleAdd && this.context.handleAdd();
    }

    render(){
        const { bookList } = this.state;

        return(
            <div className='admin-table-area'>
                <div className='row mb10'>
                    <button type='button' className='btn-form fr' onClick={this.handleAdd}>Add</button>
                </div>
                <table className='admin-list-table'>
                    <thead>
                        <tr>
                            <td>No.</td>
                            <td>Image</td>
                            <td>Name</td>
                            <td>Price</td>
                            <td>Edit</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookList && bookList.map((item, index) =>
                                <tr key={item._id}>
                                    <td className='cell-50'>{index + 1}</td>
                                    <td className='cell-100'><img src={`${ADMIN_API_URL}/public/images/${item.img}`} className='w100p' /></td>
                                    <td className='cell-200'>{item.name}</td>
                                    <td className='cell-100'>{item.price}</td>
                                    <td className='cell-100'>
                                        <span className='btn' onClick={() => this.handleEdit(item)}>Edit</span>
                                        <span className='btn' onClick={() => this.handleRemove(item._id)}>X</span>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}


export default AdminBookList;