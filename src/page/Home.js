import React from "react";
import Button from 'antd/lib/button';
import config from '../web.config.json'

const api = config.api

class Home extends React.Component {

  async componentWillMount(){
    await fetch(api + '/user_login_status', {
      method: 'POST',
      credentials: 'include',
      mode: "cors"
    })
    .then(data=>data.json())
    .then(json=>{
      if (json.status !== 0){
        document.location.href = "#/login";
      }
    })
    .catch(err=>{
      console.error(err);
    });
  }
  
  render(){
    return (
      <div>
        <h2>Home</h2>
        <Button type="primary">Button</Button>
      </div>
    );
  }
}

export default Home;