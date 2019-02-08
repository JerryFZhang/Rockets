import React from "react"

// The linkable class parses all the objects with wikiURL and return component with link.
class Linkable extends React.Component {
    constructor(props) {
      super(props)
      this.obj = props.props
    }

    render() {
      const link = this.obj.wikiURL
      let component
      (link) ? component = <a href={link} target="_blank" rel="noopener noreferrer">{this.obj.name}</a> : component = this.obj.name

      return (
        <span>{component}</span>
      );
    }
  }
  export default Linkable;
