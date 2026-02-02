// =======================
// 質問（カテゴリ別）
// =======================
const questions = [
  {
    category: "経済",
    question: "経済政策として近い考えは？",
    options: ["今すぐ減税", "段階的減税", "財政健全化重視"]
  },
  {
    category: "社会保障",
    question: "社会保障について近い考えは？",
    options: ["国の支出を増やす", "効率化を進める", "自己責任重視"]
  },
  {
    category: "エネルギー",
    question: "エネルギー政策として近い考えは？",
    options: ["再生可能エネルギー重視", "原発活用", "現状維持"]
  },
  {
    category: "外交・安保",
    question: "外交・安全保障で近い考えは？",
    options: ["対話重視", "防衛力強化", "中立志向"]
  }
];

// =======================
// 政党データ（全政党）
// =======================
const parties = [
  {
    name: "自民党",
    policies: {
      経済: "段階的減税",
      社会保障: "効率化を進める",
      エネルギー: "原発活用",
      "外交・安保": "防衛力強化"
    }
  },
  {
    name: "中道改革連合",
    policies: {
      経済: "段階的減税",
      社会保障: "効率化を進める",
      エネルギー: "現状維持",
      "外交・安保": "対話重視"
    }
  },
  {
    name: "日本維新の会",
    policies: {
      経済: "今すぐ減税",
      社会保障: "効率化を進める",
      エネルギー: "原発活用",
      "外交・安保": "防衛力強化"
    }
  },
  {
    name: "国民民主党",
    policies: {
      経済: "段階的減税",
      社会保障: "国の支出を増やす",
      エネルギー: "原発活用",
      "外交・安保": "対話重視"
    }
  },
  {
    name: "日本共産党",
    policies: {
      経済: "今すぐ減税",
      社会保障: "国の支出を増やす",
      エネルギー: "再生可能エネルギー重視",
      "外交・安保": "中立志向"
    }
  },
  {
    name: "れいわ新選組",
    policies: {
      経済: "今すぐ減税",
      社会保障: "国の支出を増やす",
      エネルギー: "再生可能エネルギー重視",
      "外交・安保": "対話重視"
    }
  },
  {
    name: "減税日本・ゆうこく連合",
    policies: {
      経済: "今すぐ減税",
      社会保障: "効率化を進める",
      エネルギー: "現状維持",
      "外交・安保": "対話重視"
    }
  },
  {
    name: "参政党",
    policies: {
      経済: "段階的減税",
      社会保障: "自己責任重視",
      エネルギー: "原発活用",
      "外交・安保": "防衛力強化"
    }
  },
  {
    name: "日本保守党",
    policies: {
      経済: "段階的減税",
      社会保障: "自己責任重視",
      エネルギー: "原発活用",
      "外交・安保": "防衛力強化"
    }
  },
  {
    name: "社会民主党",
    policies: {
      経済: "今すぐ減税",
      社会保障: "国の支出を増やす",
      エネルギー: "再生可能エネルギー重視",
      "外交・安保": "対話重視"
    }
  },
  {
    name: "チームみらい",
    policies: {
      経済: "段階的減税",
      社会保障: "国の支出を増やす",
      エネルギー: "再生可能エネルギー重視",
      "外交・安保": "対話重視"
    }
  }
];

let current = 0;
let answers = {};

// =======================
// 診断開始
// =======================
function start() {
  current = 0;
  answers = {};
  showQuestion();
}

// =======================
// 質問表示
// =======================
function showQuestion() {
  const q = questions[current];
  let html = `
    <h2>Q${current + 1}</h2>
    <p><strong>${q.category}</strong></p>
    <p>${q.question}</p>
  `;

  q.options.forEach(opt => {
    html += `<button onclick="answer('${q.category}', '${opt}')">${opt}</button><br>`;
  });

  document.getElementById("app").innerHTML = html;
}

// =======================
// 回答処理
// =======================
function answer(category, choice) {
  answers[category] = choice;
  current++;

  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// =======================
// 結果表示
// =======================
function showResult() {
  let results = parties.map(party => {
    let score = 0;
    questions.forEach(q => {
      if (party.policies[q.category] === answers[q.category]) {
        score++;
      }
    });
    return { ...party, score };
  });

  results.sort((a, b) => b.score - a.score);

  let html = `<h2>診断結果</h2>`;
  html += `<h3>最も近い政党：${results[0].name}（一致 ${results[0].score}）</h3>`;

  results.forEach(party => {
    html += `<h4>${party.name}</h4>`;
    html += `
      <table>
        <tr>
          <th>カテゴリ</th>
          <th>政党の政策</th>
          <th>あなたの回答</th>
        </tr>
    `;

    questions.forEach(q => {
      const match = party.policies[q.category] === answers[q.category];
      html += `
        <tr>
          <td>${q.category}</td>
          <td class="${match ? "match" : ""}">${party.policies[q.category]}</td>
          <td class="${match ? "match" : ""}">${answers[q.category]}</td>
        </tr>
      `;
    });

    html += `</table>`;
  });

  html += `<button onclick="start()">もう一度</button>`;
  document.getElementById("app").innerHTML = html;
}
