import React from 'react';
import './MeetingRating.css';
import { Link, Redirect, Router } from 'react-router-dom';
import { Rating } from './Rating';

export class MeetingRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Title: 'Example Title',
      MeetingDesc: 'Example Description',
      Rating: '',
      RatingDesc: '',
      submit: false,
      postId: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  ratings = [1, 2, 3, 4, 5];

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    alert('Created Review');
    this.setState({
      Title: 'Example Title',
      MeetingDesc: 'Example Description',
      Rating: '',
      RatingDesc: '',
      submit: true
    });
    event.preventDefault();
  }

  render() {
    const submitted = this.state.submit;
    if(submitted){
      return <Redirect to="/dashboard" />
    }
    return (
      <div className="container my-5 py-4">
          <div className="card container py-4" id="ratingCard">
            <h1 className="text-center text-center">Rate This Meeting</h1>
            <p>{this.state.Title}</p>
            <p>{this.state.MeetingDesc}</p>
            <form className="mb-n3" onSubmit={this.handleSubmit}>
              <div className="form-row">
                <div className="form-group col-3">
                  <label htmlFor="Rating">Rating</label>
                  <select id="Rating" className="form-control" value={this.state.Rating}
                  onChange={event => this.setState({Rating: event.target.value})} required>
                    <option></option>
                    {
                        this.ratings.map((x, i) => <option key={ i }>{ x }</option>)
                    }
                  </select>
                </div>
                <div className="form-group col-7"></div>
                <div className="form-group col-2">
                  <div className="pt-4"><Rating value={ this.state.Rating } /></div>
                </div>
              </div>
              <div className="form-group mb-4">
                <textarea rows="5" id="RatingDesc" name="RatingDesc" value={this.state.RatingDesc} 
                placeholder="Leave a comment (optional)" onChange={this.handleChange} className="form-control"/>
              </div>
              <div className="form-row">
                <div className="col-7"></div>
                <Link to={"/post/" + this.state.postId } className="ml-5 btn btn-secondary mb-3 rounded-pill col-2 mr-2">Cancel</Link>
                <input type="submit" value="Submit Review" className="ml-2 btn btn-success mb-3 rounded-pill col-2"/>
              </div>
            </form>
          </div>
      </div>
    )
  }
  componentDidMount() {
    let meetingId = this.props.match.params.meetingId;
    if (meetingId) {
        this.setState({ postId: meetingId });
    }
  }
}