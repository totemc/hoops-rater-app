import React from react;
import {Redirect} from 'react-router-dom';

class AdvSearch extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            value:'33029',
            zipcode:'test1',
            busiestTime:'',
            membership:'test2',
            hours:'',
            floorQuality:'',
            cleanliness:'',
            courtSize:'',
            netQuality:'',
            netType:'',
            indoorStatus:'',
            hoopHeight:'',
            floorType:'',
            rimQuality:'',
            rimType:'',
            rating:'',
            madeSearch: false
        }
    }
    
    handleChangeZipcode(e){
        console.log('OK ADRIAN!')
        this.setState({zipcode: e.target.value})
    }
    
    handleChangeBusiestTime(e){
        this.setState({busiestTime: e.target.value})
    }
    
    handleChangeMembership(e){
        this.setState({membership: e.target.value})
    }
    
    handleChangeHours(e){
        this.setState({hours: e.target.value})
    }
    
    handleChangeFloorQuality(e){
        this.setState({floorQuality: e.target.value})
    }
    
    handleChangeCleanliness(e){
        this.setState({cleanliness: e.target.value})
    }
    
    handleChangeCourtSize(e){
        this.setState({courtSize: e.target.value})
    }
    
    handleChangeNetQuality(e){
        this.setState({netQuality: e.target.value})
    }
    
    handleChangeNetQuality(e){
        this.setState({netQuality: e.target.value})
    }
    
    handleChangeNetType(e){
        this.setState({netType: e.target.value})
    }
    
    handleChangeIndoorStatus(e){
        this.setState({indoorStatus: e.target.value})
    }
    
    handleChangeHoopHeight(e){
        this.setState({hoopHeight: e.target.value})
    }
    
    handleChangeFloorType(e){
        this.setState({floorType: e.target.value})
    }
    
    handleChangeRimQuality(e){
        this.setState({RimQuality: e.target.value})
    }
    
    handleChangeRimType(e){
        this.setState({courtSize: e.target.value})
    }
    
    handleChangeRating(e){
        this.setState({rating: e.target.value})
    }
    
    handleSubmit(e){
        event.preventDefault();
        let newValue = '/advsearch/court/' + this.state.value;
        Object.keys(this.state).map((key) => {
            if (key != ''){
                newValue += ('+' + this.state[key])
            }
        })
        this.setState({value: e.target.newValue})
        console.log(this.state.value)
    }

    render(){
        if(!this.state.madeSearch){
            return(
            
            )
        } else{
            return <Redirect to={this.state.value} />
        }
    }
}
