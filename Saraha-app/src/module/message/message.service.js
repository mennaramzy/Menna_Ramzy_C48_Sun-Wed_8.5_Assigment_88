import MessageModel from "../../DB/model/message.model.js";

export const sendMessageService = async (req, res) => {
  try {
    const { content, receiverId, attachmentsPath } = req.body;

    const newMessage = await MessageModel.create({
      content,
      receiverId,
      attachmentsPath,
    });

    return res.status(201).json({ message: "Message sent successfully", data: newMessage });
  } catch (error) {
    return res.status(500).json({ message: "Error sending message", error: error.message });
  }
};

export const getMyMessagesService = async (req, res) => {
  try {
    const messages = await MessageModel.find({
      receiverId: req.user.id,
      isDeleted: false,
    });

    return res.status(200).json({ message: "Messages fetched successfully", messages });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching messages", error: error.message });
  }
};

export const deleteMessageService = async (req, res) => {
  try {
    const { messageId } = req.params;

    const message = await MessageModel.findOneAndUpdate(
      { _id: messageId, receiverId: req.user.id },
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ message: "Message not found or unauthorized" });
    }

    return res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting message", error: error.message });
  }
};