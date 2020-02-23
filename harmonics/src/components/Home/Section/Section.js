import React, { Component } from 'react'
import './cssSection.css';

class Section extends Component {

    render(){
        return (
            <div className="Section">
                <section id="hero">
                    <div className="h-text text-light">
                        <h1>Harmonics</h1>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac dignissim dolor. Cras fringilla at libero eget vehicula. 
                        Aliquam sed nunc sit amet lorem gravida lacinia sit amet laoreet nisl. Phasellus tincidunt augue vitae est rutrum elementum. 
                        Proin tincidunt porta dapibus. Sed sit amet tempus libero, pharetra fermentum dolor. Nam porttitor purus vel consequat mollis. 
                        Nam volutpat ligula non diam lacinia faucibus. Maecenas et nulla mollis, dapibus est sit amet, feugiat leo. Aliquam et lacinia velit, 
                        eget auctor elit. Duis arcu neque, ornare ut posuere at, auctor aliquet magna. Vestibulum egestas venenatis sapien in convallis. Etiam sed orci augue. 
                        Maecenas eget urna tempus, fringilla sapien a, bibendum odio. Phasellus finibus risus nisl. Integer ut dui urna.
                        </p>
                    </div>
                </section>
            </div>
        )
    }
}

export default Section;