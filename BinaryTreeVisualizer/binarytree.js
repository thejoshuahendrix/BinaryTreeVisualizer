canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
centerx = (canvas.width / 2) - 100;
centery = canvas.height / 2;
ctx = canvas.getContext("2d");

class Node {
  constructor(value, leveler, sequencer) {
    this.level = leveler;
    this.sequence = sequencer;
    this.x = centerx - 100 + 250 * this.sequence;
    this.y = 50 * this.level;
    this.value = value;
    this.left = null;
    this.right = null;
    this.radius = 15;
    this.color = "rgb(255,255,255)";
  }
  draw() {
    ctx.lineWidth = 3;
    if (this.right !== null) {
      ctx.strokeStyle = this.right.color;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y + 8);
      ctx.lineTo(this.right.x - 3, this.right.y + 3);
      ctx.stroke();
      this.right.draw();
    }
    if (this.left !== null) {
      ctx.strokeStyle = this.left.color;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y + 8);
      ctx.lineTo(this.left.x + 3, this.left.y + 3);
      ctx.stroke();
      this.left.draw();
    }
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.fillText(this.value, this.x - 4, this.y);
  }
  insert(value) {
    if (Number(this.value) <= value) {
      if (this.right == null) {
        this.right = new Node(
          value,
          this.level + 1,
          this.sequence + 1 / this.level
        );
      } else {

        
        this.right.insert(value);
      }
    } else {
      if (this.left == null) {
        this.left = new Node(
          value,
          this.level + 1,
          this.sequence - 1 / this.level
        );
      } else {
        this.left.insert(value);
      }
    }
  }

  contains(value) {
    this.color = "yellow";
    if (value == this.value) {
      this.color = "green";
      return true;
    } else if (value < this.value) {
      if (this.left == null) {
        this.color = "red";
        return false;
      } else {
        return this.left.contains(value);
      }
    } else {
      if (this.right == null) {
        this.color = "red";
        return false;
      } else {
        return this.right.contains(value);
      }
    }
  }
  clearF() {
    this.color = "white";
    if (this.left !== null) {
      this.left.clearF();
    }

    if (this.right !== null) {
      this.right.clearF();
    }
  }
}
var tree = new Node(10, 1, 1);
tree.draw();

function addNode() {
  addvalue = document.getElementById("value").value;
  if (addvalue !== null) {
    tree.insert(addvalue);
    tree.draw();
  }
}

function searchNode() {
  svalue = document.getElementById("search").value;
  if (value !== null) {
    tree.contains(svalue);
    tree.draw();
  }
}
function clearFormat() {
  tree.clearF();
  tree.draw();
}
function resetTree() {
  ctx.fillStyle = "rgb(0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  tree = null;
  tree = new Node(10, 1, 1);
  tree.draw();
}