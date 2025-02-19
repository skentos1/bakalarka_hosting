// routes/analyze.js
import express from "express";
import axios from "axios";
import optionalAuth from "../middleware/optionalAuth.js"; // Voliteľná autentifikácia
import Analysis from "../models/Analyza.js";             // Model analýzy (ukladanie do DB)
import authenticateToken from "../middleware/authenticateToken.js";
const router = express.Router();

router.post("/", optionalAuth, async (req, res) => {
  const { formData, companyData } = req.body;

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
    let assistantMessage = response.data.choices[0].message.content;
    console.log("Assistant's Response:", assistantMessage);

    // Funkcia na extrakciu JSON z textu
    function extractJSONFromAssistantMessage(message) {
      const codeFencePattern = /```(?:json)?\n([\s\S]*?)```/;
      const match = message.match(codeFencePattern);
      if (match && match[1]) {
        return match[1].trim();
      } else {
        const jsonStart = message.indexOf("{");
        const jsonEnd = message.lastIndexOf("}");
        if (jsonStart !== -1 && jsonEnd !== -1) {
          return message.substring(jsonStart, jsonEnd + 1).trim();
        } else {
          throw new Error("JSON object not found in assistant's response");
        }
      }
    }

    // Parse JSON
    try {
      assistantMessage = extractJSONFromAssistantMessage(assistantMessage);
      const analysisData = JSON.parse(assistantMessage);

      // Ak je používateľ prihlásený (req.user !== undefined), ulož analýzu do DB
      if (req.user) {
        await Analysis.create({
          user: req.user.userId,
          // formData z frontendu
          formData: formData,
          // AI návrhy
          suggestions: analysisData,
        });
      }

      // Odošli výsledok klientovi
      return res.json({ suggestions: analysisData });
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      return res.status(500).json({
        error: "Invalid response format from AI",
      });
    }
  } catch (error) {
    console.error("Error message:", error.message);
    console.error("Error details:", error.response?.data);
    return res.status(500).json({ error: "Server Error" });
  }
});

// GET /api/analysis/history
router.get("/history", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const analyses = await Analysis.find({ user: userId }).sort({ createdAt: -1 });
    // Musíš vrátiť ako objekt s analyses
    return res.json({ analyses }); 
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Chyba servera" });
  }
});


export default router;
