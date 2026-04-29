import { modules as basicModules } from './full_curriculum';

export const curriculum = basicModules.map(mod => ({
  ...mod,
  submodules: mod.topics.map((topic, index) => {
    const diff = getDifficulty(topic);
    return {
      id: `sub-${mod.id}-${index}`,
      title: topic,
      difficulty: diff,
      videos: getVideoPool(topic, index), // Array of videos for failover
      playground: getPlaygroundsForTopic(topic, index), // 8 Interactives
      content: generateNoteForTopic(topic) 
    };
  })
}));

function getDifficulty(topic) {
  const t = topic.toLowerCase();
  if (t.includes("clt") || t.includes("bayes") || t.includes("calculus") || t.includes("test") || t.includes("hypothesis") || t.includes("normal") || t.includes("poisson") || t.includes("inference") || t.includes("variance") || t.includes("chain rule") || t.includes("estimation") || t.includes("correlation")) return "hard";
  if (t.includes("probability") || t.includes("mean") || t.includes("counting") || t.includes("sample space") || t.includes("descriptive")) return "easy";
  return "medium";
}

function getVideoPool(topic, idx) {
  const t = topic.toLowerCase();
  const pool = [];
  
  // Official highly-stable anchors
  if (t.includes("calculus")) pool.push("7K1sB05pUX0", "WUvTyaaNkzM", "h78McVp6fG8", "v6S5_I5nKXA");
  else if (t.includes("bayes")) pool.push("HZGCoVF3YvM", "R13BD8qKeTg", "P8w49S9y6-4", "7p6_mY9f_mY");
  else if (t.includes("clt")) pool.push("zeJD6dqJ5lo", "3v9w79vS6mw", "YAlJCEDH2uY", "89m9M9H6VnE");
  else if (t.includes("distribution")) pool.push("mtbJITqpL5o", "b9a27Rd0B0M", "ohYm-7vXm5M", "ZzY_Z_I8f6M");
  else if (t.includes("normal")) pool.push("mtbJITqpL5o", "b9a27Rd0B0M", "ohYm-7vXm5M", "ZzY_Z_I8f6M");
  else if (t.includes("sampling")) pool.push("3E7hkBa79S0", "v8_6f9wZ3YI", "7mEIsZInb6U", "A1X9p8K_lqU");
  else if (t.includes("hypothesis") || t.includes("test")) pool.push("VK-rnA3-41c", "I10q6fjPxJ0", "0oc49DyA3hU", "tTeMYuS87oU");
  else pool.push("v6S5_I5nKXA", "KkaU26u4-M0", "7p6_mY9f_mY", "f9R08BOniLw");

  return pool;
}

function getPlaygroundsForTopic(topic, idx) {
  const t = topic.toLowerCase();
  const list = [];
  const s = (idx * 31) % 1000;

  // Add 8 UNIQUE interactives for every topic
  if (t.includes("calculus") || t.includes("derivative")) {
    list.push({ type: "calculus-visualizer", config: { topic: `Function Trace #${s+1}`, func: "x^2", mode: "graph" } });
    list.push({ type: "calculus-visualizer", config: { topic: `Tangent Logic #${s+2}`, func: "sin(x)", mode: "tangent" } });
    list.push({ type: "game-challenge", config: { topic: `Speed Deriv #${s+3}`, gameType: "derivative-match" } });
    list.push({ type: "stats-calculator", config: { topic: `Gradient Table #${s+4}` } });
    list.push({ type: "data-analyzer", config: { topic: `Slope Mapping #${s+5}` } });
    list.push({ type: "game-challenge", config: { topic: `Calculus Duel #${s+6}`, gameType: "calc" } });
    list.push({ type: "calculus-visualizer", config: { topic: `Oscillation Plot #${s+7}`, func: "cos(x)", mode: "graph" } });
    list.push({ type: "probability-simulator", config: { topic: `Step Approximation #${s+8}` } });
  } else if (t.includes("integr")) {
    list.push({ type: "calculus-visualizer", config: { topic: `Area Plot #${s+1}`, func: "x^2", mode: "integral" } });
    list.push({ type: "stats-calculator", config: { topic: `Riemann Sums #${s+2}` } });
    list.push({ type: "game-challenge", config: { topic: `Area Hunter #${s+3}`, gameType: "area-match" } });
    list.push({ type: "data-analyzer", config: { topic: `Accumulation Map #${s+4}` } });
    list.push({ type: "probability-simulator", config: { topic: `Monte Carlo Area #${s+5}` } });
    list.push({ type: "game-challenge", config: { topic: `Integral Sprint #${s+6}`, gameType: "calc" } });
    list.push({ type: "venn-diagram", config: { topic: `Domain Overlap #${s+7}` } });
    list.push({ type: "stats-calculator", config: { topic: `Summation Grid #${s+8}` } });
  } else if (t.includes("probability") || t.includes("bayes") || t.includes("event") || t.includes("sample space")) {
    list.push({ type: "probability-simulator", config: { topic: `Outcome Engine #${s+1}`, mode: "standard" } });
    list.push({ type: "tree-diagram", config: { topic: `Conditional Tree #${s+2}` } });
    list.push({ type: "venn-diagram", config: { topic: `Set Logic #${s+3}` } });
    list.push({ type: "game-challenge", config: { topic: `Odds Sprint #${s+4}`, gameType: "prob-calc" } });
    list.push({ type: "probability-simulator", config: { topic: `Bayes Update #${s+5}`, mode: "bayes-prior" } });
    list.push({ type: "data-analyzer", config: { topic: `Sample Matrix #${s+6}` } });
    list.push({ type: "game-challenge", config: { topic: `Logic Duel #${s+7}`, gameType: "logic-match" } });
    list.push({ type: "sampling-simulator", config: { topic: `Chance Sweep #${s+8}` } });
  } else if (t.includes("sampling") || t.includes("estimation") || t.includes("test")) {
    list.push({ type: "sampling-simulator", config: { topic: `Sample Puller #${s+1}` } });
    list.push({ type: "stats-calculator", config: { topic: `Z-Score Calc #${s+2}` } });
    list.push({ type: "distribution-visualizer", config: { topic: `Hypothesis Curve #${s+3}`, distType: "normal" } });
    list.push({ type: "game-challenge", config: { topic: `Significance Race #${s+4}`, gameType: "logic-match" } });
    list.push({ type: "data-analyzer", config: { topic: `Error Margin Map #${s+5}` } });
    list.push({ type: "sampling-simulator", config: { topic: `Population Sim #${s+6}` } });
    list.push({ type: "stats-calculator", config: { topic: `Confidence Interval #${s+7}` } });
    list.push({ type: "tree-diagram", config: { topic: `Decision Tree #${s+8}` } });
  } else {
    // 8 unique generic interactives
    list.push({ type: "stats-calculator", config: { topic: `Data Engine #${s+1}` } });
    list.push({ type: "probability-simulator", config: { topic: `Randomness Lab #${s+2}` } });
    list.push({ type: "data-analyzer", config: { topic: `Correlation Grid #${s+3}` } });
    list.push({ type: "game-challenge", config: { topic: `Logic Dash #${s+4}`, gameType: `logic-${idx % 5}` } });
    list.push({ type: "distribution-visualizer", config: { topic: `Normal Pivot #${s+5}`, distType: "normal" } });
    list.push({ type: "sampling-simulator", config: { topic: `Large N Sim #${s+6}` } });
    list.push({ type: "venn-diagram", config: { topic: `Topic Intersection #${s+7}` } });
    list.push({ type: "tree-diagram", config: { topic: `Logic Branch #${s+8}` } });
  }

  return list;
}

function generateNoteForTopic(topic) {
  const t = topic.toLowerCase();
  let note = `<div class="human-font">Hey there! Let's talk about <strong>${topic}</strong>. </div>\n\n`;
  
  if (t.includes("calculus")) {
    note += "Calculus is really just about how things change. Think of it like a movie where every frame is a derivative, and the whole movie is the integral. We look at $f'(x)$ to see the speed of change right at a specific moment.";
  } else if (t.includes("bayes")) {
    note += "Bayes' Theorem is like being a detective. You start with what you think you know (the prior), and as you get new evidence, you update your beliefs. It's super powerful for things like medical tests or spam filters!";
  } else if (t.includes("normal") || t.includes("z-table")) {
    note += "The Normal Distribution is the 'Bell Curve' you see everywhere. It's so common because of the Central Limit Theorem – basically, if you add up enough random things, they eventually look like this smooth curve. We use Z-scores to figure out where a piece of data sits relative to the average.";
  } else if (t.includes("clt")) {
    note += "The Central Limit Theorem is basically magic. It says that no matter how weird your data starts out, if you take enough samples and average them, those averages will always follow a normal distribution. This is why we can do statistics on almost anything!";
  } else if (t.includes("counting") || t.includes("permutation") || t.includes("combination")) {
    note += "Counting sounds easy, but it gets tricky! Permutations are for when order matters (like a password), and Combinations are for when it doesn't (like a hand of cards). We use these to figure out all the possible ways things can happen.";
  } else {
    note += `So, <strong>${topic}</strong> is a really important piece of the puzzle. It helps us understand the structure of probability and how we can use it to make sense of the world. Take a look at the interactive tools above – they're the best way to really 'feel' how it works before your exam!`;
  }
  
  return note;
}

export const getAllQuestions = () => [];
