import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  googleId: string;
  email: string;
  name: string;
  picture?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  googleId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true
  },
  picture: {
    type: String
  },
  bio: {
    type: String,
    maxlength: 500
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Prevent model recompilation in development
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
