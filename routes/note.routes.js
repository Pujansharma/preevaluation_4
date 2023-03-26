const express = require("express")
const noteRouter = express.Router()
const { NoteModel } = require("../model/note.model")
const jwt = require("jsonwebtoken")


noteRouter.get("/", async (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, "masai")
    try {
        if (decoded) {
            const notes = await NoteModel.find({ "userID": decoded.userID })
            res.status(200).send(notes)
        }
    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})

noteRouter.post("/add", async (req, res) => {
    try {
        const note = new NoteModel(req.body)
        await note.save()
        res.status(200).send({ "msg": "A new Note has been added" })
    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})

noteRouter.patch("/update/:id", async (req, res) => {
    //write the patch logic by your own
    const payload = req.body;
    const reqID = req.params.id;
    try {
        await NoteModel.findByIdAndUpdate({ "_id": reqID }, payload);
        res.status(400).send({ "mssg": "data has been updateed succesfully" })
    } catch (error) {
        console.log(error.message);
    }

})


noteRouter.delete("/delete/:noteID",async(req,res)=>{
    //write the delete logic by your own
    const token=req.headers.authorization.split(" ")[1]
    const decoded=jwt.verify(token,"masai")
    const noteID=req.params.noteID;
    
    const req_id=decoded.userID;
    let note=NoteModel.findOne({_id:noteID});
    const req_in=note.userID
    
    try {
        if(req_id===req_in){
            await NoteModel.findByIdAndDelete({_id:noteID});
            res.status(200).send({"mssg":" updated"}) 
        }else{
            res.status(400).send({"mssg":"you are not authorised"}) 
            // res.send("updated")
        }
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = {
    noteRouter
}


