import { TicketModel } from "../models/tickets.model.js";
class TicketDAO {

    async getTicket(params) {
        return await TicketModel.findOne(params)
    }

    async createTicket(ticket) {

        return await TicketModel.create(...ticket);
    }

}

const ticketDao = new TicketDAO();

export default ticketDao;