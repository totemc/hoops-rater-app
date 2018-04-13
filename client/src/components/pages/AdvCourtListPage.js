import React from 'react';

class AdvCourtList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            response: []
        };
    }
    
    componentDidMount(){
        this.callApi()
          .then(res => {
            this.setState({response: res})
        })
          .catch(err => {
            console.log('Did not setState to response.')
            console.log(err);
        });
    }
    
    callApi = async () => {
        // Talk to our middleware with the zipcode and attributes in question
        const response = await
        
        fetch('/api/advsearch/court/'+this.props.match.params.courtAttributes);
        
        // Get our response body
        const body = await response.json();
        
        // If we do not receive a 200 OK success code, throw an error. The state is not changed.
        // Error prints in the catch in the function call.
        if(resonse.body !==){
           throw Error(body.message)
           }
           return body;
    }
    render(){
        return();
    }
    
}
export default AdvCourtList;