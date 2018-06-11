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

  // 中序遍历子节点
  var midOrderTraverseNode = function(node, callback) {
    if (node !== null) {
      // 遍历左子树
      midOrderTraverseNode(node.left, callback)
      // 打印值
      callback(node.key)
      // 遍历右子树
      midOrderTraverseNode(node.right, callback)
    }
  }

  this.midOrderTraverse = function(callback) {
    if (root !== null) {
      midOrderTraverseNode(root, callback)
    }
  }

  // 前序遍历子节点
  var preOrderTraverseNode = function(node, callback) {
    if (node !== null) {
      // 打印值
      callback(node.key)
      // 遍历左子树
      preOrderTraverseNode(node.left, callback)
      // 遍历右子树
      preOrderTraverseNode(node.right, callback)
    }
  }

  this.preOrderTraverse = function(callback) {
    if (root !== null) {
      preOrderTraverseNode(root, callback)
    }
  }

  // 后序遍历
  var backOrderTraverseNode = function(node, callback) {
    if (node !== null) {
      // 遍历左子树
      backOrderTraverseNode(node.left, callback)
      // 遍历右子树
      backOrderTraverseNode(node.right, callback)
      // 打印值
      callback(node.key)
    }
  }

  this.backOrderTraverse = function(callback) {
    if (root !== null) {
      backOrderTraverseNode(root, callback)
    }
  }

  var findMinNode = function(node) {
    if (node) {
      // 当 node 有左节点
      while (node && node.left !== null) {
        // 将 node 赋值为当前 node 的左节点
        node = node.left
      }
      return node
    }
  }

  this.min = function() {
    return findMinNode(root)
  }

  var findMaxNode = function(node) {
    if (node) {
      // 当 node 有右节点
      while (node && node.right !== null) {
        node = node.right
      }
      return node
    }
  }

  this.max = function() {
    return findMaxNode(root)
  }

  // 二叉树查找
  var searchNode = function(node, key) {
    if (node === null) {
      return false
    }

    if (key < node.key) {
      // 值小于当前节点，去左子树去查找
      return searchNode(node.left, key)
    } else if (key > node.key) {
      // 值小于当前节点，去右子树去查找
      return searchNode(node.right, key)
    } else {
      return true
    }
  }

  this.search = function(key) {
    return searchNode(root, key)
  }

  // 删除节点
  var removeNode = function(node, key) {
    if (node === null) {
      return null
    }
    // 当值小于当前节点值
    if (key < node.key) {
      // 对 node.left 的值进行判断是否删除
      node.left = removeNode(node.left, key)
      return node
    } else if (key > node.key) {
      node.right = removeNode(node.right, key)
      return node
    } else {
      // 当相等节点没有左子树和右子树时
      if (node.left === null && node.right === null) {
        // 直接删除
        return null
      } else if (node.left === null) {
        return node.right
      } else if (node.right === null) {
        return node.left
      } else {
        var minNode = findMinNode(node.right)
        node.key = minNode.key
        node.right = removeNode(node.right, minNode.key)
        return node
      }
    }
  }

  // 二叉树节点删除
  this.remove = function(key) {
    root = removeNode(root, key)
    this.show()
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

var callback = function(key) {
  console.log(key)
}

console.log('中序遍历')
binaryTree.midOrderTraverse(callback)
console.log('前序遍历')
binaryTree.preOrderTraverse(callback)
console.log('后序遍历')
binaryTree.backOrderTraverse(callback)
console.log('最小值', binaryTree.min().key)
console.log('最大值', binaryTree.max().key)
console.log(binaryTree.search(14))

binaryTree.remove(3)
