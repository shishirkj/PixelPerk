"use server"

import User from "../database/models/user.models";
import connectDB from "../database/mongoose";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";


//CREATE
export async function createUser(user:CreateUserParams){ 
    try {
        await connectDB();
        const newUser = await User.create(user);
        return newUser;
    } catch (error) {
        handleError(error);
    }
}


//READ
export async function getUserById(userId:string){
    try {
        await connectDB();
       const userFound = await User.findById(userId);
       if(!userFound)
       { 
        throw new Error('User not Found')
       }

       return userFound

    } catch (error) {
        handleError(error);
    }
}


// DELETE
export async function deleteUser(clerkId: string) {
    try {
      await connectDB();
  
      // Find user to delete
      const userToDelete = await User.findOne({ clerkId });
  
      if (!userToDelete) {
        throw new Error("User not found");
      }
  
      // Delete user
      const deletedUser = await User.findByIdAndDelete(userToDelete._id);
      revalidatePath("/");
  
      return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
    } catch (error) {
      handleError(error);
    }
  }


  // UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
    try {
      await connectDB();
  
      const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
        new: true,
      });
  
      if (!updatedUser) throw new Error("User update failed");
      
      return JSON.parse(JSON.stringify(updatedUser));
    } catch (error) {
      handleError(error);
    }
  }
    


// USE CREDITS
export async function updateCredits(userId: string, creditFee: number) {
    try {
      await connectDB();
  
      const updatedUserCredits = await User.findOneAndUpdate(
        { _id: userId },
        { $inc: { creditBalance: creditFee }},
        { new: true }
      )
  
      if(!updatedUserCredits) throw new Error("User credits update failed");
  
      return JSON.parse(JSON.stringify(updatedUserCredits));
    } catch (error) {
      handleError(error);
    }
  }
