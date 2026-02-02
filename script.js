// 11カテゴリ
const categories = [
  "経済・財政",
  "社会保障",
  "エネルギー",
  "外交・安保",
  "家族・子育て",
  "農政",
  "外国人政策",
  "政治改革",
  "教育",
  "ジェンダー",
  "テクノロジー"
];

// 質問（柔らかめ）
const questions = [
  {
    category: "経済・財政",
    text: "物価が高い今、国がまずやるべきだと思うのは？",
    choices: ["減税を優先", "賃上げを優先", "どちらも大事"]
  },
  {
    category: "社会保障",
    text: "医療や年金について近い考えは？",
    choices: ["国の負担を増やす", "負担と給付のバランス", "自己責任重視"]
  },
  {
    category: "エネルギー",
    text: "原子力発電についてどう思う？",
    choices: ["使わない方向へ", "条件付きで使う", "積極的に使う"]
  },
  {
    category: "外交・安保",
    text: "日本の安全保障で近い考えは？",
    choices: ["軍事より外交", "バランス重視", "防衛力強化"]
  },
  {
    category: "家族・子育て",
    text: "子育て支援についてどう思う？",
    choices: ["国が大きく支援", "必要な人に支援", "家庭の責任重視"]
  },
  {
    category: "農政",
    text: "食料について近い考えは？",
    choices: ["国内自給を最優先", "輸出も重視", "市場に任せる"]
  },
  {
    category: "外国人政策",
    text: "外国人の受け入れについては？",
    choices: ["受け入れ拡大", "ルール整備", "厳しく制限"]
  },
  {
    category: "政治改革",
    text: "政治とお金の問題について",
    choices: ["厳しく規制", "透明化重視", "今の制度で十分"]
  },
  {
    category: "教育",
    text: "教育費についてどう思う？",
    choices: ["無償化を進める", "一部支援", "自己負担"]
  },
  {
    category: "ジェンダー",
    text: "夫婦別姓や同性婚について",
    choices: ["法整備すべき", "議論を続ける", "現状維持"]
  },
  {
    category: "テクノロジー",
    text: "AIやデジタル技術の活用は？",
    choices: ["積極活用", "慎重に導入", "あまり必要ない"]
  }
];

// 政党スタンス（超重要）
const parties = {
  "チームみらい": [
    1,1,2,2,1,1,2,1,1,1,1
  ],
  "国民民主党": [
    1,2,2,2,2,1,2,2,2,2,2
  ],
  "自民党": [
    2,2,3,3,2,2,2,2,2,2,2
  ],
  "れいわ新選組": [
    1,1,1,1,1,1,1,1,1,1,1
  ],
  "日本共産党": [
    1,1,1,1,1,1,1,1,1,1,1
  ],
  "日本維新の会": [
    2,3,3,3,2,2,3,2,2,2,2
  ],
  "参政党": [
    2,2,2,3,2,1,3,2,2,2,2
  ],
  "日本保守党": [
    2,2,3,3,2,2,3,2,2,3,2
  ],
  "社会民主党": [
    1,1,1,1,1,1,1,1,1,1,1
  ],
  "減税日本・ゆうこく連合": [
    1,1,2,2,2,2,2,1,2,2,2
  ],
  "中道改革連合": [
  1, // 経済・財政（恒久的食料品ゼロ、給付付き税額控除）
  1, // 社会保障（現役世代負担軽減）
  2, // エネルギー（条件付き原発＋再エネ）
  2, // 外交・安保（専守防衛＋日米同盟）
  1, // 家族・子育て（保育・教育無償化）
  1, // 農政（食料安保重視）
  2, // 外国人政策（多文化共生＋ルール）
  1, // 政治改革（献金規制・第三者機関）
  1, // 教育（給食・教育費軽減）
  1, // ジェンダー（別姓・同性婚）
  2  // テクノロジー（現実的活用）
  ],

};

let answers = [];
let current = 0;

start();

function start() {
  showQuestion();
}

function showQuestion() {
  const q = questions[current];
  let html = `
    <h2>${q.category}</h2>
    <p>${q.text}</p>
  `;
  q.choices.forEach((c, i) => {
    html += `<button onclick="answer(${i+1})">${c}</button>`;
  });
  document.getElementById("app").innerHTML = html;
}

function answer(value) {
  answers.push(value);
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  let scores = {};

  for (let party in parties) {
    let score = 0;
    parties[party].forEach((v, i) => {
      if (v === answers[i]) score++;
    });
    scores[party] = score;
  }

  const sorted = Object.entries(scores).sort((a,b)=>b[1]-a[1]);
  const topParty = sorted[0][0];

  let html = `<h2>あなたに最も近い政党</h2>
              <h3>${topParty}</h3>`;

  html += `<table>
    <tr>
      <th>カテゴリ</th>
      <th>${topParty}</th>
      <th>あなた</th>
    </tr>`;

  categories.forEach((cat, i) => {
    const match = parties[topParty][i] === answers[i];
    html += `
      <tr>
        <td>${cat}</td>
        <td class="${match ? "match" : ""}">${parties[topParty][i]}</td>
        <td class="${match ? "match" : ""}">${answers[i]}</td>
      </tr>
    `;
  });

  html += `</table>
    <button onclick="location.reload()">もう一度やる</button>`;

  document.getElementById("app").innerHTML = html;
}
