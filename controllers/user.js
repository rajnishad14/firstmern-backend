import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../modals/user.modal.js'

export const signIn = async (req, res) => {
  const { email, password } = req.body
  try {
    const existingUser = await User.findOne({ email })
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" })
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    )
    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Password incorrect' })
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      'mysecret',
      { expiresIn: '1h' }
    )
    res.status(200).json({ result: existingUser, token })
  } catch (error) {
    res.status(500).json({ message: 'something went wrong' })
  }
}
export const signUp = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser)
      return res.status(400).json({ message: 'user already exist' })
    if (password !== confirmPassword)
      return res.status(400).json({ message: 'passwords not matching' })
    const hasedPassword = await bcrypt.hash(password, 12)

    const newUser = await User.create({
      email,
      password: hasedPassword,
      name: `${firstName} ${lastName}`,
    })
    console.log(newUser)
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      'mysecret',
      { expiresIn: '1h' }
    )
    res.status(200).json({ result: newUser, token })
  } catch (error) {
    res.status(500).json({ message: 'something went wrong' })
  }
}
