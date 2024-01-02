"use server";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";

interface Payload {
  values: any;
  subscription: any;
  amount: any;
  discount: any;
}

//GET:

export const getSubscription = async (userId: string) => {
  try {
    const subscription = await db.subscription.findUnique({
      where: {
        userId,
      },
      select: {
        subscriptionType: true,
        startDate: true,
        endDate: true,
        amount: true,
      },
    });
    return subscription;
  } catch {
    return null;
  }
};

//SET:

export const handlePayment = async (payload: Payload) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (!payload) {
    return new Response("failed", { status: 400 });
  }

  const today = new Date();
  var endDate = new Date(today);
  if (payload.subscription === "month") {
    endDate.setMonth(today.getMonth() + 1);
  } else {
    endDate.setFullYear(today.getFullYear() + 1);
  }

  let amount = payload.amount;
  if (payload.discount !== 0) {
    amount = payload.discount;
  }

  try {
    await db.subscription.create({
      data: {
        subscriptionType: payload.subscription.toUpperCase(),
        endDate,
        amount,
        userId: session.user.id,
      },
    });
  } catch (error) {
    return "fail";
  }
  return "success";
};

export const cancelSubscription = async (userId: string) => {
  try {
    await db.subscription.delete({
      where: {
        userId,
      },
    });
  } catch (error) {
    return "failed";
  }
  return "success";
};
