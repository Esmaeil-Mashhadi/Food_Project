import { compare, hash } from "bcrypt";

async function hashing (password){

 const result = await hash(password , 10)
 return result

}


async function verifyPassword (password , hashedPassword){
  return await compare(password , hashedPassword)
}


export  {hashing , verifyPassword}