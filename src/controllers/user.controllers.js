import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../modules/user.model.js"; // Ensure the path is correct
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const registerUser = asyncHandler(async (req, res) => {
    // Step 1: Get user details from frontend
    const { username, fullName, email, password } = req.body;

    // Step 2: Validation - Check if fields are not empty
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    // Step 3: Check if user already exists (username or email)
    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (existedUser) {
        throw new ApiError(409, "Username or email already exists");
    }

    // Step 4: Check for avatar and cover image
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

        const avatar =await uploadOnCloudinary(avatarLocalPath);
        const coverImage =await uploadOnCloudinary(coverImageLocalPath);
        if (!avatar){
           throw ApiError(400, "Avatar file is required");
        }

    
    // Example: const avatar = await uploadToCloudinary(avatarLocalPath);
    // Example: const coverImage = await uploadToCloudinary(coverImageLocalPath);

    // Step 6: Create user object and save to database
    const user = await User.create({
        username: username.toLowerCase(), // Ensure username is stored in lowercase
        fullName,
        email,
        password,
        avatar: avatar.url, // Use the Cloudinary URL for the avatar
        coverImage: coverImage?.url || "", // Use the Cloudinary URL for the cover image (if available)
    });
   
    // // Step 7: Remove password and refresh token fields from the response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    // // Step 8: Check if user was created successfully
    if (!createdUser) {
        throw new ApiError(500, "Failed to create user");
    }

    // // Step 9: Return response
    return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: createdUser,
    });
});

export default registerUser;