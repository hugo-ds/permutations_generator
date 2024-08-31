// 共通の内部再帰関数
const innerPC = filterFunc => selecteds => k => options =>  
  (k === 0) ? [selecteds]
  : options.flatMap(
      (e, i) =>
        innerPC(filterFunc)([...selecteds, e])(k - 1)(filterFunc(i)(options))
    );

// 順列
const permFilter = i => options =>
  [...options.slice(0, i), ...options.slice(i + 1)];
const perm =  
  innerPC(permFilter)([]);

function generateCandidates() {
  // HTMLから入力を取得
  let word = document.getElementById('word').value;
  let characters = document.getElementById('characters').value;

  // 上記の文字を使ったすべての順列
  let results = perm(word.length)([...characters]);

  let is_candidate = true;
  let answers = [];

  // 前回の結果をクリア
  let tableBody = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = '';

  // 順列をフィルタリング
  for (let r of results) {
    for (let i = 0; i < word.length; i++) {
      if (word[i] !== '#') {
        if (r[i] !== word[i]) {
          is_candidate = false;
          break;
        }
      }
    }
    if (is_candidate) {
      answers.push(r.join(''));
    }
    is_candidate = true;
  }

  // テーブルに結果を表示
  for (let answer of answers) {
    let row = tableBody.insertRow();
    let cell = row.insertCell(0);
    cell.textContent = answer;
  }
}
