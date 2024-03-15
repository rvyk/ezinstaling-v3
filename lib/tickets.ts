import { redis } from "@/lib/redis";
import { Redis } from "@upstash/redis";
import crypto from "crypto";

class Tickets {
  private redis: Redis;

  constructor(redis: Redis) {
    this.redis = redis;
  }

  async createTicket(
    email: string,
    title: string,
    description: string,
    priority: "low" | "medium" | "high",
    problemType: "instaling" | "platnosci" | "inne" | "konto",
  ): Promise<string | undefined> {
    try {
      const id = crypto.randomBytes(16).toString("hex");
      const key = `tickets::${email}`;
      const ticket = JSON.stringify({
        id,
        creatorEmail: email,
        title,
        description,
        status: "open",
        priority,
        supportAgent: "",
        problemType,
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Ticket);
      this.redis.lpush(key, ticket);

      return id;
    } catch (e) {}
  }

  async getTickets(
    email: string,
    status?: "open" | "closed" | "in-progress",
  ): Promise<Ticket[]> {
    const key = `tickets::${email}`;
    const tickets: Ticket[] = await this.redis.lrange(key, 0, -1);

    if (status) {
      return tickets.filter((ticket: Ticket) => ticket.status === status);
    }

    return tickets;
  }

  async getAllTickets(): Promise<Ticket[]> {
    const keys = await this.redis.keys("tickets::*");
    const tickets: Ticket[] = [];

    for (const key of keys) {
      const ticket: Ticket[] = await this.redis.lrange(key, 0, -1);
      tickets.push(...ticket);
    }

    return tickets;
  }

  async getTicketById(id: string): Promise<Ticket | undefined> {
    const keys = await this.redis.keys("tickets::*");
    for (const key of keys) {
      const tickets: Ticket[] = await this.redis.lrange(key, 0, -1);
      const ticket = tickets.find((ticket: Ticket) => ticket.id === id);
      if (ticket) {
        return ticket;
      }
    }
  }

  async takeOverTicket(
    id: string,
    operation: "take" | "delete" | "close",
    email: string,
  ) {
    const keys = await this.redis.keys("tickets::*");
    for (const key of keys) {
      const tickets: Ticket[] = await this.redis.lrange(key, 0, -1);
      const ticketIndex = tickets.findIndex(
        (ticket: Ticket) => ticket.id === id,
      );
      if (ticketIndex !== -1) {
        const ticket = tickets[ticketIndex];
        if (operation === "take") {
          ticket.supportAgent = email;
          ticket.status = "in-progress";
        } else if (operation === "delete") {
          await this.redis.lrem(key, 0, JSON.stringify(ticket));
          tickets.splice(ticketIndex, 1);
        } else if (operation === "close") {
          ticket.status = "closed";
        }

        if (operation !== "delete") {
          tickets[ticketIndex] = ticket;
          await this.redis.lset(key, ticketIndex, JSON.stringify(ticket));
        }
      }
    }
  }

  async sendMessage(id: string, message: Message) {
    const key = `messages::${id}`;
    this.redis.lpush(key, JSON.stringify(message));
  }

  async getMessages(id: string): Promise<Message[]> {
    const key = `messages::${id}`;
    return await this.redis.lrange(key, 0, -1);
  }
}

export const tickets = new Tickets(redis);
