export const modules = [
  {
    id: "unit-1",
    title: "Unit 1 — Foundations of Probability",
    icon: "🎯",
    color: "var(--accent-blue)",
    description: "Start here: Basic concepts of random experiments and axioms.",
    topics: [
      "Random experiment, outcome",
      "Sample space (finite vs infinite)",
      "Events and types (singleton, exhaustive)",
      "Axioms of probability",
      "Mutually exclusive vs independent events",
      "Complement, union, intersection"
    ],
    prerequisite: "basic set ideas",
    leadsTo: "Conditional Probability & Bayes"
  },
  {
    id: "unit-2",
    title: "Unit 2 — Conditional Probability & Basic Theorems",
    icon: "🔗",
    color: "var(--accent-mint)",
    description: "Deep dive into conditional logic and Bayes' Theorem.",
    topics: [
      "Conditional probability definition and interpretation",
      "Multiplication rule",
      "Law of Total Probability",
      "Bayes’ Theorem and common examples"
    ],
    prerequisite: "Unit 1",
    leadsTo: "Discrete distributions, inferential ideas"
  },
  {
    id: "unit-3",
    title: "Unit 3 — Counting Principles",
    icon: "🔢",
    color: "var(--accent-yellow)",
    description: "Essential tools for probability: Permutations and Combinations.",
    topics: [
      "Basic counting rule (product rule)",
      "Permutations (including with repeated elements)",
      "Combinations",
      "Counting with restrictions",
      "Counting with symmetries, round-table problems",
      "Distinguishability, committee forming"
    ],
    prerequisite: "Units 1–2",
    leadsTo: "Discrete probability distributions"
  },
  {
    id: "unit-4",
    title: "Unit 4 — Discrete Random Variables & PMF/CDF",
    icon: "🎲",
    color: "var(--accent-pink)",
    description: "Understanding random variables and their distributions.",
    topics: [
      "Random variable (definition), PMF, CDF",
      "Expectation (definition) and basic properties (linearity)",
      "Variance and properties",
      "Bernoulli distribution (PMF, mean, var)",
      "Binomial distribution (PMF, CDF, moments)",
      "Geometric distribution (PMF, CDF, memoryless property)",
      "Poisson distribution (PMF, CDF, expectation)",
      "Discrete uniform distribution (PMF)"
    ],
    prerequisite: "Units 1–3",
    leadsTo: "Joint distributions, sampling distributions"
  },
  {
    id: "unit-5",
    title: "Unit 5 — Joint, Marginal & Multiple Random Variables",
    icon: "📊",
    color: "var(--accent-lavender)",
    description: "How multiple random variables interact.",
    topics: [
      "Joint PMF/PDF for multiple random variables",
      "Marginal distributions",
      "Independence of multiple random variables",
      "Expectation of functions of multiple RVs",
      "Linearity of expectation for multiple RVs"
    ],
    prerequisite: "Unit 4",
    leadsTo: "Sampling distribution, covariance"
  },
  {
    id: "unit-6",
    title: "Unit 6 — Expectation & Variance — Common Results",
    icon: "📏",
    color: "var(--accent-blue)",
    description: "Standard results for common distributions.",
    topics: [
      "Expectation and variance for standard distributions (discrete + continuous revisit)",
      "Expectation/variance of Bernoulli, Binomial, Geometric, Poisson, Uniform, Exponential, Normal",
      "Properties of variance, unbiased estimator concept"
    ],
    prerequisite: "Units 4–5",
    leadsTo: "Descriptive stats, inference"
  },
  {
    id: "unit-7",
    title: "Unit 7 — Continuous Random Variables & Important PDFs/CDFs",
    icon: "📈",
    color: "var(--accent-mint)",
    description: "From Uniform to Normal distributions.",
    topics: [
      "PDF vs CDF, relationship (integration/differentiation)",
      "Continuous uniform distribution (PDF, CDF, moments)",
      "Exponential distribution (PDF, CDF, lack of memory, moments)",
      "Normal distribution (PDF, standard normal, CDF)",
      "Standard Normal, Z-table usage, standardization"
    ],
    prerequisite: "Units 4–6",
    leadsTo: "CLT, hypothesis testing, interval estimation"
  },
  {
    id: "unit-8",
    title: "Unit 8 — Descriptive Statistics & Visuals",
    icon: "🖼️",
    color: "var(--accent-yellow)",
    description: "Measures of tendency, dispersion, and data visualization.",
    topics: [
      "Measures of central tendency: mean, median, mode",
      "Measures of dispersion: variance, standard deviation, range",
      "Percentiles, quartiles, inter-quartile range",
      "Outliers, box plot, histogram",
      "Scatter plot, basic interpretation"
    ],
    prerequisite: "Units 4–6",
    leadsTo: "Correlation, regression, sampling theory"
  },
  {
    id: "unit-9",
    title: "Unit 9 — Correlation & Relationship Between Variables",
    icon: "📉",
    color: "var(--accent-pink)",
    description: "Exploring covariance and correlation.",
    topics: [
      "Covariance (definition and interpretation)",
      "Pearson correlation coefficient",
      "Spearman rank correlation (when to use)",
      "Interpretation, limitations"
    ],
    prerequisite: "Unit 8",
    leadsTo: "Inference about relationships"
  },
  {
    id: "unit-10",
    title: "Unit 10 — Sampling Theory & Estimation",
    icon: "🧪",
    color: "var(--accent-lavender)",
    description: "Population vs sample and point estimation.",
    topics: [
      "Population vs sample; sampling methods (simple, stratified, cluster, systematic, random)",
      "Sample statistic vs population parameter",
      "Sampling distribution of sample mean",
      "Point estimators, properties (bias, consistency, efficiency)",
      "Unbiased estimators, sample variance vs population variance",
      "Maximum likelihood estimator (discrete & overview for continuous)"
    ],
    prerequisite: "Units 4–7",
    leadsTo: "Hypothesis testing, confidence intervals"
  },
  {
    id: "unit-11",
    title: "Unit 11 — Interval Estimation & Hypothesis Testing",
    icon: "⚖️",
    color: "var(--accent-blue)",
    description: "Testing assumptions and estimating parameters.",
    topics: [
      "Confidence intervals for mean (known/unknown variance), margin of error",
      "Z-test basics and interpretation",
      "Null and alternative hypotheses",
      "One-tailed vs two-tailed tests",
      "Type I and Type II errors, significance level, power (introduction)"
    ],
    prerequisite: "Units 7, 10",
    leadsTo: "Practical testing applications, CLT usage"
  },
  {
    id: "unit-12",
    title: "Unit 12 — Limit Theorems & Applications",
    icon: "♾️",
    color: "var(--accent-mint)",
    description: "Law of Large Numbers and Central Limit Theorem.",
    topics: [
      "Law of Large Numbers (statement and intuition)",
      "Central Limit Theorem (statement, role of sample size)",
      "Applications of CLT in approximations (binomial→normal, sample means)"
    ],
    prerequisite: "Units 4–7, 10",
    leadsTo: "Final synthesis and applied problems"
  },
  {
    id: "unit-13",
    title: "Unit 13 — Revision & Applied Problems",
    icon: "🏁",
    color: "var(--accent-yellow)",
    description: "End here: Final review and integrated practice.",
    topics: [
      "Review core distributions and their moments",
      "Practice selecting distributions, computing probabilities via counting rules",
      "Interpreting plots and statistics",
      "End-to-end problems: sampling → estimation → testing → conclusion"
    ],
    prerequisite: "All previous units",
    leadsTo: "Final: Ready for end-sem exam"
  }
];
