

class ChatController {
    async getChat(req,res){
        res.render("chat", {});
    }
}

export const chatController = new ChatController();