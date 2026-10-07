import mongoose from "mongoose"

const BlacklistSchema=new mongoose.Schema({
    token:{
        type:String,
        createdAt: { type: Date, default: Date.now, expires: 3600 },
        required:[true,"Required for creating account"]
    }
},
{
    timestamps:true
}
)

const BlackListModel=mongoose.model("blacklist",BlacklistSchema)
 export default BlackListModel