export const plansMap = [
    {
      id: "basic",
      name: "Basic",
      description: "Get started with Scriptify.Ai!",
      price: "10",
      items: ["3 Blog Posts", "3 Transcription"],
      paymentLink: "https://buy.stripe.com/test_00gfZQgmpgcO6hGeUU",
      priceId:
        process.env.NODE_ENV === "development"
          ? "price_1QxRYSDE4yFiyefwdjN7Ls6j"
          : "",
    },
    {
      id: "pro",
      name: "Pro",
      description: "All Blog Posts, let’s go!",
      price: "19.99",
      items: ["Unlimited Blog Posts", "Unlimited Transcriptions"],
      paymentLink: "https://buy.stripe.com/test_4gwcNE0nr2lY0Xm5kl",
      priceId:
        process.env.NODE_ENV === "development"
          ? "price_1QxRZ3DE4yFiyefwH0wiaI09"
          : "",
    },
  ];
  
  export const ORIGIN_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://speakeasyai-demo.vercel.app";