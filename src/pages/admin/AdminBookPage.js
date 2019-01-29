import React from 'react';
import AdminBookList from '../../components/admin/AdminBookList';
import AdminBookForm from '../../components/admin/AdminBookForm';


class AdminBookPage extends React.Component {
    render(){
        return(
            <div className='admin-page book-page'>
                <h1>HELLO BOOK</h1>
                <AdminBookList />
                <AdminBookForm />
            </div>
        );
    }
}


export default AdminBookPage;