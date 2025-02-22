import { AiFillStar } from "react-icons/ai";
import { BsCircle } from "react-icons/bs";
import { FaFilter } from "react-icons/fa";
import { GiTriangleTarget } from "react-icons/gi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

export const technologies = [
  {
    name: "Blockchain Technológie",
    description:
      "Blockchain sa v posledných rokoch stáva základnou technológiou v oblasti financií. Jeho potenciál priniesol vyššiu transparentnosť a znížil náklady na sprostredkovateľov. Okrem kryptomien umožňuje blockchain sledovať a zaznamenávať transakcie nezmeniteľným spôsobom, čo posilňuje dôveru medzi stranami.",
    bgColor: "#e8a435",
    boxShadowColor: "rgba(255, 230, 0, 0.8)",
    dataKey: "growth",
    chartData: [
      { year: 2018, growth: 20 },
      { year: 2019, growth: 35 },
      { year: 2020, growth: 50 },
      { year: 2021, growth: 70 },
      { year: 2022, growth: 90 },
    ],
    benefits: [
      "Zvýšená transparentnosť transakcií",
      "Zníženie nákladov na sprostredkovateľov",
      "Bezpečné a nezmeniteľné záznamy",
      "Škálovateľnosť v rôznych sektoroch vrátane zdravotníctva a logistiky",
    ],
    link:'/blockchain'
  },
  {
    name: "Umelá Inteligencia vo Financovaní",
    description:
      "AI transformuje financie vďaka automatizácii analýz dát, predikcií trendov a zlepšeniu rozhodovacích procesov. Od chatbotov po prediktívne modely, AI zlepšuje skúsenosti zákazníkov, znižuje náklady a zvyšuje efektivitu.",
    bgColor: "#007791",
    boxShadowColor: "rgba(0, 153, 255, 0.8)",
    dataKey: "adoption",
    chartData: [
      { year: 2018, adoption: 15 },
      { year: 2019, adoption: 30 },
      { year: 2020, adoption: 45 },
      { year: 2021, adoption: 60 },
      { year: 2022, adoption: 80 },
    ],
    benefits: [
      "Lepšie rozhodovanie na základe dát",
      "Automatizácia opakujúcich sa úloh",
      "Zlepšenie zákazníckej skúsenosti",
      "Prediktívna analýza rizík",
    ],
    link:'/umela-inteligencia'
  },
  {
    name: "Mobilné Platby",
    description:
      "V posledných rokoch sa mobilné platby stali štandardom pre milióny používateľov po celom svete. Technológie ako NFC a QR kódy umožňujú rýchle a bezpečné platby, čím zlepšujú zákaznícku skúsenosť a zvyšujú mieru prijatia na trhu.",
    bgColor: "#a855f7",
    boxShadowColor: "rgba(173, 0, 255, 0.8)",
    dataKey: "convenience",
    chartData: [
      { year: 2018, convenience: 25 },
      { year: 2019, convenience: 40 },
      { year: 2020, convenience: 55 },
      { year: 2021, convenience: 70 },
      { year: 2022, convenience: 85 },
    ],
    benefits: [
      "Rýchle a pohodlné transakcie",
      "Zvýšenie zákazníckej spokojnosti",
      "Bezpečné platobné metódy",
      "Rozšírená dostupnosť po celom svete",
    ],
    link:'/'
  },
  {
    name: "Kybernetická Bezpečnosť",
    description:
      "Kybernetická bezpečnosť je pre podniky kritická, najmä vzhľadom na rastúci počet útokov na digitálne systémy. Moderné bezpečnostné technológie chránia citlivé údaje a finančné transakcie pred útokmi, čím zvyšujú dôveru zákazníkov.",
    bgColor: "#9fcb8d",
    boxShadowColor: "rgba(0, 255, 153, 0.8)",
    dataKey: "security",
    chartData: [
      { year: 2018, security: 30 },
      { year: 2019, security: 50 },
      { year: 2020, security: 65 },
      { year: 2021, security: 80 },
      { year: 2022, security: 95 },
    ],
    benefits: [
      "Ochrana pred kybernetickými útokmi",
      "Zabezpečenie citlivých údajov",
      "Dôvera zákazníkov v bezpečnosť",
      "Špičkové riešenia pre detekciu hrozieb",
    ],
    link:'/'
  },
  {
    name: "RegTech Riešenia",
    description:
      "RegTech je nevyhnutný pre finančné inštitúcie, ktoré sa musia prispôsobiť neustále sa meniacej legislatíve. Automatizácia procesov súladu s predpismi znižuje náklady a riziká, pričom poskytuje vyššiu efektivitu a presnosť.",
    bgColor: "#e66d74",
    boxShadowColor: "rgba(255, 0, 102, 0.8)",
    dataKey: "compliance",
    chartData: [
      { year: 2018, compliance: 20 },
      { year: 2019, compliance: 35 },
      { year: 2020, compliance: 55 },
      { year: 2021, compliance: 75 },
      { year: 2022, compliance: 90 },
    ],
    benefits: [
      "Zníženie nákladov na dodržiavanie predpisov",
      "Minimalizácia rizík súvisiacich s reguláciou",
      "Automatizácia regulačných procesov",
      "Zlepšenie rýchlosti spracovania dát",
    ],
    link:'/'
  },
];
