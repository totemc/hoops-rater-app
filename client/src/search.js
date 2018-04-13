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
        let num = 'hello'
        Object.keys(this.state).map((key) => {
            num += ('+' + this.state[key])
        })
	    console.log('reached this func');
	    this.setState((prev) => ({
            madeSearch:true,
            value: '/search/court/' + prev.value
        }))
    }

	render(){
		if(!this.state.madeSearch){
			return (
				<section id="five" className="wrapper style2 special fade">
				   <div className="container">
				      <header>
				         <h2>Hoop Rater</h2>
				      </header>
				      <form onSubmit={this.handleSubmit} className="container 50%">
				         <div className="row uniform 50%">
				            <div className="8u 8u$(xsmall)">
				            	<input type="text" style={{"borderColor":"black"}} name="search" id="email" placeholder="Search..." onChange={this.handleChange} value={this.state.value} />
				            </div>
				            <div className="4u$ 12u$(xsmall)">
				            	<input type="submit" value="Submit" className="fit special" />
				            </div>
				         </div>
				      </form>
				   </div>
				</section>
			)
		}
		else{
			return <Redirect to={this.state.value} />
		}
	}
}

export default Search