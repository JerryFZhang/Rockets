import React from "react"

// The linkable class parses all the objects with wikiURL and return component with link.
class Linkable extends React.Component {
    constructor(props) {
      super(props);
      this.obj = props.props
    }

    render() {
      const isLinkable = this.obj.wikiURL
      let component;
      (isLinkable) ? component = <a href={this.obj.wikiURL} target="_blank" rel="noopener noreferrer">{this.obj.name}</a> : component = this.obj.name
      return (
        <span>{component}</span>
      );
    }
  }
  export default Linkable;
