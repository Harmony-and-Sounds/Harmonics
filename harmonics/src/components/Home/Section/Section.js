import React, { Component } from 'react'
import './cssSection.scss';
import WaveBackground from "../../WaveBackground"

class Section extends Component {

    render(){
        return (
            <div className="Section">
                <section id="hero">
                  <WaveBackground />
                    <div className="h-text text-light">
                        <h1>Harmonics</h1>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac dignissim dolor. Cras fringilla at libero eget vehicula.
                        Aliquam sed nunc sit amet lorem gravida lacinia sit amet laoreet nisl. Phasellus tincidunt augue vitae est rutrum elementum.
                        Proin tincidunt porta dapibus. Sed sit amet tempus libero, pharetra fermentum dolor. Nam porttitor purus vel consequat mollis.
                        </p>
                    </div>
                </section>
            </div>
        )
    }
}

export default Section;
