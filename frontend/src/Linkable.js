import React from "react";

class Linkable extends React.Component {
    constructor(props) {
      super(props);
      this.obj = props.props
      this.state = {isLinkable: null};
      (this.obj.wikiURL) ? this.setState({isLinkable: true}) : this.setState({isLinkable: false})
    }

    render() {
      const isLinkable = this.obj.wikiURL
      let entry;
      (isLinkable) ? entry = <a href={this.obj.wikiURL} target="_blank" rel="noopener noreferrer">{this.obj.name}</a> : entry = this.obj.name
      return (
        <span>{entry}</span>
      );
    }
  }
  export default Linkable;
