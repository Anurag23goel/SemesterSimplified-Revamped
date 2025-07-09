import CONNECTION_REQUEST from "../../../src/utils/models/connectionRequest.model.js";
import USER from "../../../src/utils/models/user.model.js";
import { getIO } from "../../socket/socket.js";

export const CREATE_CONNECTION_REQUEST = async (req, res) => {
  try {
    const connection_req_reciever = req.body;
    // console.log("JISKO BHEJI", connection_req_reciever);

    const connection_req_sender = req.user;
    // console.log("JISNE BHEJI -", connection_req_sender);

    if (!connection_req_reciever || !connection_req_sender) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const reciver_person = await USER.findById(connection_req_reciever._id);
    if (!reciver_person) {
      return res.status(404).json({ message: "User not found" });
    }

    const sender_person = await USER.findById(connection_req_sender._id);
    if (!sender_person) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      reciver_person.connections.includes(sender_person._id) ||
      sender_person.connections.includes(reciver_person._id)
    ) {
      return res.status(400).json({
        success: false,
        message: "Already connected. Can't send connection request",
      });
    }

    const connection_request = await CONNECTION_REQUEST.create({
      sender: connection_req_sender._id,
      reciver: reciver_person._id,
      seen: false,
    });

    if (!connection_request) {
      return res
        .status(500)
        .json({ message: "Error while creating connection request" });
    }

    const updated_sender_person = await USER.findByIdAndUpdate(
      connection_req_sender._id,
      { $push: { sentConnectionRequestsUserIDs: reciver_person._id } },
      { new: true }
    );

    if (!updated_sender_person) {
      return res
        .status(500)
        .json({ message: "Error while creating connection request" });
    }

    const updated_receiver_person = await USER.findByIdAndUpdate(
      reciver_person._id,
      {
        $push: { receivedConnectionRequestsUserIDs: connection_req_sender._id },
      },
      { new: true }
    );

    if (!updated_receiver_person) {
      return res
        .status(500)
        .json({ message: "Error while creating connection request" });
    }

    //SENDING NOTIFICATION TO RECIEVER
    const io = getIO();
    io.to(`user_${reciver_person._id}`).emit("receive_connection_request", {
      sender: {
        name: connection_req_sender.userName,
        profilePicture: connection_req_sender.profilePicture,
      },
      message: "New connection request",
    });

    return res.status(200).json({
      success: true,
      message: "Connection request created successfully",
    });
  } catch (error) {
    console.log(
      "Error while creating connection: Internal Server Error",
      error.message
    );
    res.status(500).json({
      message: "Error while creating connection - Internal server error",
    });
  }
};

export const ACCEPT_CONNECTION_REQUEST = async (req, res) => {
  try {
    const { receiver: receiverID } = req.body;
    const senderID = req.user._id;

    const receiver = await USER.findById(receiverID);
    if (!receiver) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const connectionRequest = await CONNECTION_REQUEST.findOne({
      sender: senderID,
      reciver: receiverID,
    });

    if (!connectionRequest) {
      return res
        .status(404)
        .json({ success: false, message: "Connection request not found" });
    }

    await CONNECTION_REQUEST.findByIdAndDelete(connectionRequest._id);
    const updated_sender = await USER.findByIdAndUpdate(
      senderID,
      { $push: { connections: receiverID } },
      { new: true }
    );
    const updated_receiver = await USER.findByIdAndUpdate(
      receiverID,
      { $push: { connections: senderID } },
      { new: true }
    );

    if (!updated_sender || updated_receiver) {
      return res
        .status(500)
        .json({ message: "Error while accepting connection request" });
    }
    return res.status(200).json({
      success: true,
      message: "Connection request accepted successfully",
    });
  } catch (error) {
    console.log(
      "Error while accepting connection: Internal Server Error",
      error.message
    );
    res.status(500).json({
      message: "Error while creating connection - Internal server error",
    });
  }
};

export const DELETE_CONNECTION_REQUEST = async (req, res) => {
  try {
    const { receiver: receiverID } = req.body;

    const senderID = req.user._id;

    const receiver = await USER.findById(receiverID);
    if (!receiver) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const connectionRequest = await CONNECTION_REQUEST.findOne({
      sender: senderID,
      reciver: receiverID,
    });

    if (!connectionRequest) {
      return res
        .status(404)
        .json({ success: false, message: "Connection request not found" });
    }

    await CONNECTION_REQUEST.findByIdAndDelete(connectionRequest._id);
    await USER.findByIdAndUpdate(
      senderID,
      { $pull: { sentConnectionRequestsUserIDs: receiverID } },
      { new: true }
    );
    await USER.findByIdAndUpdate(
      receiverID,
      { $pull: { receivedConnectionRequestsUserIDs: senderID } },
      { new: true }
    );

    return res
      .status(200)
      .json({ success: true, message: "Connection request deleted" });
  } catch (error) {
    console.log(
      "Error while deleting connection: Internal server error",
      error.message
    );
    res.status(500).json({
      message: "Error while creating connection - Internal server error",
    });
  }
};

export const HANDLE_INCOMING_CONNECTION_REQUEST = async (req, res) => {
  try {
    const { userid: requestSenderID, action } = req.body;
    const requestReceiverID = req.user._id; // Extracting the logged in user's id using middleware

    const requestSender = await USER.findById(requestSenderID);

    if (!requestSender) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // FINDING THE CONNECTION REQUEST
    const connectionRequest = await CONNECTION_REQUEST.findOne({
      sender: requestSenderID,
      reciver: requestReceiverID,
    });
    if (!connectionRequest) {
      return res.status(404).json({
        success: false,
        message: "Connection request not found",
      });
    }

    if (action === true) {
      // DEFINING LOGIC IF USER ACCEPTED THE INCOMING REQUEST
      await CONNECTION_REQUEST.findByIdAndDelete(connectionRequest._id);
      const updated_sender = await USER.findByIdAndUpdate(
        requestSenderID,
        {
          $push: { connections: requestReceiverID },
          $pull: { sentConnectionRequestsUserIDs: requestReceiverID },
        },
        { new: true }
      );
      const updated_receiver = await USER.findByIdAndUpdate(
        requestReceiverID,
        {
          $push: { connections: requestSenderID },
          $pull: { receivedConnectionRequestsUserIDs: requestSenderID },
        },
        { new: true }
      );
      if (!updated_sender || !updated_receiver) {
        return res.status(500).json({
          success: false,
          message: "Error while accepting connection request",
        });
      }

      //SENDING NOTIFICATION TO REQUEST SENDER ABOUT ACCEPTING CONNECTION REQUEST
      const io = getIO();
      io.to(`user_${requestSenderID}`).emit("connection_request_accepted", {
        accepter: {
          name: updated_receiver.name,
          photo: updated_receiver.profilePicture,
        },
        message: "Connection Request Accepted",
      });
      return res.status(200).json({
        success: true,
        message: "Connection request accepted successfully",
        data: updated_sender,
      });
    } else {
      // DEFINING LOGIC IF USER REJECTED THE INCOMING REQUEST
      await CONNECTION_REQUEST.findByIdAndDelete(connectionRequest._id);
      const updated_sender = await USER.findByIdAndUpdate(
        requestSenderID,
        { $pull: { sentConnectionRequestsUserIDs: requestReceiverID } },
        { new: true }
      );
      const updated_receiver = await USER.findByIdAndUpdate(
        requestReceiverID,
        { $pull: { receivedConnectionRequestsUserIDs: requestSenderID } },
        { new: true }
      );
      if (!updated_sender || !updated_receiver) {
        return res.status(500).json({
          success: false,
          message: "Error while rejecting connection request",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Connection request rejected successfully",
        data: updated_sender,
      });
    }
  } catch (error) {
    console.log(
      "Internal Server Error while handling connection request in HANDLE_INCOMING_CONNECTION_REQUEST - ",
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
