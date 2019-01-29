import { Observable } from 'rxjs/Observable';


export const API_URL = 'https://hieu1801.000webhostapp.com';
export const ADMIN_API_URL = 'http://nodejs-book-api.herokuapp.com';

export const fetchAPI = (params={}) => {
	let q = [];
	for(let param in params){
		if(params[param]){
			q.push(param+'='+params[param]);   
		}
	}
	q = q.length?q = '?'+q.join('&'):'';
	return Observable.fromPromise(
		fetch(API_URL+`/api/product`+q)
		.then(res => res.json())
	);
};

export function fetchData(url){
	return new Promise((rs,rj) => {
		fetch(url)
		.then(res => res.json()) 
		.then(data => {
			rs(data);
		});
	});
}