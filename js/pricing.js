// 요금 계산기(11-04) — <div class="pd-calc" data-unit="39000" data-band="30"> 안의 input[data-k] 를 읽어 월 요금을 그린다.
//   data-k="acc"  : 1명(대)당 unit 원
//   data-k="stu"  : band 명 단위 올림 × unit 원 (band 가 없으면 1명당)
(function () {
  'use strict';
  document.querySelectorAll('.pd-calc').forEach(function (box) {
    var unit = Number(box.getAttribute('data-unit')) || 0;
    var band = Number(box.getAttribute('data-band')) || 0;
    var out = box.querySelector('[data-out]');
    function paint() {
      var total = 0;
      box.querySelectorAll('input[data-k]').forEach(function (i) {
        var v = Math.max(Number(i.min) || 1, Math.round(Number(i.value) || 0));
        if (i.getAttribute('data-k') === 'stu' && band) total += Math.ceil(v / band) * unit;
        else total += v * unit;
      });
      out.textContent = total.toLocaleString('ko-KR') + '원';
    }
    box.querySelectorAll('input').forEach(function (i) { i.addEventListener('input', paint); });
    paint();
  });
})();
