import { error } from "console";
import mongoose ,{Mongoose} from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;


interface MongooseConnection { 
    promise:Promise<Mongoose>|null
    conn:Mongoose|null
}


let cached:MongooseConnection = (global as any).mongoose

if(!cached) {
    cached = { 
      conn: null, promise: null 
    }
  }

  

 const connectDB =async()=>{ 

if(cached.conn){
    console.log("Connected from previous",cached.conn)
    return cached.conn
}

if(!MONGODB_URI) throw new Error('Missing MONGODB_URL');

cached.promise = mongoose.connect(MONGODB_URI,{bufferCommands:false})


cached.conn = await cached.promise

console.log("newly connected")
return cached.conn;
}

export default connectDB;