import React from 'react';
import {Redirect} from 'react-router-dom';

class Court extends React.Component{
    state = {
        response: []
    };

    componentDidMount(){
        this.callApi()
        .then(res => {
            this.setState({ response: res})
        })
        .catch(err => {
            console.log('Did not setState to response.');
            console.log(err)
        });
    }

    callApi = async () => {
        // Talk to our middleware with the courtName in question.
        const response = await
        fetch('/api/court/'+this.props.match.params.nameParam);
        
        // Get our response body
        const body = await response.json();
        
        // If we do not receive a 200 OK success code, throw an error. The state is not changed.
        //Error prints in the catch in the function call.
        if (response.status !== 200){
            throw Error(body.message)
        };
        return body;
    };
    
    render(){
        return(
            <div>
                {this.state.response.map((response, index) => (<h1> {response.court_name}</h1>))}
            </div>
            
        );
    }
}
export default Court;