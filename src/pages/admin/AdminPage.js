import React from 'react';


class AdminPage extends React.Component {
    render(){
        return(
            <div>
                <h1>ADMIN PAGE</h1>
                {this.props.children}
            </div>
        );
    }
}


export default AdminPage;