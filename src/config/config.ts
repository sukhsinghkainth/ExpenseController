import dotenv from "dotenv"

const env = dotenv.config()

export default {
    port : process.env.PORT,
    DB_URL : process.env.DB_URL  , 
    JWT_KEY : process.env.JWT
}
