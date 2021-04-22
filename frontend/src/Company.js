import React from 'react';
import './CreatePage.css';

export class Company extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            CompanyName: '',
            CompnayDesc: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.props.onChange(event);
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({[name]: value});
    }

    render(){
        return(<>
        <label htmlFor="CompanyName">
            <input type="text" id="CompanyName" name="CompanyName" value={this.state.Name} 
              placeholder="Company Name" onChange={this.handleChange} className="form-control" required/>
        </label>
        <label htmlFor="CompanyDesc" >
            <textarea id="CompanyDesc" name="CompanyDesc" value={this.state.Name} rows="3"
            placeholder="Description" onChange={this.handleChange} className="form-control" required/>
        </label>
        </>);
    }
} 