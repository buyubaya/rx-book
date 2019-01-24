import React, { Component } from 'react';
import './App.css';
import 'rxjs';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import BookList from './components/BookList';


class App extends Component {
	render(){
		return (
			<BrowserRouter>
				<Switch>
					<Route path='/' component={BookList} />
				</Switch>
			</BrowserRouter>
		);
	}
}


export default App;
