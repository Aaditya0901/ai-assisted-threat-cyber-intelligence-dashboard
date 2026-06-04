const Groq = require("groq-sdk");

console.log(
  "Groq key loaded:",
  process.env.GROQ_API_KEY
    ? process.env.GROQ_API_KEY.substring(0, 12) + "..."
    : "NOT FOUND"
);

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateRiskSummary = async (
  abuseScore,
  classification,
  country,
  isp
) => {
  try {
    const prompt = `
You are a cybersecurity analyst.

Abuse Score: ${abuseScore}
Classification: ${classification}
Country: ${country}
ISP: ${isp}

Respond EXACTLY in this format:

Risk Assessment:
...

Reason:
...

Recommendation:
...
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.5,
      max_tokens: 150,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.log("GROQ FULL ERROR:");
    console.log(error);

    throw error;
  }
};

module.exports = {
  generateRiskSummary,
};