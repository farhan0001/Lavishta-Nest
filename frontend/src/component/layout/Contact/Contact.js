import React, { Fragment } from 'react';
import './Contact.css';
import { Button } from '@mui/material';

const Contact = () => {
  return (
    <Fragment>
        <div className='contactContainer'>
            <a className='mailBtn' href="mailto:farhanquamar2021@gmail.com">
                <Button>Email: farhanquamar2021@gmail.com</Button>
            </a>
        </div>
    </Fragment>
  )
}

export default Contact