import React from 'react';
import PropTypes from 'prop-types';
import AdminBookList from '../../components/admin/AdminBookList';
import AdminBookForm from '../../components/admin/AdminBookForm';
import { ADMIN_API_URL } from '../../constants/ApiUrls';


class AdminBookPage extends React.Component {
    constructor(){
        super();

        this.state = {
            editItem: null,
            addItem: false,
            bookList: []
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.hideForm = this.hideForm.bind(this);
        this._removeItemFromBookList = this._removeItemFromBookList.bind(this);
        this._addItemToBookList = this._addItemToBookList.bind(this);
        this._handleSubmitSuccess = this._handleSubmitSuccess.bind(this);
    }

    static childContextTypes = {
        bookList: PropTypes.array,
        editItem: PropTypes.object,
        handleEdit: PropTypes.func,
        handleAdd: PropTypes.func,
        hideForm: PropTypes.func,
        _removeItemFromBookList: PropTypes.func,
        _addItemToBookList: PropTypes.func,
        _handleSubmitSuccess: PropTypes.func
    };

    getChildContext(){
        return({
            bookList: this.state.bookList,
            editItem: this.state.editItem,
            handleEdit: this.handleEdit,
            handleAdd: this.handleAdd,
            hideForm: this.hideForm,
            _removeItemFromBookList: this._removeItemFromBookList,
            _addItemToBookList: this._addItemToBookList,
            _handleSubmitSuccess: this._handleSubmitSuccess
        });
    }

    componentDidMount(){
        fetch(ADMIN_API_URL + '/book')
        .then(res => res.json())
        .then(data => {
            this.setState({ bookList: data });
        });
    }

    handleEdit(item){
        this.setState({ editItem: item, addItem: false });
    }

    handleAdd(){
        this.setState({ editItem: null, addItem: true });
    }

    hideForm(){
        this.setState({ editItem: null, addItem: false });
    }

    _removeItemFromBookList(id){
        console.log('DELETE', id);
        fetch(`http://localhost:4000/book/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(json => {
            let { bookList } = this.state;
            bookList = bookList.filter(item => item._id !== id)
            this.setState({ bookList });
            console.log('DELETE SUCCESS', json);
        })
        .catch(err => console.log('DELETE ERROR', err));
    }

    _addItemToBookList(item){
        let { bookList } = this.state;
        bookList.push(item);
        this.setState({ bookList });
    }

    _handleSubmitSuccess(data){
        console.log('AFTER SUBMIT');
        
        // const { editItem } = this.props;

        // if(editItem === null){
        //     const { _addItemToBookList } = this._addItemToBookList;
        //     _addItemToBookList(data);
        //     console.log('ADD ITEM TO BOOK LIST', data);
        // }

        this.hideForm();
    }

    render(){
        const { editItem, addItem } = this.state;

        return(
            <div className='admin-page book-page'>
                <AdminBookList />
                {
                    (editItem || addItem) &&
                    <div className='overlay' onClick={this.hideForm}>
                        <div className='overlay-inner' onClick={this.stopPropagation}>
                            <AdminBookForm editItem={editItem} />
                        </div>
                    </div>
                }
            </div>
        );
    }
}


export default AdminBookPage;