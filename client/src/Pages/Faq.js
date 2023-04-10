import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Faq from "react-faq-component";
import jwt_decode from "jwt-decode";
import LoggedInNavbar from '../Components/LoggedInNavbar';
import LandingNavbar from '../Components/LandingNavbar';
import { Grid } from '@mui/material';

const data = {
  title: "FAQ ",
  rows: [
      {
          title: "Can I sell items on the website I created or buy items others create?,",
          content: `No, Crafttips does not allow buying and selling items or raw materials.`,
      },
      {
          title: "I can't login/register to the page site. What should i do?",
          content:
              "Please send us a message with more details by our 'contact us' page. As an alternative you could also write an email to us, but we would prefer it if you used the first option.",
      },
      {
          title: "I made a post but i can't see it on the main page.",
          content: `Each post must be manually reviewed by an admin before it is made visible. Alternatively, there migth be a temporary server outage, but in that
          case no post would be visible. While an admin reviews your post you can still edit it before the final decision via clicking on your "profile" tab and then 
          "edit profile". It will show all of your currently active/inactive posts. Editing does not make a post inactive, but if you abuse this your account might get deleted. `,
      },
      {
          title: "Can I rate the Crafttips without logging in?",
          content: 'No. As of now, our website does not support ratings without logging in, and it will probably stay like this. We try our best to give anyone a fair chance.',
      },
      {
        title: "What happens if I hurt myself following one of the Crafttip I found on the website?",
        content: 'We take no responsibility about any injury you cause for yourself. In the end, its just a guide for your creativity, and you are responsible for your own actions.',
    },
  ],
};

const styles = {
  bgColor: "empty",
  titleTextColor: "rgb(0, 173, 181)",
  rowTitleColor: "rgb(0, 173, 181)",
  rowContentColor: 'rgb(238, 238, 238)',
  arrowColor: "red",
};

const config = {
  animate: true,
  arrowIcon: "V",
  tabFocus: true
};


export const Faqq = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    refreshToken();
    }, []);


  const refreshToken = async () => {
    try {
        const response = await axios.get('http://localhost:5000/token');
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
    } catch (error) {
        if (error.response) {
        }
    }
  }

const navbarDecider = () =>{
        if(name.length > 0) {
          return <LoggedInNavbar/>
        }else{
          return <LandingNavbar />}
      }

      
  return (
    <>
      {navbarDecider()}
      <Grid container>
        <Grid item xs={2}>
        </Grid>
        <Grid item xs={8}>
        <Faq
                data={data}
                styles={styles}
                config={config}
            />
        </Grid>
        <Grid item xs={2}>
        </Grid>
      </Grid>
        </>
  )
}
