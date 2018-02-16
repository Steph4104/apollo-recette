import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import addUserQuery from './queries/AddUser.js';
import allUsersQuery from './queries/AllUsers.js';
import UserForm from './UserForm';

class AddUser extends Component {

  state = {
    alert: ''
  }

  handleSubmit = (values) => {
    const { name, email } = values;
    const { mutate, alert, close } = this.props;
    mutate({
      variables: { name, email },
      refetchQueries: [ { query: allUsersQuery }]
    })
    .then((res) => {
      alert({
        success: 'The user was inserted!'
      });
      close();
    }).catch((error) => {
      this.setState({
        alert: {
          type: 'danger',
          message: error.message
        }
      });
    });
  }

  render() {

    return (
      <UserForm
        modalId="addUserModal"
        title="Add User"
        handleSubmit={this.handleSubmit}
        user={this.props.user}
        close={this.props.close}
        alert={this.state.alert} />
    );
  }
}

export default graphql(addUserQuery)(AddUser);