import React, { Component } from "react";

class TextBox extends Component {
    render() {
        return (
            <>
                <input type={this.props.tipo} placeholder={this.props.titulo} required/>
            </>
        );
    }
}

export default TextBox;
