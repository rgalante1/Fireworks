import React from 'react';
import './MeetingRating.css';
import { Link } from 'react-router-dom';
import { RatingDisplay } from './app/PostDisplayPage';
import { PostsRepository } from './api/PostRepository';
import Post from './models/Post';

export class MeetingRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Rating: '',
      RatingDesc: '',
      Meeting: undefined
    };
  }

  ratings = [1, 2, 3, 4, 5];

  render() {
    let userName = this.props.match.params.userName;

    if (!this.state.Meeting) {
      return (<div />);
    }

    return (<>
      <div className="container my-5 py-4">
          <div className="card container py-4" id="ratingCard">
            <h1 className="text-center text-center">Rate This Meeting</h1>
            <p>"{this.state.Meeting.title}" by {this.state.Meeting.username}</p>
            <p>{this.state.Meeting.description}</p>
            <form className="mb-n3">
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
                  <div className="pt-4"><RatingDisplay value={ this.state.Rating } /></div>
                </div>
              </div>
              <div className="form-group mb-4">
                <textarea rows="5" id="RatingDesc" name="RatingDesc" value={this.state.RatingDesc} 
                placeholder="Leave a comment (optional)" onChange={event => this.setState({RatingDesc: event.target.value})} className="form-control"/>
              </div>
              <div className="form-row">
                <div className="col-7"></div>
                <Link to={"/post/" + this.state.Meeting.id} className="ml-5 btn btn-secondary mb-3 rounded-pill col-2 mr-2">Cancel</Link>
                <input type="button" value="Submit Review" className="ml-2 btn btn-success mb-3 rounded-pill col-2" onClick={e => {
                  new PostsRepository().postRating(this.state.Meeting.id, userName, this.state.RatingDesc, this.state.Rating).then(() => {
                    this.props.history.push("/post/" + this.state.Meeting.id);
                  });
                }}/>
              </div>
            </form>
          </div>
      </div>
      </>
    )
  }

  componentDidMount() {
    const repo = new PostsRepository();
    const meetingId = this.props.match.params.meetingId;

    if (!meetingId) {
      return;
    }

    repo.getMeeting(meetingId).then(result => this.setState({Meeting: new Post(result.meetingID, result.companyID, result.title, result.description, result.eventDate, result.location, result.meetingLink, result.companyName, "", "meeting", result.meetingType)}));
  }
}