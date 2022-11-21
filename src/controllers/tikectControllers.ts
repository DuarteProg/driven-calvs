import { Request, Response } from "express";
import httpStatus from "http-status";
// import { prisma } from "@/config";
import ticketService from "@/services/ticket-service";
import { AuthenticatedRequest } from "@/middlewares";

export async function ticketGet(req: Request, res: Response) {
  try {
    const list = await ticketService.listTickets();
    return res.status(httpStatus.OK).send(list);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send([]);
  }
}

export async function ticketAll(req: AuthenticatedRequest, res: Response) {
  const userId = Number(req.userId);
  try {
    const ticket = await ticketService.ticketUser(userId);
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postTikects(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body;
  const userId: number = req.userId;
  try {
    const ticket = await ticketService.postTicket(ticketTypeId, userId);

    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
