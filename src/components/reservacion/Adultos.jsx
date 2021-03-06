import React, { Component } from "react";

import SumaResta from "../common/SumaResta";

class Adultos extends Component {
    /*
     * cantidad: 2
     * max: 32
     * min: 1
     * titulo: Adultos
     */
    state = {
        cantidad: 2,
        max: 4,
        min: 1,
        titulo: ""
    };

    componentDidMount() {
        this.setState({ titulo: this.props.titulo });
    }

    comportamiento = num => {
        this.setState({ cantidad: num });
    };

    render() {
        return (
            <>
                <div className="habitacion-adultos-ninos">
                    <div className="contenido-izquierda">
                        <span>{this.state.titulo}</span>
                    </div>
                    <div className="contenido-derecha">
                    <SumaResta
                            cantidad={this.state.cantidad}
                            max={this.state.max}
                            min={this.state.min}
                            comportamiento={this.comportamiento}
                        />
                    </div>
                </div>
            </>
        );
    }
}

export default Adultos;
