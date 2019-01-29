import React from 'react';
import PropTypes from 'prop-types';
import AdminBookList from '../../components/admin/AdminBookList';
import AdminBookForm from '../../components/admin/AdminBookForm';


class AdminBookPage extends React.Component {
    constructor(){
        super();

        this.state = {
            editItem: null,
            addItem: false
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.hideForm = this.hideForm.bind(this);
    }

    static childContextTypes = {
        editItem: PropTypes.object,
        handleEdit: PropTypes.func,
        handleAdd: PropTypes.func
    };

    getChildContext(){
        return({
            editItem: this.state.editItem,
            handleEdit: this.handleEdit,
            handleAdd: this.handleAdd
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

    render(){
        const { editItem, addItem } = this.state;

        return(
            <div className='admin-page book-page'>
                <h1>HELLO BOOK</h1>
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