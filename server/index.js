const  express =require("express");
const  cors =require("cors");
const { StreamChat } =require("stream-chat");
const {  v4 } =require("uuid");
const bcrypt =require("bcrypt");
const app = express();

app.use(cors());
app.use(express.json());
const api_key = "hfxw6bb9g37m";
const api_secret =
  "4bkwjxzcj73fmpym5uwysj6vvxbcu424u35hpq7hby2kwyr64mvvtnp8d5s6aw4n";
const serverClient = StreamChat.getInstance(api_key, api_secret);

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const userId = v4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createToken(userId);
  
    res.json({ token, userId, firstName, lastName, username, hashedPassword });
  } catch (error) {
    res.json(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const { users } = await serverClient.queryUsers({ name:{$eq:username} });
    if (users.length === 0) return res.json({ message: "User not found" });

    const token = serverClient.createToken(users[0].id);
    const passwordMatch = await bcrypt.compare(
      password,
      users[0].hashedPassword
    );

    if (passwordMatch) {
      res.json({
        token,
        firstName: users[0].firstName,
        lastName: users[0].lastName,
        username,
        userId: users[0].id,
      });
    }
  } catch (error) {
    res.json(error);
  }
});

app.listen(8086, () => {
  console.log("Server is running on port 8086");
});