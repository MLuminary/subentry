// 定义二叉树

function BinaryTree() {
  // 二叉树节点
  var Node = function(key) {
    this.key = key // 值
    this.left = null // 左节点
    this.right = null // 右节点
  }

  // 根节点
  var root = null

  // 按排序二叉树插入
  var insertNode = function(node, newNode) {
    // 如果新节点值小于当前节点值
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode
      } else {
        insertNode(node.left, newNode)
      }
    } else {
      if (node.right === null) {
        node.right = newNode
      } else {
        insertNode(node.right, newNode)
      }
    }
  }
  
  // 插入
  this.insert = function(key) {
    // 新建一个二叉树节点
    var newNode = new Node(key)
    // 如果是根节点
    if (root === null) {
      root = newNode
    } else {
      // 不是根节点就插入
      insertNode(root, newNode)
    }
  }

  this.inOrderTraverse = function(callback) {
    
  }

  // 展现二叉树
  this.show = function() {
    console.log(root)
  }


}

var nodes = [8, 3, 10, 1, 6, 14, 4, 13]

var binaryTree = new BinaryTree()

nodes.forEach(item => {
  binaryTree.insert(item)
})

binaryTree.show()
