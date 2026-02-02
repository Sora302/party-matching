// ===== データ =====
const questions = [
  {
    category: "経済",
    question: "経済政策として近い考えは？",
    options: ["今すぐ減税", "財政健全化重視", "どちらとも言えない"],
    partyA: "今すぐ減税"
  },
  {
    category: "外交",
    question: "外交姿勢として近い考えは？",
    options: ["対話重視", "防衛力強化", "どちらとも言えない"],
    partyA: "対話重視"
  }
];

let current = 0;
let answers = [];

// ===== 開始 =====
function start() {
  current = 0;
  answers = [];
  showQuestion();
}

// ===== 質問表示 =====
function showQuestion() {
  const q = questions[current];

  let html = `
    <h2>Q${current + 1}</h2>
    <p>${q.question}</p>
  `;

  q.options.forEach(option => {
    html += `
      <button onclick="answer('${option}')">${option}</button><br><br>
    `;
  });

  document.getElementById("app").innerHTML = html;
}

// ===== 回答処理 =====
function answer(choice) {
  answers.push(choice);
  current++;

  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// ===== 結果表示 =====
function showResult() {
  let html = `
    <h2>比較結果</h2>
    <table border="1" cellpadding="8">
      <tr>
        <th>カテゴリ</th>
        <th>政党A</th>
        <th>あなたの回答</th>
      </tr>
  `;

  questions.forEach((q, i) => {
    const match = q.partyA === answers[i];
    const style = match ? "background-color: red; color: white;" : "";

    html += `
      <tr>
        <td>${q.category}</td>
        <td style="${style}">${q.partyA}</td>
        <td style="${style}">${answers[i]}</td>
      </tr>
    `;
  });

  html += `
    </table>
    <br>
    <button onclick="start()">もう一度</button>
  `;

  document.getElementById("app").innerHTML = html;
}
