import React, { Component } from 'react';
import {
  Link,
  withRouter
} from 'react-router-dom';
import { Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../app.css';
import getUploadedFileName from '../utils/getUploadedFileName';


class NewCampground extends Component {
  state = {
    name: '',
    imageFile: null,
    description: '',
    campLocation: '',
    price: '',
    errorMessage: null,
    message: 'Select Campground Image (Required)'
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  renderAlert = () => {
    const { errorMessage } = this.state;
    if (errorMessage) {
      return (
        <Alert variant="danger">
          {errorMessage}
        </Alert>
      );
    }
    return null;
  }

  getFileName = (e) => {
    getUploadedFileName(e, this.setState.bind(this));
  }

  submitForm = async (event) => {
    event.preventDefault();
    const {
      name, imageFile, description, campLocation, price
    } = this.state;
    const priceNoDollarSign = price.replace(/\$/gi, '');
    const { history, user } = this.props;
    const fd = new FormData();
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    fd.append('image', imageFile);
    fd.append('name', name);
    fd.append('description', description);
    fd.append('campLocation', campLocation);
    fd.append('price', priceNoDollarSign);
    fd.append('userId', user.id);
    const url = '/api/campgrounds';

    try {
      const { status, data: message } = await axios.post(url, fd, config);
      if (status === 201) {
        history.push({
          pathname: '/campgrounds',
          state: {
            alertMessage: {
              text: message,
              variant: 'success'
            }
          }
        });
      }
    } catch (err) {
      const {
        response: {
          status,
          data: message
        }
      } = err;
      this.setState({
        errorMessage: `${message} (${status})`
      });
    }
  }


  render() {
    const { message } = this.state;
    return (
      <div className="margin-top-50">
        {this.renderAlert()}
        <Container>
          <h1 className="text-center">Create a New Campground</h1>
          <br />
          <form onSubmit={this.submitForm}>
            <div className="entryBox centered">
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="description"
                  placeholder="Description"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="campLocation"
                  placeholder="Location"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="price"
                  placeholder="Price ($/night)"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="file-upload"
                  className="btn btn-outline-primary btn-block"
                >
                  <input
                    id="file-upload"
                    type="file"
                    name="image"
                    data-multiple-caption={message}
                    onChange={this.getFileName}
                  />
                  <span>{message}</span>
                </label>
              </div>
              <br />
              <div className="form-group">
                <Button
                  className="btn-block"
                  variant="primary"
                  type="submit"
                  size="lg"
                >
                  Submit
                </Button>
              </div>
              <Link to="/campgrounds">
                <Button size="sm" variant="link">Go Back</Button>
              </Link>
            </div>
          </form>
        </Container>
      </div>
    );
  }
}

NewCampground.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(NewCampground);
