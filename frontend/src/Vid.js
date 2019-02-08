import React from "react"

// The linkable class parses all the objects with wikiURL and return component with link.
class Vid extends React.Component {
    constructor(props) {
      super(props)
      this.obj = props.props
    }

    render() {
        let component
        if (this.obj.vidURL) component = <a href="this.obj.vidURL" class="badge badge-primary">Watch Video</a> 
        if (this.obj.vidURLs) component = this.obj.vidURLs.map((vid, index) => <a href="vid" class="badge badge-primary">Video Link #{index + 1}</a>)
       return (
        <span>{component}</span>
      );
    }
  }
  export default Vid;
