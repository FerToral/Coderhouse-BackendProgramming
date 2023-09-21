//@ts-check
import ticketDao from "../dao/mongo/tickets.mongo.js";

export class TicketService {
  async generateUniqueCode() {
    const uniqueCode = Math.random().toString(36).substr(2, 6).toUpperCase();
    const existingTicket = await ticketDao.getTicket({ code: uniqueCode })

    if (existingTicket) {
      return this.generateUniqueCode(); // Si el código ya existe, generamos uno nuevo
    }

    return uniqueCode;
  }

  async createTicket(amount, purchaser) {
    try {

        const ticket = {
            amount,
            purchaser,
            code: await this.generateUniqueCode(),
            purchase_datetime: new Date()
        }
        
        const newTicket = ticketDao.createTicket(ticket);
        return newTicket;
    } catch (error) {
      throw new Error('Error creating ticket');
    }
  }
}
