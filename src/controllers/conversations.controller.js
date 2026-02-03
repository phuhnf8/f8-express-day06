const DbError = require("@/errors/dbError");
const conversationsService = require("@/services/conversations.service");

class ConversationController {
	// POST /api/conversations
	async createNewConversation(req, res, next) {
		try {
			const conversation = await conversationsService.createNew(
				req.user.id,
				req.body
			);
			return res.success({ conversation: conversation });
		} catch (error) {
			return next(error);
		}
	}

	// GET /api/conversations/
	async getAllFromUser(req, res, next) {
		try {
			const conversations = await conversationsService.getAllFromUser(
				req.user.id
			);
			return res.success({ conversations_list: conversations });
		} catch (error) {
			return next(error);
		}
	}

	// POST /api/conversations/:id/participants
	async addParticipants(req, res, next) {
		const conversationId = req.params?.id;
		const participantIds = req.body.user_id;
		try {
			await conversationsService.addParticipants(
				conversationId,
				participantIds
			);
			return res.success({ message: "Participants added successfully" });
		} catch (error) {
			return next(error);
		}
	}
}

module.exports = new ConversationController();
