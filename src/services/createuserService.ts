import userModel from '../model/userModel';
class createUserService{
     async createUser(userdata: {username:string, email : string}){
        const {username, email} = userdata;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          console.log('Invalid email format');
          throw new Error('Invalid email format');
        }
        const  existingUser = await userModel.findOne({ $or:[{username},{email}]});
        if (existingUser) {
            throw new Error('user already exist');
        }
        const newUser = new userModel({ username, email });
        await newUser.save();
        return newUser;
    }
}
export default createUserService;

// const createuser = async (req: Request, res: Response) => {

//     try {

//         const {username , email} = req.body;

//         if(!username || !email){
//             console.log("all fields are required")
//             res.json({
//                 message : "pls enter username and email"
//             })
//             return 
//         }
//         // Create a new user
//         const newUser = new userModel({
//           username: username,
//           email: email,
//         });
//         // Save the user
//         const savedUser = await newUser.save();
//         res.json(savedUser)


//     } catch (error: unknown) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//       }
  
//   };
  
// export default createuser;