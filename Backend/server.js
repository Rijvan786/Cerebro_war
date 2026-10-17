import app from "./src/App.js"
import { Configure } from "./src/config/config.js"
import { connectDB } from "./src/config/db.js"

const startServer = async () => {
    app.listen(Configure.BACKEND_PORT, () => {
        console.log(`Server running on port ${Configure.BACKEND_PORT}`)
    })

    await connectDB()
}


startServer()
