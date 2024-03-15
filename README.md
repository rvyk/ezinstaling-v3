# ezInstaling - v3

Source code of the [ezInstaling](https://v3.ezinstaling.pl) application, which can serve as a template for a management panel. Ready integration with Stripe & Pusher.

## About the Application

[EzInstaling](https://v3.ezinstaling.pl) is the best tool to assist in learning supported by artificial intelligence in one place. Currently, we can help you with:

- **Instaling**: The most advanced method of solving `Instaling.pl` sessions, supported by artificial intelligence. Configure the `OpenAI` API key in the panel, adjust the probabilities for typos, synonyms, and "capital letter" occurrences, and start solving `Instaling.pl` sessions.
- **Testportal** `(not yet)`: Easily bypass the `Uczciwy rozwiązujacy`, generate several most probable answers using AI, and modify the time for a question.

## Management Panel

The most important part of [ezInstaling](https://v3.ezinstaling.pl) is the management panel, which includes many ready-to-use functionalities for further use, such as:

- **Help Chat**: Through [Pusher](https://pusher.com/), users can exchange messages with the administration (users with ADMIN role). It is possible to send attachments and manage the help channel: taking over, closing, deleting.
- **Stripe Subscription Integration**: Thanks to this integration, users can make payments for subscriptions to services offered by the application. There are also ready-made, configured webhook mechanisms available, which are used, for example, to cancel a user's subscription, send notifications about subscription renewal, etc.

## Tech Stack

- Application:
  - [Next.js](https://nextjs.org/) (A React framework for building server-rendered React applications)
  - [React](https://reactjs.org/) (A JavaScript library for creating user interfaces)
  - [Auth.js](https://example.com/auth.js) (A library or module used for authentication purposes)
  - [Pusher](https://pusher.com/) (A service that provides real-time messaging functionality)
  - [Stripe](https://stripe.com/) (A payment processing platform that enables businesses to accept online payments)
  - [TypeScript](https://www.typescriptlang.org/) (A typed superset of JavaScript that compiles to plain JavaScript)
- Database:
  - [Prisma](https://www.prisma.io/) (An open-source database toolkit for TypeScript and Node.js)
  - [MongoDB](https://www.mongodb.com/) (MongoDB is a source-available, cross-platform, document-oriented database program. Classified as a NoSQL database product)
  - [Redis](https://redis.io/) (Redis is an open-source in-memory storage, used as a distributed, in-memory key–value database, cache and message broker, with optional durability)
- User interface built with:
  - [shadcn/ui](https://example.com/shadcn/ui) (A UI component library or framework)
  - [Tailwind CSS](https://tailwindcss.com/) (A utility-first CSS framework for rapidly building custom designs)
- Error management:
  - [Sentry](https://sentry.io/) (A cloud-based error monitoring and tracking service)
- Page scraping:
  - [cheerio](https://cheerio.js.org/) (A fast, flexible, and lightweight implementation of core jQuery designed specifically for the server)

## Links

[![portfolio](https://img.shields.io/badge/GitHub-rvyk-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/rvyk/)
[![portfolio](https://img.shields.io/badge/Github-majusss-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/majusss/)
[![linkedin](https://img.shields.io/badge/TRY-0A66C2?style=for-the-badge&logoColor=white)](https://v3.ezinstaling.pl/)

## Legal Notice

Please note that this project is open source and is subject to certain terms and conditions. It includes subscription-based features that are not intended to be modified or used for free. Selling or distributing this work without proper authorization is strictly prohibited. This project can serve as an excellent foundation for building a control panel and learning various programming techniques. However, it is strictly prohibited to remove subscription features for commercial use.
