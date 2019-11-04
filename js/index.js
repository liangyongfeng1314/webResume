window.onload = function() {
  let abotMe = this.document.querySelector(".abotMe");
  // 最后一个元素动画完成
  let last_element = this.document.querySelector(
    ".interest ul li:nth-of-type(3)"
  );
  // 进一步了解
  let goIn = this.document.querySelector(".goIn");
  last_element.addEventListener(
    "animationend",
    function() {
      abotMe.style.width = "45%";
      abotMe.style.left = "10%";
      goIn.style.opacity = "1.0";
      goIn.style.right = "16%";
    },
    false
  );
  console.log(abotMe);
};
