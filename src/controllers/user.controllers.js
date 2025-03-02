import  asyncHandler  from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
    //get user details frpom frontend 
    // validation not empty
    // check if user is already exits :username and gmail
    // check for images  check for avaterr 
    //upoad to cloudnary 
    // crate user object-create entry in db 
    //reemove passpowrd and token field from response 
    //check for user creation 
    //reeturn response 
    const {username,fullName,email,password}=req.body;
    console.log("email",email);
    res.status(200).json({
        message: "Shadoow Backend Running sucessfully"
    });
});
export default registerUser;
