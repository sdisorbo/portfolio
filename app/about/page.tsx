export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-10">About</h1>

      {/* Avatar placeholder */}
      <div className="mb-10 flex items-center gap-6">
        <div className="w-40 h-40 rounded-full overflow-hidden border border-border flex-shrink-0">
          <img
            src="/sam_fun_photo.png"
            alt="Samuel DiSorbo"
            className="w-full h-full object-cover scale-125"
            style={{ objectPosition: "15% 15%" }}
          />
        </div>
        <div>
          <p className="font-semibold text-xl">Samuel Fernando DiSorbo</p>
          <p className="text-mahogany/60 text-sm">New York, NY</p>
        </div>
      </div>

      {/* Bio */}
      <div className="mb-10 space-y-4 text-mahogany/80 text-sm leading-relaxed">
        <p>
          Hi! My name is Samuel Fernando DiSorbo - most people call me Sam.
        </p>
        <p>
          I&apos;m an Analyst at <a href="https://www.accenture.com/us-en" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Accenture</a>, where I work across Sourcing &amp; Procurement, as well as Quantitative Analytics for the Accenture Trading, Investments &amp; Optimization Strategy practice.
          My day-to-day involves turning complex supply chain and procurement data into clear, actionable insights -
          work that sits at the crossroads of rigorous analysis and real savings impact. In addition, I apply quantitative research and model-building to find edges in complex, competitive problem spaces. Beyond my role at Accenture,
          my professional interests span machine learning, AI, financial markets, energy and grid systems, and the
          application of quantitative methods to hard problems.
        </p>
        <p>
          I studied Data Science at the University of Michigan, where I graduated with honors and picked up a minor in
          Classical Civilization along the way.
        </p>
        <p>
          Outside of work, I&apos;m a Boston sports fan, an avid traveler, a wine lover,
          and reader. I also enjoy racquet sports, and take my chess seriously (even though my skills don't reflect so).
        </p>
        <p>
          I built this site as a simple collection - a place to bring together my professional work, personal interests, and
          the projects I care about in one corner of the internet. Thanks for stopping by!
        </p>
      </div>

      {/* Quick facts */}
      <div className="space-y-6 text-mahogany/80 leading-relaxed">
        <div>
          <h2 className="font-semibold text-mahogany mb-1">Education</h2>
          <p>B.S. Data Science – Honors, minor in Classical Civilization — University of Michigan.</p>
        </div>
        <div>
          <h2 className="font-semibold text-mahogany mb-1">Hometown</h2>
          <p>Burlington, CT</p>
        </div>
        <div>
          <h2 className="font-semibold text-mahogany mb-1">Sports Affiliations</h2>
          <p>Lifelong Boston sports fan. City of champions. And Go BLUE!</p>
        </div>
        <div>
          <h2 className="font-semibold text-mahogany mb-1">Personal Interests</h2>
          <p>Wine, food, travel, reading, racquet sports, chess.</p>
        </div>
      </div>
    </div>
  );
}
