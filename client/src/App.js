import SignUp from "./component/SignUp";
import { StreamChat } from "stream-chat";
import Login from "./component/Login";
import Cookies from "universal-cookie";
import { useState } from "react";
import {Chat} from "stream-chat-react"
import JoinGame from "./component/JoinGame";
import "./App.css";
function App() {
  const api_key = "hfxw6bb9g37m";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth,setAuth]=useState(false);


  const logout=()=>{
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    client.disconnectUser();
    setAuth(false);
  
  }
  
  if (token) {
    
        client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
        console.log("hello")
        console.log(user.me)
        setAuth(true);
      });
  
    
    }
 


  return (
    <div className="App">
      {isAuth? (
     
     <Chat client={client}>
          <JoinGame />
      <button onClick={logout}>Log Out</button>
      </Chat>
     
          
      ):(<>
        <SignUp setAuth={setAuth}/>
      <Login setAuth={setAuth}/>

      </>)}
          </div>
  );
}

export default App;
