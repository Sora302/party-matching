function start() {
  document.getElementById("app").innerHTML = `
    <h2>Q1</h2>
    <p>将来の日本について、近い考えは？</p>
    <button onclick="result()">安定を重視</button><br><br>
    <button onclick="result()">改革を重視</button><br><br>
    <button onclick="result()">どちらとも言えない</button>
  `;
}

function result() {
  document.getElementById("app").innerHTML = `
    <h2>結果</h2>
    <p>あなたの考え方は中道寄りです。</p>
    <p>近い政党：チームみらい / 国民民主党</p>
    <button onclick="location.reload()">もう一度</button>
  `;
}
