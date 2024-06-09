import { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import Game from "./Game";
import CustomInput from "./CustomInput";
function JoinGame(){
    const [rivalUsername, setRivalUsername] = useState("");
    const {client}=useChatContext();
    const [channel,setChannel]=useState(null)

   const CreateChannel=async()=>{
    const response=await client.queryUsers({name:{$eq:rivalUsername}});
    if(response.users.length===0){
        alert("users not found");
        return 
    }
    //members: [client.userID, response.users[0].id],
    const newChannel =await client.channel("messaging",{
        members: [client.userID, response.users[0].id],
    });
    await newChannel.watch();
    setChannel(newChannel)
   }
   const g=async()=>{ 
    const response = await client.queryUsers({ name: { $eq: rivalUsername } });
const rivalId = response.users[0].id;

// Vérifier si le rivalId est déjà présent dans la liste des membres
const members = [ rivalId];
const memberSet = new Set(members);

if (!members.includes(rivalId)) {
    members.push(rivalId);
}
const newChannel = await client.channel("messaging", { members });
   
    console.log(newChannel)}
    return (
        <>
        {channel?(
        <Channel channel={channel} Input={CustomInput}>
          <Game channel={channel} setChannel={setChannel} />
        </Channel>
    ):(<div className="joinGame">
            <h4>Create Game</h4>
                  <input
                    placeholder="Username of rival..."
                    onChange={(event) => {
                      setRivalUsername(event.target.value);
                    }}
                  />
                  <button onClick={CreateChannel}>Join/Start Game {

                   
                  }</button>
                </div>)
            
        }
        </>
    );
}
export default JoinGame;