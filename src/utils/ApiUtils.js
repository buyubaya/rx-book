import { Observable } from 'rxjs/Observable';


export const API_URL = 'https://hieu1801.000webhostapp.com';

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