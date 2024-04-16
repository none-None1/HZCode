var queue = [{ x: 0, y: 0, dx: 0, dy: 1, stack: [], stack1: [] }];
var input = "";
var input_pointer = 0;
var output = "";
var code = undefined;
var tid = 0;
var orig_code = undefined;
const literals = {
  "\u96f6": 0,
  "\u4e00": 1,
  "\u4e8c": 2,
  "\u4e09": 3,
  "\u56db": 4,
  "\u4e94": 5,
  "\u516d": 6,
  "\u4e03": 7,
  "\u516b": 8,
  "\u4e5d": 9,
  "\u5341": 10,
  "\u767e": 100,
  "\u5343": 1000,
  "\u4e07": 10000,
  "\u4ebf": 100000000,
  "\u5146": 1000000000000,
};
function ttop(stack) {
  if (!stack.length) return 0;
  else return stack[stack.length - 1];
}
function pop(stack) {
  if (!stack.length) return 0;
  return stack.pop();
}
function init(input) {
  this.queue = [{ x: 0, y: 0, dx: 0, dy: 1, stack: [], stack1: [] }];
  this.input = input;
  this.output = "";
  this.input_pointer = 0;
}
function interpret_step(code, rows, cols) {
  //console.log(queue);
  var curip = queue.shift();
  //console.log(code[curip.x][curip.y]);
  switch (code[curip.x][curip.y]) {
    case "\u4e0a": {
      curip.dx = -1;
      curip.dy = 0;
      break;
    }
    case "\u4e0b": {
      curip.dx = 1;
      curip.dy = 0;
      break;
    }
    case "\u5de6": {
      curip.dx = 0;
      curip.dy = -1;
      break;
    }
    case "\u53f3": {
      curip.dx = 0;
      curip.dy = 1;
      break;
    }
    case "\u7a7a": {
      break;
    }
    case "\u5206": {
      if (ttop(curip.stack) == 0) {
        var tx = curip.dx,
          ty = curip.dy;
        curip.dx = -ty;
        curip.dy = tx;
      } else {
        var tx = curip.dx,
          ty = curip.dy;
        curip.dx = ty;
        curip.dy = -tx;
      }
      break;
    }
    case "\u53cd": {
      if (ttop(curip.stack)) {
        curip.dx = -curip.dx;
        curip.dy = -curip.dy;
      }
      break;
    }
    case "\u8df3": {
      var b = pop(curip.stack);
      var a = pop(curip.stack);
      curip.x = a % rows;
      curip.y = b % cols;
      queue.push(curip);
      return;
    }
    case "\u79fb": {
      do {
        curip.x += curip.dx;
        curip.y += curip.dy;
        curip.x %= rows;
        curip.y %= cols;
      } while (code[curip.x][curip.y] != "\u79fb");
      break;
    }
    case "\u53cc": {
      var c = pop(curip.stack);
      var b = pop(curip.stack);
      var a = pop(curip.stack);
      var dir = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ];
      var ip = {
        x: a,
        y: b,
        dx: dir[c & 3][0],
        dy: dir[c & 3][1],
        stack: [],
        stack1: [],
      };
      queue.push(ip);
      break;
    }
    case "\u505c": {
      return;
    }
    case "\u51fa": {
      curip.stack1.push(pop(curip.stack));
      break;
    }
    case "\u5165": {
      curip.stack.push(pop(curip.stack1));
      break;
    }
    case "\u6362": {
      var t = curip.stack;
      curip.stack = curip.stack;
      curip.stack1 = t;
      break;
    }
    case "\u53bb": {
      pop(curip.stack);
      break;
    }
    case "\u590d": {
      curip.stack.push(ttop(curip.stack));
      break;
    }
    case "\u542c": {
      if (this.input_pointer >= this.input.length) {
        curip.stack.push(0);
      } else {
        var k = this.input.slice(input_pointer).match(/\d*/)[0];
        this.input_pointer += k.length;
        while (
          this.input_pointer < this.input.length &&
          " \n\r\v\t".includes(this.input[this.input_pointer])
        ) {
          ++this.input_pointer;
        }
        curip.stack.push(+k);
      }
      break;
    }
    case "\u8bf4": {
      this.output += curip.stack[curip.stack.length - 1] + " ";
      break;
    }
    case "\u8bfb": {
      if (this.input_pointer >= this.input.length) {
        curip.stack.push(0);
      } else {
        curip.stack.push(this.input[this.input_pointer].charCodeAt(0));
        this.input_pointer++;
      }
      break;
    }
    case "\u5199": {
      this.output += String.fromCharCode(curip.stack[curip.stack.length - 1]);
      break;
    }
    case "\u5347": {
      var a = pop(curip.stack);
      curip.stack.push(a + 1);
      break;
    }
    case "\u964d": {
      var a = pop(curip.stack);
      curip.stack.push(Math.max(a - 1, 0));
      break;
    }
    case "\u52a0": {
      var b = pop(curip.stack);
      var a = pop(curip.stack);
      curip.stack.push(a + b);
      break;
    }
    case "\u51cf": {
      var b = pop(curip.stack);
      var a = pop(curip.stack);
      curip.stack.push(Math.max(a - b, 0));
      break;
    }
    case "\u4e58": {
      var b = pop(curip.stack);
      var a = pop(curip.stack);
      curip.stack.push(a * b);
      break;
    }
    case "\u9664": {
      var b = pop(curip.stack);
      var a = pop(curip.stack);
      curip.stack.push(b ? Math.floor(a / b) : 0);
      break;
    }
    case "\u4f59": {
      var b = pop(curip.stack);
      var a = pop(curip.stack);
      curip.stack.push(b ? a % b : 0);
      break;
    }
    case "\u968f": {
      curip.stack.push(+(Math.random() > 0.5));
      break;
    }
    default: {
      if (
        "\u96f6\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343\u4e07\u4ebf\u5146".includes(
          code[curip.x][curip.y]
        )
      ) {
        curip.stack.push(literals[code[curip.x][curip.y]]);
      }
    }
  }
  curip.x += curip.dx;
  curip.y += curip.dy;
  curip.x %= rows;
  curip.y %= cols;
  queue.push(curip);
}
function code2arr(code) {
  code = code.replace("\r\n", "\n");
  while (code[0] == "\n") {
    code = code.slice(1);
  }
  while (code[code.length - 1] == "\n") {
    code = code.slice(0, code.length - 1);
  }
  var split = code.split("\n");
  var maxlen = 0;
  for (let i of split) {
    maxlen = Math.max(Math.max(maxlen, i.length), 1);
  }
  var res = [];
  for (let i of split) {
    var t = i.split("");
    for (let j = 0; j < maxlen - i.length; j++) {
      t.push(" ");
    }
    res.push(t);
  }
  return res;
}
function display_queue() {
  document.getElementById("vis").innerHTML = parse(orig_code, queue);
  var res = "";
  for (let i of queue) {
    if (lang) {
      res +=
        "<br/><hr/>\u6a2a\u5750\u6807: " +
        i.x +
        "    \u7eb5\u5750\u6807: " +
        i.y +
        "    \u68081: " +
        i.stack +
        "    \u68082: " +
        i.stack1;
    } else {
      res +=
        "<br/><hr/>x: " +
        i.x +
        "    y: " +
        i.y +
        "    First Stack: " +
        i.stack +
        "    Second Stack: " +
        i.stack1;
    }
  }
  document.getElementById("qu").innerHTML = res;
  document.getElementById("output").value = output;
}
function interv() {
  interpret_step(code, code.length, code[0].length);
  display_queue();
  if (!queue.length) {
    clearInterval(tid);
    document.getElementById("run").removeAttribute("disabled");
    document.getElementById("load").removeAttribute("disabled");
  }
}
function run() {
  var input = document.getElementById("input").value;
  document.getElementById("run").setAttribute("disabled", true);
  document.getElementById("load").setAttribute("disabled", true);
  init(input);
  this.code = code2arr(document.getElementById("code").value);
  this.orig_code = document.getElementById("code").value;
  display_queue();
  this.tid = setInterval(
    interv,
    parseInt(document.getElementById("speed").value)
  );
}
function stop() {
  clearInterval(tid);
  document.getElementById("run").removeAttribute("disabled");
  document.getElementById("load").removeAttribute("disabled");
}
