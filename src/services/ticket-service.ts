import { notFoundError, requestError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";
import { number } from "joi";
import enrollmentRepository from "@/repositories/enrollment-repository";

async function listTickets() {
  return await ticketRepository.listTikect();
}

async function ticketUser(userId: number) {
  const ticket = await enrollmentRepository.findWithAddressByUserId(userId);
  const allTickets = await ticketRepository.userTicket(ticket.id);

  if(!userId || allTickets === null) {
    throw notFoundError();
  }
  return allTickets;
}

async function postTicket(ticketTypeId: number, userId: number) {
  if(!ticketTypeId) {
    throw requestError(400, "BAD-REQUEST");
  }
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if(!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.ticketsPost(enrollment.id, ticketTypeId);
    
  return ticket;
}

const ticketService = { listTickets, ticketUser, postTicket };

export default ticketService;
