type Message = {
  id: string;
  message: {
    content?: string;
    links?: string[];
  };
  sender: string;
  timestamp: string;
};

interface Ticket {
  id: string;
  creatorEmail: string;
  title: string;
  description: string;
  messages: Message[];
  priority: "low" | "medium" | "high";
  status: "open" | "closed" | "in-progress";
  problemType: "instaling" | "platnosci" | "inne" | "konto";
  supportAgent: string;
  createdAt: string;
  updatedAt: string;
}
