Settings = React.createClass({
  render() {
    return (
      <div>
        <Profile ionModal={this.props.ionModal}/>
        <SettingsList ionModal={this.props.ionModal}/>
      </div>
    )
  }
});

Profile = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      user: Meteor.user(),
      userLoading: Meteor.loggingIn()
    }
  },
  getLoginStatus() {
    if (this.data.userLoading || !this.data.user) {return false;}
    if (this.data.user) {return true;}
    return false
  },
  render() {
    let loginStatus = this.getLoginStatus();
    if (this.data.userLoading) {
      return <AppLoading />
    }
    // if (!this.data.user) {
    //   return <h2>Please Log in.</h2>
    // }
    return (
      <div className="profile-wrapper">
        {/*<div className="image-wrapper">
          {loginStatus ? <img src={this.data.user.profile.name} /> : <div></div>}
        </div>*/}
        <div className="login-wrapper">
          {loginStatus ? <div>{this.data.user.profile.name}</div> : <div></div>}
          {loginStatus ? <LoggedIn ionModal={this.props.ionModal} /> : <NotLoggedIn ionModal={this.props.ionModal} />}
        </div>
      </div>
    )
  }
})

SettingsList = React.createClass({
  getDefaultProps() {
    return {
      settings: ["Setting 1", "Setting 2", "Setting 3"]
    }
  },
  render() {
    let list = this.props.settings.map((setting) => {
      return (
        <div onClick={this.props.ionModal.bind(null, setting)} className="item" key={setting}>
          <h2><a>{setting}</a></h2>
        </div>
      )
    })
    return (
      <div className="list">
        {list}
      </div>
    )
  }
})

LoggedIn = React.createClass({
  logout() {
    Meteor.logout();
  },
  render() {
    return (
      <div>
        <a onClick={this.logout}>Logout</a>
      </div>
    )
  }
})

NotLoggedIn = React.createClass({
  login() {
    Meteor.loginWithFacebook()
  },
  render() {
    return <a onClick={this.login}>Login</a>
  }
})
