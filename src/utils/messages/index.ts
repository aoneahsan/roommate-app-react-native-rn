import { zrtkMessages } from "zaions-react-tool-kit";
import { ztkMessages } from "zaions-tool-kit";
export const MESSAGES = {
  ...ztkMessages,
  ...zrtkMessages,

  errors: {
    authCheckFailed: "Check Failed",
    userAlreadyExists: "User with this email or phone number already exists",
    invalidCredential: "Invalid credential",
  },

  game: {
    createdSuccessfully: "Game created successfully.",
    updatedSuccessfully: "Game updated successfully.",
    deletedSuccessfully: "Game delete successfully.",
    notFount: "Game not found",
  },

  file: {
    maxSize: (maxSize: string) =>
      `File size is larger than ${maxSize}, file size should be ${maxSize} or less.`,
  },

  place: {
    created: "Place created successfully.",
  },

  profile: {
    added: "Profile data added successfully.",
    updated: "Profile data updated successfully.",
  },
} as const;
