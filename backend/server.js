//imports app instance and starts the server by listening on specific port
require("dotenv").config();
const app=require('./src/app')

const PORT=3000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})