import { prisma } from "@/config";
import { number } from "joi";

async function listTikect() {
  const alltypes = await prisma.ticketType.findMany();
  return alltypes;
}

async function userTicket(enrollmentId: number) {
  const ticketUser = await prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: { TicketType: true },
  });
  return ticketUser;
}

async function ticketsPost(enrollmentId: number, ticketTypeId: number) {
  const status = "RESERVED";
  return prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status,
    },
    include: {
      TicketType: true,
    },
  });
}

const ticketRepository = { listTikect, userTicket, ticketsPost };

export default ticketRepository;
