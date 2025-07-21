
export const getUserProfile = ( req, res )=> {
    const user = req.user;  // populated by authMiddleware
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
    });
}