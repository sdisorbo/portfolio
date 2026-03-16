const experience = [
  {
    title: "Sourcing and Procurement Analyst",
    company: "Accenture",
    location: "New York, NY",
    period: "Sep 2025 – Present",
    bullets: [
      "Benchmark IT service rates against industry standards to identify cost-reduction levers and negotiation points.",
      "Establish comprehensive spend baselines in Excel and perform contract reviews to uncover savings opportunities.",
    ],
  },
  {
    title: "Applied Intelligence Summer Analyst",
    company: "Accenture",
    location: "New York, NY",
    period: "May – Aug 2023, 2024",
    bullets: [
      "Analyzed pilot results for a predictive model using SQL and presented model improvement insights to client directors.",
      "Designed a Gen AI model to match over 1,000 employees to open projects within Accenture's Data and AI practice.",
    ],
  },
  {
    title: "Research Assistant",
    company: "University of Michigan Bioinformatics",
    location: "Ann Arbor, MI",
    period: "Aug 2023 – May 2025",
    bullets: [
      "Enhanced pre-built PyTorch CNN by integrating a time distribution layer to reproduce gene profiling results.",
      "Added diffusion layer to pre-trained TensorFlow model to predict sequence variation effects on gene expression.",
    ],
  },
  {
    title: "Data Analyst",
    company: "Michigan Men's DI Ice Hockey",
    location: "Ann Arbor, MI",
    period: "Aug 2021 – May 2024",
    bullets: [
      "Collaborated with coaching staff and analyst team to evaluate player health data and improve athletic performance.",
      "Leveraged Python and R to visualize empirical data and provide weekly reports on how to improve team performance.",
    ],
  },
];

const skills = [
  { label: "Languages", items: "C++, R, Python, SQL, JavaScript" },
  { label: "Platforms", items: "Power BI, Tableau, RShiny, PowerPoint, Excel, Teradata, Confluence, JIRA" },
  { label: "Libraries", items: "Pandas, NumPy, xGBoost, OpenAI, NLTK, Gensim, Tweepy, PyTorch, TensorFlow" },
  { label: "Dev Tools", items: "VS Code, Anaconda, Jupyter, XCode, Posit, Git, GitLab, GPT" },
];

const extracurriculars = [
  "Accenture Tech Strategy Resources Assets Team — Generative AI agent development (2024–Present)",
  "Accenture Trading, Investments and Optimization Strategy Analyst (2026–Present)",
  "SIFMA Foundation Stock Market Competition — 2nd Place (2021)",
  "Accenture 2026 Analyst Pitch Competition — Top-10 Finalist",
];

export default function Professional() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      <h1 className="text-4xl font-bold tracking-tight">Professional</h1>

      {/* Experience */}
      <section>
        <h2 className="text-2xl font-semibold mb-8">Experience</h2>
        <div className="space-y-8">
          {experience.map((role) => (
            <div key={role.title + role.period} className="p-6 rounded-xl border border-border bg-card">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-3">
                <div>
                  <h3 className="font-semibold text-mahogany text-lg">{role.title}</h3>
                  <p className="text-accent font-medium text-sm">{role.company} · {role.location}</p>
                </div>
                <span className="text-xs text-mahogany/40 whitespace-nowrap">{role.period}</span>
              </div>
              <ul className="space-y-1.5">
                {role.bullets.map((b) => (
                  <li key={b} className="text-sm text-mahogany/70 leading-relaxed flex gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-mahogany/30 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Skills */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Technical Skills</h2>
        <div className="p-6 rounded-xl border border-border bg-card space-y-3">
          {skills.map(({ label, items }) => (
            <div key={label} className="flex flex-col md:flex-row gap-1 md:gap-4 text-sm">
              <span className="font-medium text-mahogany w-28 flex-shrink-0">{label}</span>
              <span className="text-mahogany/70">{items}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Extracurriculars */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Extracurricular / Awards</h2>
        <div className="p-6 rounded-xl border border-border bg-card space-y-2">
          {extracurriculars.map((item) => (
            <p key={item} className="text-sm text-mahogany/70 leading-relaxed flex gap-2">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-mahogany/30 flex-shrink-0" />
              {item}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
