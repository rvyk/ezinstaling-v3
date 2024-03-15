import { stripe } from "@/lib/stripe";
import { lastActions, vocabularyChart } from "@/types/user-data";
import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: "https://sought-chow-40125.upstash.io",
  token: process.env.REDIS_TOKEN!,
});

class UserData {
  private redis: Redis;

  constructor(redis: Redis) {
    this.redis = redis;
  }

  async getSubscriptions(cusId: string) {
    const activeSubscriptions = await stripe.subscriptions.list({
      customer: cusId,
      status: "active",
    });

    const trailingSubscriptions = await stripe.subscriptions.list({
      customer: cusId,
      status: "trialing",
    });

    return {
      activeSubscriptions: activeSubscriptions.data[0] || null,
      trailingSubscriptions: trailingSubscriptions.data[0] || null,
    };
  }

  async addLog(
    email: string,
    action: string,
    description: string,
    priority: "low" | "medium" | "high",
  ) {
    try {
      const key = `logs::${email}`;
      const log = JSON.stringify({
        action,
        description,
        priority,
        timestamp: new Date().toISOString(),
      });
      this.redis.lpush(key, log);
    } catch (e) {}
  }

  async getLogs(email: string, count: number): Promise<lastActions[]> {
    const key = `logs::${email}`;
    return await this.redis.lrange(key, 0, count === 0 ? -1 : count - 1);
  }

  async addDataToVocabularyChart(
    email: string,
    maxWords: number,
    correctWords: number,
  ) {
    const data = JSON.stringify({
      "Liczba słówek": maxWords,
      "Poprawnie wykonane": correctWords,
    });
    const key = `vocabularyChart::${email}`;
    await this.redis.lpush(key, data);
  }

  async getVocabularyChartData(email: string): Promise<vocabularyChart[]> {
    const key = `vocabularyChart::${email}`;
    return await this.redis.lrange(key, 0, 15);
  }

  async addSession(email: string) {
    const key = `sessions::${email}`;
    await this.redis.incr(key);
  }

  async addWord(email: string) {
    const key = `words::${email}`;
    await this.redis.incr(key);
  }

  async addLastSession(email: string, date: string) {
    const key = `lastSession::${email}`;
    await this.redis.set(key, date);
  }

  async getUserStats(email: string) {
    const sessionKey = `sessions::${email}`;
    const wordKey = `words::${email}`;
    const lastSessionKey = `lastSession::${email}`;

    const sessionCount = (await this.redis.get(sessionKey)) as string;
    const wordCount = (await this.redis.get(wordKey)) as string;
    const lastSession = (await this.redis.get(lastSessionKey)) as string;
    const keys = await this.redis.keys("words::*");
    let usersWithLessWords: number = 0;

    for (const key of keys) {
      const word: number = (await this.redis.get(key)) ?? 0;
      if (word < +wordCount) usersWithLessWords++;
    }

    const moreThan: number = Math.floor(
      (usersWithLessWords / keys.length) * 100,
    );

    return {
      sessionCount: sessionCount ? parseInt(sessionCount) : 0,
      wordCount: wordCount ? parseInt(wordCount) : 0,
      lastSession: lastSession ? lastSession : null,
      moreThan,
    };
  }
}

export const userData = new UserData(redis);
