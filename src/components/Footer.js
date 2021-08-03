import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <div><Link to="/about">About the Creators</Link></div>
            <div><Link to="/">Home Page</Link></div>
        </footer>
    )
}

export default Footer
