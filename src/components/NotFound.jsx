import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
            <img
                style={{width: '600px', marginTop: '20vh'}}
                src={require("../assets/racoon.jpg")} alt="racoon" />
                
            <div style={{display: 'flex', gap: '3rem'}}>
                <h1
                    style={{margin: '0px',
                            padding: '0px',
                            fontFamily: 'Poppins',
                            fontSize: '60px',
                            textAlign: 'center'
                        }}
                >404</h1>
                <Link to="/" style={{textDecoration: 'none', display: 'flex', alignItems: 'center'}}>
                    <p
                        style={{fontFamily: 'Poppins',
                                textAlign: 'center',
                                fontSize: '1.5rem',
                                color: 'violet'
                        }}
                    >return to store</p>
                </Link>
            </div>

        </div>
    );
}

export default NotFound;