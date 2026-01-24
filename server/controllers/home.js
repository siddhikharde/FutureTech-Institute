import dotenv from 'dotenv'

dotenv.config();

const getHome=(req, res)=>{
  res.json({
    success:true,
    message:"Welcome to the FutureTech",
  })
}

const getHealth=(req, res)=>{
  res.json({
    success:true,
    message:"Server is Healthy"
  })
}

export {getHealth, getHome};