const messageService = require("@/services/message.service");

class MessageController {
	// GET /api/conversations/:id/messages
	async getMessages(req, res, next) {
		const conversationId = req.params?.id;
		try {
			const messages = await messageService.getMessages(conversationId);
			return res.success({ messages: messages });
		} catch (error) {
			return next(error);
		}
	}

	// POST /api/conversations/:id/messages
	async sendMessage(req, res, next) {
		try {
			const senderID = req.user?.id;
			const conversationID = req.params.id;
			const payload = req.body;
			const message = await messageService.send(
				senderID,
				conversationID,
				payload
			);
			return res.success({ message: message });
		} catch (error) {
			return next(error);
		}
	}
}

module.exports = new MessageController();
