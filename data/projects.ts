export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  images?: string[];
  todo?: boolean;
}

export const projects: Project[] = [
  {
    title: "Agora",
    description: "Agora is a full-stack web application I designed and built as an on-demand marketplace for apartment touring. Renters can discover and book property tours on demand, while hosts manage availability and listings — all in one seamless platform. The app integrates the Zillow API for live property data, Stripe for secure payments, and a built-in video chat feature for virtual tours. Built with a SQL database and full user authentication, Agora was developed end-to-end as a solo project and reflects my interest in building complete, production-grade software systems.",
    tags: ["TypeScript", "React Native", "Python", "Flask", "Stripe", "SQL"],
    link: "https://github.com/sdisorbo/agora",
    images: ["/agora1.png.jpeg", "/agora2.png.jpeg", "/agora3.png.jpeg", "/agora4.png.jpeg"],
  },
  {
    title: "Undergraduate Honors Thesis — Modeling Enhancer Transcription with Transformer Architectures",
    description: "Gene expression is governed by complex interactions between regulatory elements like enhancers and promoters, and the transcription factors that bind them. While RNA-seq and ATAC-seq have expanded our understanding of transcriptional activity and chromatin accessibility, neither method directly links regulatory elements to transcriptional outcomes. This thesis addresses that gap by adapting an existing transformer-based model to enhancer-specific datasets, using a novel set of non-overlapping bidirectional enhancer sequences paired with 5' RNA sequencing data. The model successfully predicted general RNA coverage and transcription start site usage — a meaningful step toward computationally modeling how enhancers and promoters drive gene regulation.",
    tags: ["Python", "PyTorch", "Transformers", "Bioinformatics", "RNA-seq", "ATAC-seq", "University of Michigan"],
    link: "/Samuel_DiSorbo_Thesis.pdf",
    images: ["/thesis_image.png"],
  },
  {
    title: "College Football Spread Prediction Model",
    description: "A machine learning model built to predict college football game spreads against the line. Scraped eight years of historical play-by-play data from the cfbfastR API, engineered features from team performance metrics, and trained an xGBoost model to generate weekly spread predictions. The model achieved accuracy 4% above the efficiency threshold — a meaningful edge in a domain where even small advantages are difficult to sustain.",
    tags: ["R", "RShiny", "xGBoost", "CFB API", "Sports Analytics"],
    link: "https://github.com/sdisorbo/cfb_spread_betting_model?tab=readme-ov-file",
    images: ["/alice_project1.png", "/alice_project2.png", "/alice_project3.png"],
  },
  {
    title: "MLB Prediction Engine",
    description: "A full-stack MLB analytics platform inspired by FiveThirtyEight's prediction pages. The engine pulls live data from the MLB Stats API, computes ELO ratings game-by-game across the full season, and runs daily Monte Carlo playoff simulations to generate win probabilities by round for all 30 teams. A GitHub Actions cron job refreshes the data every morning and commits updated JSON files, which the Next.js frontend consumes directly. Features include an interactive standings table with ELO ratings and playoff odds, a pitcher stats dot plot grouped by division, and a team ELO rating history chart.",
    tags: ["Python", "Next.js", "ELO Rating", "Monte Carlo Simulation", "MLB Stats API", "GitHub Actions", "Sports Analytics"],
    link: "https://samalytics-mlb.vercel.app/standings",
    images: ["/mlbproject2.png", "/mlbproject3.png"],
  },
  {
    title: "NHL ELO Rating Model & Playoff Simulator",
    description: "An end-to-end NHL analytics pipeline built in R. The model scrapes play-by-play data for a given season, cleans and preprocesses team performance metrics to establish initial ratings, then runs a game-by-game ELO update loop with O(n log n) time complexity to track each team's rating progression across the full season. A separate playoff simulator takes the final ELO ratings, accepts the 16 playoff teams as input, and runs 10,000 Monte Carlo simulations to compute each team's probability of advancing through every round — from the first round all the way to the Stanley Cup.",
    tags: ["R", "ELO Rating", "Monte Carlo Simulation", "Sports Analytics", "Web Scraping"],
    link: "https://github.com/sdisorbo/nhl-elo-model",
    images: ["/nhlelo_project1.png", "/nhlelo_project2.png", "/nhlelo_project3.png"],
  },
  {
    title: "IndustryRank",
    description: "IndustryRank is a full-stack web application that generates anonymous, community-driven rankings of companies and institutions across 14 major industries — including Investment Banking, Consulting, Big Tech, Private Equity, and more. Users vote in head-to-head matchups, and rankings are computed in real time using an ELO rating system (the same model used in competitive chess), so every vote shifts the leaderboard. The platform distinguishes between insider and outside-observer votes, and tracks career-level breakdowns so the data reflects who is actually doing the ranking. Matchups are weighted toward similarly-rated companies to maximize meaningful comparisons. Built with Next.js, Supabase (PostgreSQL), and TypeScript, with a custom seed pipeline that loaded ~900 companies and ~9,000 rating rows directly via the Supabase REST API.",
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "ELO Rating", "Full-Stack"],
    link: "https://industryrank.vercel.app/",
    images: ["/indsutry1.png", "/indsutry2.png", "/indsutry3.png"],
  },
  {
    title: "Fine-Tuned GPT-3 Ancient Orator",
    description: "A natural language project that fine-tunes OpenAI's GPT-3 ada model to replicate the voice and rhetorical style of Demosthenes — the most celebrated orator of ancient Athens. Using cleaned and sampled text from the Olynthiac and Other Public Orations, 10,000 excerpts were prepared as training data. The model was fine-tuned for chat completion to emulate Demosthenes' tone, argument structure, and cadence. A self-training loop was built so that each user interaction was fed back into the model's fine-tuning pipeline, allowing accuracy to improve over time.",
    tags: ["Python", "OpenAI API", "GPT-3", "NLP", "Classical Civilization"],
    link: "/CLCIV 499 Final Report.pdf",
    images: ["/demos_project1.png", "/demos_project2.png", "/demos_project3.png"],
  },
];
