import React from 'react';
import ReactGA from 'react-ga';

class GARoute extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let path = '/';
    if (this.props.children?.props?.path) path = this.props.children?.props?.path;
    if (this.props.children?.props?.to) path = this.props.children?.props?.to;
    if (this.props.path) path = this.props.path;
    console.log(path);
    ReactGA.pageview(path);
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        {this.props.component}{this.props.children}
      </div>
    );
  }
}

export default GARoute;
