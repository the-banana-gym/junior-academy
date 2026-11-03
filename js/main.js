// スマホの申し込みボタン：ファーストビューを過ぎたら出し、体験会の章が見えている間は隠す
(function () {
  var dock = document.querySelector(".dock");
  var fv = document.querySelector(".fv");
  var trial = document.querySelector("#entry");
  if (!dock || !fv || !trial || !("IntersectionObserver" in window)) return;

  var fvVisible = true;
  var trialVisible = false;
  function update() {
    var show = !fvVisible && !trialVisible;
    dock.classList.toggle("is-shown", show);
    dock.setAttribute("aria-hidden", show ? "false" : "true");
    dock.querySelector("a").tabIndex = show ? 0 : -1;
  }
  new IntersectionObserver(function (e) { fvVisible = e[0].isIntersecting; update(); }, { threshold: 0.05 }).observe(fv);
  new IntersectionObserver(function (e) { trialVisible = e[0].isIntersecting; update(); }).observe(trial);
})();


// 03 ペットボトル：ボタンを押した時だけ切り替えて動かす
(function () {
  var fig = document.querySelector(".pb");
  if (!fig) return;
  var btns = fig.querySelectorAll(".pb__btn");
  btns.forEach(function (b) {
    b.addEventListener("click", function () {
      fig.dataset.state = b.dataset.to;
      btns.forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      // 同じボタンをもう一度押しても動くように付け直す
      fig.classList.remove("is-push");
      void fig.offsetWidth;
      fig.classList.add("is-push");
    });
  });
})();
