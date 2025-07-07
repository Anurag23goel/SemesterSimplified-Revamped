export interface user_type {
  _id: string;
  name: string;
  userName: string;
  email: string;
  phoneNumber: string;
  age: number;
  role: string;
  status: string;
  profilePicture: string;
  documentsUploaded: string[];
  university: string;
  college: string;
  course: string;
  branch: string;
  socketID: string;
  accessToken: string;
  freeCredits: string;
  dateOfBirth: string;
  gender: string;
  educationLevel: string;
  ratings: number;
  connections: string[];
  sentConnectionRequestsUserIDs: string[];
  savedDocuments: string[];
  createdAt: string;
  updatedAt: string;
}

export interface message_type {
  _id: string;
  sender: {
    _id: string;
    name: string;
    profilePicture: string;
  };
  content: string;
  createdAt: string;
}

export interface messageRooms_type {
  _id: string;
  name: string;
  participants: string[];
  lastMessageContent: string;
  lastMessageAt: string;
}

export interface connection_type {
  _id:string;
  name: string;
  profilePicture: string;
  college: string;
  course: string;
}
