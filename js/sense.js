
//keyCode 值 左上右下 37--40
let people = document.querySelector("#people");
let sense_one = document.querySelector(".sense_one"); // 场景一
let sense_two = document.querySelector(".sense_two"); // 场景二
let sense_three = document.querySelector(".sense_three"); // 场景三
let sense_four = document.querySelector(".sense_four"); // 场景四
let is_sense_two = false; // 是否解锁场景二
let is_sense_three = false; // 是否解锁场景三
let is_sense_four = false; // 是否解锁场景四
let is_left = false; // 是否可以往左边查看前面的场景
let isMove = {
  left: "false",
  top: "false",
  right: "false",
  bottom: "false"
};
// 一开始场景二，三，四隐藏
sense_two.classList.add("displayNone");
sense_three.classList.add("displayNone");
sense_four.classList.add("displayNone");
// alert(people.offsetWidth);
document.onkeydown = function(ev) {
  var ev = ev || event;
  if (ev.keyCode == 37) {
    isMove["left"] = true;
  }
  if (ev.keyCode == 38) {
    isMove["top"] = true;
  }
  if (ev.keyCode == 39) {
    isMove["right"] = true;
  }
  if (ev.keyCode == 40) {
    isMove["bottom"] = true;
  }
};
document.onkeyup = function() {
  var ev = ev || event;
  if (ev.keyCode == 37) {
    isMove["left"] = false;
  }
  if (ev.keyCode == 38) {
    isMove["top"] = false;
  }
  if (ev.keyCode == 39) {
    isMove["right"] = false;
  }
  if (ev.keyCode == 40) {
    isMove["bottom"] = false;
  }
};
// currentPage当前用户在看哪一页
let currentPage = 1;
// 初始化第一场景的样式
sense_one_init();
setInterval(function() {
  if (isMove["left"] == true) {
    let left = people.getBoundingClientRect().left; // 元素距离左边的距离
    if (left <= 0) {
      if (is_left == true && currentPage == 4) {
        currentPage = 3;
        removeDisplay(sense_four);
        sense_four.classList.add("displayNone");
        sense_three.classList.add("displayBlock"); //显示场景三
        removeAnimation(sense_three);
        sense_three.classList.add("animationRight");
        //   sense_three.style.left = 0; //显示场景三
      } else if (is_left == true && currentPage == 3) {
        currentPage = 2;
        removeDisplay(sense_three);
        sense_three.classList.add("displayNone");
        sense_two.classList.add("displayBlock"); //显示场景二
        removeAnimation(sense_two);
        sense_two.classList.add("animationRight");
        //   sense_two.style.left = 0; //显示场景二
      } else if (is_left == true && currentPage == 2) {
        currentPage = 1;
        removeDisplay(sense_two);
        sense_two.classList.add("displayNone");
        sense_one.classList.add("displayBlock"); //显示场景一
        //显示场景一
        removeAnimation(sense_one);
        sense_one.classList.add("animationRight");
      }
      people.style.left = window.innerWidth - people.offsetWidth + "px"; // 左边滑块滑到最左边，重置为右边
    } else {
      people.style.left = people.offsetLeft - 10 + "px";
    }
  }
  // if (isMove["top"] == true) {
  //     let top = people.getBoundingClientRect().top;
  //   people.style.top = people.offsetTop - 10 + "px";
  // }
  if (isMove["right"] == true) {
    console.log(currentPage);
    let right = people.getBoundingClientRect().right; // 元素距离右边的距离

    // let activityDistance = window.innerWidth - people.offsetWidth; // 可移动距离
    // 判断是否达到最右端
    if (right >= window.innerWidth) {
      people.style.left = people.offsetWidth + "px";
      is_sense_two = true; // 开启场景二
      if (is_sense_two == true && currentPage == 1) {
        // 如果是第一场景而且是从右边过去的就是切换第二场景
        currentPage = 2;
        // 移除场景一
        removeAnimation(sense_one);
        sense_one.classList.add("animationLeft");
        sense_two.classList.remove("displayNone");
        sense_two.classList.add("displayBlock");
        // 执行场景二的样式
        excutedAnimationTwo( 
          sense_two.children[0].children[0],
           sense_two.children[0].children[1],
          sense_two.children[1].children[0].children[0].children[0],
          sense_two.children[1].children[0].children[1],
          sense_two.children[1].children[0].children[1].children[3].children[0],
          sense_two.children[1].children[0].children[1].children[3].children[1],
          sense_two.children[1].children[0].children[1].children[3].children[2],
          sense_two.children[1].children[1].children[0].children[0],
          sense_two.children[1].children[1].children[1],
          sense_two.children[1].children[1].children[1].children[3].children[0],
          sense_two.children[1].children[1].children[1].children[3].children[1],
          sense_two.children[1].children[1].children[1].children[3].children[2],
          sense_two.children[1].children[2].children[0].children[0],
          sense_two.children[1].children[2].children[1],
          sense_two.children[1].children[2].children[1].children[3].children[0],
          sense_two.children[1].children[2].children[1].children[3].children[1],
          sense_two.children[1].children[2].children[1].children[3].children[2]
           );
        is_sense_three = true; // 开启场景三
        // is_left = true; // 可以查看之前的场景

      } else if (is_sense_three == true && currentPage == 2) {
        // 当前页是2且是解锁了场景三
        currentPage = 3; // 当前页是3
        //   sense_two.style.left = "-5000px"; // 移除场景二
        removeAnimation(sense_two);
        sense_two.classList.add("animationLeft");
        sense_three.classList.remove("displayNone"); // 有这个样式首先移除
        sense_three.classList.add("displayBlock"); // 显示场景三
        // 依次执行第三场景的样式
        excutedAnimationThree(
          sense_three.children[1].children[0],
          sense_three.children[1].children[2],
          sense_three.children[1].children[1],
          sense_three.children[1].children[1].children[0].children[0].children[1],
          sense_three.children[1].children[1].children[0].children[0].children[0],
          sense_three.children[1].children[1].children[0].children[1].children[1],
          sense_three.children[1].children[1].children[0].children[1].children[0],
          sense_three.children[1].children[1].children[0].children[2].children[1],
          sense_three.children[1].children[1].children[0].children[2].children[0],
          sense_three.children[1].children[1].children[0].children[3].children[1],
          sense_three.children[1].children[1].children[0].children[3].children[0],
          sense_three.children[1].children[1].children[0].children[4].children[1],
          sense_three.children[1].children[1].children[0].children[4].children[0],
          sense_three.children[1].children[1].children[0].children[5].children[1],
          sense_three.children[1].children[1].children[0].children[5].children[0],
          sense_three.children[1].children[1].children[0].children[6].children[1],
          sense_three.children[1].children[1].children[0].children[6].children[0]
        ); 
        is_sense_four = true; // 开启场景四
      } else if (is_sense_four == true && currentPage == 3) {
        // 当前页是3且是解锁了场景四
        sense_three.style.left = "-5000px"; // 移除场景三
        removeAnimation(sense_three);
        sense_three.classList.add("animationLeft");
        removeDisplay(sense_four);
        sense_four.classList.add("displayBlock"); // 显示场景四
        currentPage = 4; //当前页是第4
      }
    } else {
      people.style.left = people.offsetLeft + 10 + "px";
    }
  }
  // if (isMove["bottom"] == true) {
  //   people.style.top = people.offsetTop + 10 + "px";
  // }
}, 30);
// 第一场景的样式
function sense_one_init() {
  console.log(sense_one.children[1].children[2]);
  // 一开始隐藏所有的元素
  sense_one.children[0].children[1].classList.add("displayNone"); // 关于我的挂牌
  sense_one.children[1].children[0].children[0].classList.add("displayNone"); // 标签一
  sense_one.children[1].children[0].children[1].classList.add("displayNone"); // 标签二
  sense_one.children[1].children[1].children[0].classList.add("displayNone"); // 标签三
  sense_one.children[1].children[1].children[1].classList.add("displayNone"); // 标签四
  sense_one.children[1].children[2].classList.add("opacity0"); // 标签五
  sense_one.children[0].children[0].classList.add("lineAnimation"); // 页面一打开就添加线条样式

  sense_one.children[0].children[0].addEventListener(
    "animationend",
    function() {
      // 线条动画结束title出来
      display(sense_one.children[0].children[1]);
      excutedAnimation(
        sense_one.children[1].children[0].children[0],
        sense_one.children[1].children[0].children[1],
        sense_one.children[1].children[1].children[0],
        sense_one.children[1].children[1].children[1],
        sense_one.children[1].children[2]
      );
    }
  );
  sense_one.children[0].children[1].addEventListener(
    "animationend",
    function() {
      display(sense_one.children[1].children[0].children[0]); // 把挂牌显示出来

    }
  );
}
function removeDisplay(obj) {
  // 删除场景原有的样式
  if (obj.className.indexOf("displayNone") > -1) {
    obj.classList.remove("displayNone"); // 有这个样式首先移除
  }
  if (obj.className.indexOf("displayBlock") > -1) {
    obj.classList.remove("displayBlock");
  }
}

function removeAnimation(obj) { // 移除场景之前的动画
  if (obj.className.indexOf("animationLeft") > -1) {
    obj.classList.remove("animationLeft");
  }
  if (obj.className.indexOf("animationRight") > -1) {
    obj.classList.remove("animationRight");
  }
}
function display(obj) { // 显示标签出来
  let classs = obj.getAttribute("class").replace("displayNone", "displayBlock");
  obj.setAttribute("class", classs);
}
function addAnimation(obj,animation) { // 添加动画
  obj.classList.add(animation);
}
  // 异步执行每帧动画（第一场景）
async function excutedAnimation(label1,label2,label3,label4,label5) {
  new Promise(resolve=>{
    display(label1); // 把标签一显示出来
    addAnimation(label1,'leftIn'); // 给第一个标签添加动画
    label1.addEventListener('animationend',function(){
      resolve('ok');
    });
  }).then(resolve => {
    display(label2); // 把标签二显示出来
    addAnimation(label2,'rightIn'); // 把第二个标签添加动画
    label2.addEventListener('animationend',function(){
      display(label3); // 把标签三显示出来
      addAnimation(label3, 'leftIn'); // 把第三个标签添加动画
      label3.addEventListener('animationend', function () {
        display(label4); // 把标签四显示出来
        addAnimation(label4, 'rightIn'); // 把第四个标签添加动画
        label4.addEventListener('animationend',function(){
          let classs = label5.getAttribute("class").replace("opacity0", "opacity1");
          label5.setAttribute("class", classs);
        });
      });
    });
  })
}
// 异步执行每帧动画（第二场景）
async function excutedAnimationTwo
(line,
  title,
  lable1_line,
  label1_content,
  label1_content_star1,
  label1_content_star2,
  label1_content_star3,
  label2_line,
  label2_content,
  label2_content_star1,
  label2_content_star2,
  label2_content_star3,
  label3_line,
  label3_content,
  label3_content_star1,
  label3_content_star2,
  label3_content_star3
  ){
  new Promise(resolve => {
    // 一开始隐藏我的挂牌
    title.classList.add("displayNone");
    // 线条动画
    addAnimation(line, 'lineAnimation');
    line.addEventListener('animationend', function () {
      // 挂牌显示出来并添加动画
      removeDisplay(title);
      addAnimation(title,'content');
      resolve('ok');
    });
  }).then(res=>{
    addAnimation(lable1_line, 'animationLineFormLeft');
    lable1_line.addEventListener('animationend',function(){
      addAnimation(label1_content,'opacity11');
      addAnimation(label1_content_star1, 'animationStarMoveLeft');
      addAnimation(label1_content_star2, 'animationStarMoveRight');
      addAnimation(label1_content_star3, 'animationStarMoveLeft');
      label1_content.addEventListener('animationend',function(){
        addAnimation(label2_line,'animationLineFormRight');
        addAnimation(label2_content_star1, 'animationStarMoveLeft');
        addAnimation(label2_content_star2, 'animationStarMoveRight');
        addAnimation(label2_content_star3, 'animationStarMoveLeft');
        label2_line.addEventListener('animationend',function(){
          addAnimation(label2_content, 'opacity11');
          label2_content.addEventListener('animationend',function(){
            addAnimation(label3_line,'animationLineFormLeft');
            addAnimation(label3_content_star1, 'animationStarMoveLeft');
            addAnimation(label3_content_star2, 'animationStarMoveRight');
            addAnimation(label3_content_star3, 'animationStarMoveLeft');
            label3_line.addEventListener('animationend',function(){
              addAnimation(label3_content, 'opacity11');
            });
          });
        });
      });
    })
    
  })
 
    
}
// 异步执行每帧动画（第三场景）
async function excutedAnimationThree(
  left_line,
  right_line,
  language,
  label1_line,
  label1_content,
  label2_line,
  label2_content,
  label3_line,
  label3_content,
  label4_line,
  label4_content,
  label5_line,
  label5_content,
  label6_line,
  label6_content,
  label7_line,
  label7_content){
  // new Promise(resolve=>{
    addAnimation(left_line,'three_lineFormLeft');
    addAnimation(right_line, 'three_lineFormRight');
    left_line.addEventListener('animationend',function(){
      addAnimation(language, 'opacity11');
      language.addEventListener('animationend',function(){
        addAnimation(label1_line,'three_fontLine');
        label1_line.addEventListener('animationend',function(){
          addAnimation(label1_content,'opacity11');
          label1_content.addEventListener('animationend', function () {
            addAnimation(label2_line, 'three_fontLine');
            label2_line.addEventListener('animationend',function(){
              addAnimation(label2_content, 'opacity11');
              label2_content.addEventListener('animationend',function(){
                addAnimation(label3_line,'three_fontLine');
                label3_line.addEventListener('animationend',function(){
                  addAnimation(label3_content,'opacity11');
                  label3_content.addEventListener('animationend', function () {
                    addAnimation(label4_line, 'three_fontLine');
                    label4_line.addEventListener('animationend', function () {
                      addAnimation(label4_content, 'opacity11');
                      label4_content.addEventListener('animationend', function () {
                        addAnimation(label5_line, 'three_fontLine');
                        label5_line.addEventListener('animationend', function () {
                          addAnimation(label5_content, 'opacity11');
                          label5_content.addEventListener('animationend', function () {
                            addAnimation(label6_line, 'three_fontLine');
                            label6_line.addEventListener('animationend', function () {
                              addAnimation(label6_content, 'opacity11');
                              label6_content.addEventListener('animationend', function () {
                                addAnimation(label7_line, 'three_fontLine');
                                label7_line.addEventListener('animationend', function () {
                                  addAnimation(label7_content, 'opacity11');
                                });
                              })
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          })
        });
      });
      // resolve('ok')
    });
  // })
}
// console.log(sense_three.children[1].children[0]);
console.log(sense_three.children[1].children[1].children[0].children[0].children[0]);
// console.log(sense_two.children[1].children[2].children[1].children[3].children[1]);
// console.log(sense_two.children[1].children[2].children[1]);

