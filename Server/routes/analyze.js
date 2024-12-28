// server/routes/analyze.js
import express from "express";
import axios from "axios";
import authenticateToken from "../middleware/authenticateToken.js";
import Analysis from "../models/Analyza.js"; // Import Analysis model

const router = express.Router();

router.post("/analyze", authenticateToken, async (req, res) => {
  const { companyData } = req.body;

  try {
    const options = {
      method: "POST",
      url: "https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions",
      headers: {
        "x-rapidapi-key": process.env.AI_API,
        "x-rapidapi-host":
          "cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        messages: [
          {
            role: "user",
            content: `Analyzujte nasledujúce údaje spoločnosti a poskytnite podrobnú analýzu s **detailnými** odporúčaniami pre implementáciu moderných FinTech technológií. Pre **každé odporúčanie** uveďte:
  
  - **Názov odporúčania**
  - **Popis odporúčania:** Detailne vysvetlite, o čo ide.
  - **Implementačné kroky:** Krok za krokom opíšte, ako implementovať dané riešenie.
  - **Očakávané náklady:** Uveďte približné náklady na implementáciu a prevádzku.
  - **Potenciálne výhody:** Detailne popíšte, ako odporúčanie pomôže spoločnosti dosiahnuť jej ciele.
  - **Riziká a výzvy:** Identifikujte možné riziká a navrhnite spôsoby ich minimalizácie.
  - **Príklady úspešného využitia:** Uveďte príklady podobných spoločností, ktoré úspešne implementovali toto riešenie.
  
  Potom uveďte sekciu **Finančné plánovanie**, ktorá obsahuje:
  
  - **Analýza nákladov a prínosov:** Poskytnite finančnú analýzu pre navrhované odporúčania.
  - **Cash flow projekcia:** Predpokladaný peňažný tok po implementácii odporúčaní.
  
  Nakoniec uveďte **Záver**, kde zhrniete hlavné body analýzy.
  
  **Dôležité:** Prosím, vráťte **iba** odpoveď vo formáte JSON podľa uvedenej štruktúry, **bez akýchkoľvek kódových blokov, spätných apostrofov (\`), alebo akéhokoľvek iného textu pred alebo po JSON objekte**.
  
  **Vráťte iba JSON v nasledujúcom formáte:**
  
  {
    "recommendations": [
      {
        "title": "Názov odporúčania",
        "description": "Popis odporúčania",
        "implementationSteps": ["Krok 1", "Krok 2", "..."],
        "expectedCosts": "Očakávané náklady",
        "potentialBenefits": "Potenciálne výhody",
        "risks": "Riziká a výzvy",
        "examples": "Príklady úspešného využitia"
      }
      // Ďalšie odporúčania
    ],
    "financialPlanning": {
      "costBenefitAnalysis": "Analýza nákladov a prínosov",
      "cashFlowProjection": [
        { "month": "Január", "cashFlow": 1000 },
        { "month": "Február", "cashFlow": 1200 },
        // ... ďalšie mesiace, urob realnu analyzu s moznostami poklesu/rastu
      ]
    },
    "conclusion": "Záver analýzy"
  }
  
  Údaje spoločnosti: ${companyData}
  `,
          },
        ],
        model: "gpt-4",
        max_tokens: 4048,
        temperature: 0.5,
      },
    };

    const response = await axios.request(options);

    // Extract the assistant's message content
    let assistantMessage = response.data.choices[0].message.content;
    console.log("Assistant's Response:", assistantMessage);

    // Function to extract JSON from assistant's message
    function extractJSONFromAssistantMessage(message) {
      // Remove code fences and any leading/trailing text
      const codeFencePattern = /```(?:json)?\n([\s\S]*?)```/;
      const match = message.match(codeFencePattern);
      if (match && match[1]) {
        return match[1].trim();
      } else {
        // If no code fences, attempt to extract JSON directly
        const jsonStart = message.indexOf("{");
        const jsonEnd = message.lastIndexOf("}");
        if (jsonStart !== -1 && jsonEnd !== -1) {
          return message.substring(jsonStart, jsonEnd + 1).trim();
        } else {
          throw new Error("JSON object not found in assistant's response");
        }
      }
    }

    // Attempt to parse the JSON from the assistant's message
    try {
      assistantMessage = extractJSONFromAssistantMessage(assistantMessage);

      const analysisData = JSON.parse(assistantMessage);

      // Uloženie analýzy do databázy
      const newAnalysis = new Analysis({
        user: req.user.userId, // Predpokladáme, že `req.user` obsahuje `userId`
        companyData,
        analysisResult: analysisData,
      });

      await newAnalysis.save();

      // Odoslanie dát späť klientovi
      res.json({ suggestions: analysisData, analysisId: newAnalysis._id });
    } catch (e) {
      console.error("Error parsing JSON:", e);
      res.status(500).json({ error: "Invalid response format from AI" });
    }
  } catch (error) {
    console.error("Error message:", error.message);
    console.error("Error details:", error.response?.data);
    res.status(500).json({ error: "Server Error" });
  }
});

// Endpoint pre získanie všetkých analýz používateľa
router.get("/analyze", authenticateToken, async (req, res) => {
  try {
    const analyses = await Analysis.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.json({ analyses });
  } catch (error) {
    console.error("Error fetching analyses:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// Endpoint pre získanie konkrétnej analýzy podľa ID
router.get("/analyze/:id", authenticateToken, async (req, res) => {
  try {
    const analysis = await Analysis.findOne({ _id: req.params.id, user: req.user.userId });
    if (!analysis) {
      return res.status(404).json({ error: "Analýza nenájdená." });
    }
    res.json({ analysis });
  } catch (error) {
    console.error("Error fetching analysis:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;
