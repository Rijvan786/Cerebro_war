import app from "./src/App.js"
import { Configure } from "./src/config/config.js"
import { connectDB } from "./src/config/db.js"

const startServer = async () => {
    app.listen(Configure.PORT, () => {
        console.log(`Server running on port ${Configure.PORT}`)
    })

    await connectDB()
}
console.log(Configure.PORT);

startServer()
