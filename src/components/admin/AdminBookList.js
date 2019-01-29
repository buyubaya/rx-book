import React from 'react';
import { ADMIN_API_URL, fetchData } from '../../utils/ApiUtils';


class AdminBookList extends React.Component {
    constructor(props, context){
        super(props, context);

        this.state = {
            bookList: []
        };
    }

    componentDidMount(){
        fetchData(ADMIN_API_URL + '/book')
        .then(data => {
            console.log('HELLO', data);
            this.setState({ bookList: data });
        });
    }

    render(){
        const { bookList } = this.state;

        return(
            <div className='admin-table-area'>
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
                                        <span className='btn'>Edit</span>
                                        <span className='btn'>X</span>
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