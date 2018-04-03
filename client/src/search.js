import React from 'react';
import {Redirect} from 'react-router-dom';


class Search extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			value:'',
			madeSearch:false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e){
		console.log('changing the value in form!')
		this.setState({value:e.target.value});
	}


	handleSubmit(event) {
	  event.preventDefault();
	  console.log('reached this func');
	  this.setState((prev) => ({
	  	madeSearch:true,
	  	value: '/search/court/' + prev.value
	  }))


	}

	render(){
		if(!this.state.madeSearch){
			return (
				<form onSubmit={this.handleSubmit}>
				  <label>
				    Name:
				    <input type="text" name="name" onChange={this.handleChange} value={this.state.value} />
				  </label>
				  <input type="submit" value="Submit"/>
				</form>
			)
		}
		else{
			return <Redirect to={this.state.value} />
		}
	}
}

export default Search