import React from 'react';
import './CreatePostPage';

export class Meeting extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date: '',
            time: '',
            loc: '',
            virtual: '',
            disabled: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleVirtual = this.handleVirtual.bind(this);
    }

    handleChange(event){
        this.props.onChange(event);
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({[name]: value});
    }

    handleVirtual(event){
        if(!this.state.disabled){
          this.setState({
            disabled: true,
            loc: 'Virtual'
          });
        }
        else{
          this.setState({
            disabled: false,
            loc: ''
          });
        }
        this.handleChange(event);
      }

    render(){
        return(<>
        <label htmlFor="loc" id="loc">
            <input type="text" id="loc" name="loc" value={this.state.loc} placeholder="Location"
            disabled={(this.state.disabled) ? "disabled" : ""} onChange={this.handleChange} 
            className="form-control" required/>
          </label>
          <label htmlFor="date">
            <input type="date" id="date" name="date" value={this.state.date} 
            onChange={this.handleChange} className="form-control" required/>
          </label>
          <label htmlFor="time">
            <input type="time" id="time" name="time" value={this.state.time} 
            onChange={this.handleChange} className="form-control" required/>
          </label>
          <label htmlFor="virtual" className="form-check">
            <input type="checkbox" id="virtual" name="virtual" value={this.state.verified} 
            onChange={this.handleVirtual} className="form-check-input" />
            <span className="checkboxText">Virtual</span>
          </label>
        </>);
    }
} 