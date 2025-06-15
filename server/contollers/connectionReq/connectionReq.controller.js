import CONNECTION_REQUEST from "../../../src/utils/models/connectionRequest.model.js";
import USER from "../../../src/utils/models/user.model.js";

export const CREATE_CONNECTION_REQUEST = async (req, res) => {
  try {
    const connection_req_reciever = req.body;
    console.log("JISKO BHEJI", connection_req_reciever);

    const connection_req_sender = req.user;
    console.log("JISNE BHEJI -", connection_req_sender);

    if (!connection_req_reciever || !connection_req_sender) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const reciver_person = await USER.findById(connection_req_reciever._id);
    if (!reciver_person) {
      return res.status(404).json({ message: "User not found" });
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
