const styles = {
  "\u4e0a": "move",
  "\u4e0b": "move",
  "\u5de6": "move",
  "\u53f3": "move",
  "\u7a7a": "move",
  "\u5206": "rot",
  "\u53cd": "rot",
  "\u8df3": "jump",
  "\u79fb": "jump",
  "\u53cc": "queue",
  "\u505c": "queue",
  "\u51fa": "stack",
  "\u5165": "stack",
  "\u6362": "stack",
  "\u53bb": "stack",
  "\u590d": "stack",
  "\u542c": "io",
  "\u8bf4": "io",
  "\u8bfb": "io",
  "\u5199": "io",
  "\u5347": "arit",
  "\u964d": "arit",
  "\u52a0": "arit",
  "\u51cf": "arit",
  "\u4e58": "arit",
  "\u9664": "arit",
  "\u4f59": "arit",
  "\u968f": "arit",
  "\u96f6": "const",
  "\u4e00": "const",
  "\u4e8c": "const",
  "\u4e09": "const",
  "\u56db": "const",
  "\u4e94": "const",
  "\u516d": "const",
  "\u4e03": "const",
  "\u516b": "const",
  "\u4e5d": "const",
  "\u5341": "const",
  "\u767e": "const",
  "\u5343": "const",
  "\u4e07": "const",
  "\u4ebf": "const",
  "\u5146": "const",
};
function parse(code, ip) {
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
  var result = "";
  var x = 0;
  var ip_table = [];
  for (let i = 0; i < split.length; i++) {
    ip_table.push([]);
    for (let j = 0; j < split[i].length; j++) {
      ip_table[i].push(false);
    }
  }
  for (let i of ip) {
    ip_table[i.x][i.y] = true;
  }
  for (let i of split) {
    var temp = i;
    result += "<tr>";
    for (let j = 0; j < maxlen - i.length; j++) {
      temp += " ";
    }
    var y = 0;
    for (let j of temp) {
      if (typeof styles[j] === "undefined") {
        result += '<td class="redun" width=50 height=50>' + j + "</td>";
      } else if (ip_table[x][y]) {
        result += '<td class="ip" width=50 height=50>' + j + "</td>";
      } else {
        result +=
          '<td class="' + styles[j] + '" width=50 height=50>' + j + "</td>";
      }
      y++;
    }
    x++;
    result += "</tr>";
  }
  return result;
}
