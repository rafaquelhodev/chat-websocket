import express from "express"

const app = express()

app.get("/", (req, res) => {
    return res.send("Hiii")
})

app.post("/users", (req, res) => {
    return res.json({message: "user saved"})
})

app.listen(3333, () => console.log("Server is running on port 3333"));