import React, { Component } from 'react'
import './Nosotros.css';

class Nosotros extends Component {

    render(){
        return (
            <div className="Nosotros">
                <h1>Nosotros</h1>
                <div className="container-fluid">
                    <img className="img-fluid center" src="https://www.afandaluzas.org/wp-content/uploads/2017/07/grupo-multietnico-de-hombres-jovenes-y-de-mujeres-que-estudian-adentro_1139-989.jpg" alt="Girl in a jacket"/>
                    <section className="example">
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempor posuere purus quis rutrum.
                        Proin rutrum tellus eget odio elementum, sed mollis magna accumsan. Pellentesque et diam odio.
                        In scelerisque facilisis velit imperdiet ornare. Sed sit amet porta massa. Phasellus luctus nec elit eu finibus.
                        Cras euismod libero nisl, sed accumsan leo tincidunt sed. Vivamus placerat odio non leo dapibus tristique.
                        Sed at est nulla. Pellentesque condimentum id arcu semper elementum. Duis mi diam, ornare ut augue rutrum,
                        volutpat dapibus dolor. Vivamus et tempus elit, vel dignissim diam.
                        </p>
                    </section>
                </div>
            </div>
        )
    }
}

export default Nosotros;