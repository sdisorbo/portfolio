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
    title: "Fine-Tuned GPT-3 Ancient Orator",
    description: "A natural language project that fine-tunes OpenAI's GPT-3 ada model to replicate the voice and rhetorical style of Demosthenes — the most celebrated orator of ancient Athens. Using cleaned and sampled text from the Olynthiac and Other Public Orations, 10,000 excerpts were prepared as training data. The model was fine-tuned for chat completion to emulate Demosthenes' tone, argument structure, and cadence. A self-training loop was built so that each user interaction was fed back into the model's fine-tuning pipeline, allowing accuracy to improve over time.",
    tags: ["Python", "OpenAI API", "GPT-3", "NLP", "Classical Civilization"],
    link: "/CLCIV 499 Final Report.pdf",
    images: ["/demos_project1.png", "/demos_project2.png", "/demos_project3.png"],
  },
];
