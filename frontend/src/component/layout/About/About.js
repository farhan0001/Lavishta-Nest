import React, { Fragment } from 'react';
import './About.css'
import { Button, Typography, Avatar } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import founder from '../../../images/founder.jpeg';

const About = () => {

    const visitLinkedIn = () => {
        window.location = "https://www.linkedin.com/in/md-farhan-quamar-86a136198";
    }

  return (
    <Fragment>
        <div className='aboutSection'>
            <div></div>
            <div className='aboutSectionGradient'></div>
            <div className='aboutSectionContainer'>
                <Typography component="h1">About Me</Typography>

                <div>
                    <div>
                        <Avatar
                            style={{width: "10vmax", height: "10vmax", margin: "2vmax 0"}}
                            src={founder}
                            alt='Founder'
                        />
                        <Typography>Md Farhan Quamar</Typography>
                        <Button onClick={visitLinkedIn} color='primary'>
                            Visit LinkedIn
                        </Button>
                        <span>
                            Lavishta, an Ecommerce Website, is designed and created to 
                            showcase my MERN Stack Knowledge and Understanding.
                        </span>
                    </div>
                    <div className='aboutSectionContainer2'>
                        <Typography component='h2'>Visit My LinkedIn Page</Typography>
                        <a href='https://www.linkedin.com/in/md-farhan-quamar-86a136198' target="blank">
                            <LinkedInIcon className='linkedinSvgIcon' />
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </Fragment>
  )
}

export default About