const products = require("../data/products");
require("dotenv").config();

exports.getProducts = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

exports.askProducts = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }
    const prompt = `
      You are a product assistant.
      Here is the product list:
      ${JSON.stringify(products)}
      User question:
      "${query}"
      Return response ONLY in valid JSON format:
      {
        "productIds": [1,2],
        "summary": "Short explanation"
      }
      `;
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "arcee-ai/trinity-large-preview:free",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful product recommendation assistant. Always return strict JSON.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.3,
        }),
      },
    );
    const data = await response.json();
    if (!data.choices) {
      return res.status(502).json({
        message: "Invalid AI response",
      });
    }
    const aiResponse = data.choices[0].message.content;

    let parsed;
    try {
      parsed = JSON.parse(aiResponse);
    } catch (err) {
      return res.status(500).json({
        message: "AI returned invalid JSON format",
      });
    }
    const matchedProducts = products.filter((p) =>
      parsed.productIds.includes(p.id),
    );
    res.json({
      products: matchedProducts,
      summary: parsed.summary,
    });
  } catch (error) {
    console.error("AI ERROR:", error);
    res.status(503).json({
      message: "AI service unavailable. Please try again later.",
    });
  }
};
