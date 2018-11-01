#### 2、两数相加
```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    var l = null;
    var ans = l;
    var pre = l;
    var add = 0;
    var num = 0;
    var first = 0;
    while(l1 && l2) {
        l = new ListNode();
        num = add + l1.val + l2.val;
        add = Math.floor(num / 10);
        l.val = num % 10;
        l1 = l1.next;
        l2 = l2.next;
        if(!first) {
            pre = ans = l;
            first = 1;
        }else {
            pre.next = l;
            pre = l;
        }
    }
    while(l1) {
        l = new ListNode();
        num = add + l1.val;
        add = Math.floor(num / 10);
        l.val = num % 10;
        pre.next = l;
        pre = l;
        l1 = l1.next;
    }
     while(l2) {
        l = new ListNode();
        num = add + l2.val;
        add = Math.floor(num / 10);
        l.val = num % 10;
        pre.next = l;
        pre = l;
        l2 = l2.next;
    }
    if(add > 0) {
        pre.next = new ListNode(add);
    }
    return ans;
};
```
#### 3、无重复字符的最长子串 
```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    var start = 0;
    var end = 1;
    var arr = '';
    var len = s.length;
    var ans = len > 0 ? 1 : 0;
    var f = -1;
    while(end < len) {
        arr = s.slice(start, end);
        f = arr.lastIndexOf(s[end]);
        if(f > -1) {
            start += f +  1;
            end++;
        }else {
            end++;
            ans = ans > (end - start) ? ans : (end - start);
        }
    }
    return ans;
    
};
```
####
```javascript
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    var start1 = 0;
    var start2 = 0;
    var mid1 = 0;
    var mid2 = 0;
    var end1 = nums1.length - 1;
    var end2 = nums2.length - 1;
    var m1 = 0;
    var m2 = 0;
    var even = (end1 + end2) % 2 === 0;
    while(start1 < end1 || start2 < end2) {
        mid1 = (start1 + end1) >> 1;
        mid2 = (start2 + end2) >> 1;
        m1 = nums1[mid1];
        m2 = nums2[mid2];
        if(m1 < m2) {
            start1 = mid1 + 1;
            end2 = mid2;
        }else if(m1 > m2) {
            start2 = mid2 + 1;
            end1 = mid1;
        }else {
            return m1;
        }
    }
    
};
```
#### 5、最长回文串
```javascript
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    function judge(start, end) {
        var mid = (start + end) >> 1;
        for(var i = start; i <= mid; i++) {
            if(s[i] !== s[end - i + start])
                return false;
        }
        return true;
    }
    var len = s.length;
    for(var i = len; i > 0; i--) {
        for(var j = 0; j + i <= len; j++) {
            if(judge(j, j + i - 1)) {
                return s.slice(j, j + i);
            }
        }
    }
    return '';
};
```
#### 8、字符串转整数
```javascript
/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
    var MIN = -2147483648;
    var MAX = 2147483647;
    var flag = 1;
    var first = 1;
    var sum = 0;
    str = str.trim();
    for(var i = 0; i< str.length; i++) {
        if(str[i] === '+' && first) {
            first = 0;
        }
        else if(str[i] === '-' && first) {
            flag = -1;
            first = 0;
        }else if(str[i] <= '9' && str[i] >= '0') {
            first = 0;
            sum = sum * 10 + Number(str[i]);
        }else {
            break;
        }
    }
    sum *= flag;
    if(sum > MAX) sum = MAX;
    if(sum < MIN) sum = MIN;
    return sum;
    
};
```
#### 10、正则表达式匹配
```javascript
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    var lens = s.length;
    var lenp = p.length;
    function Match(start1, start2) {
        if(start2 >= lenp && start1 < lens) {
            return false;
        }
        if(start2 >= lenp && start1 >= lens) {
            return true;
        }
        //此时 start1 可能小于或等于 lens 而 start2必然 小于lenp；允许start1 等于lens 是考虑到 "a" "a.*"
        if(lenp - start2 > 1 && p[start2+1] === '*') {
            if(start1 < lens && (s[start1] === p[start2] || p[start2] === '.')) {
                return Match(start1 + 1, start2) || Match(start1, start2 + 2);//Match(start1 + 1, start2 + 2) 此情况多余, Match(start1 + 1, start2 + 2)的情况完全可以由 Match(start1 + 1, start2) 和 Match(start1, start2 + 2)组合出来
            }
            return Match(start1, start2 + 2);
        }
        if(start1 < lens && (s[start1] === p[start2] || p[start2] === '.')) {
            return Match(start1 + 1, start2 + 1);
        }
        return false;
    }
    return Match(0,0);
};
```
#### 11、盛最多水的容器
```javascript
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    var len = height.length;
    var ans = 0;
    for(var i = 0; i < len; i++) {
        for(var j = i + 1; j < len; j++) {
            ans = Math.max(ans, Math.min(height[i], height[j]) * (j - i));
        }
    }
    return ans;
};
```
#### 51、N皇后问题
```javascript
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    var arr = [];
    for(var i = 0; i < n; i++) {
        arr[i] = [];
        for(var j = 0; j < n; j++) {
            arr[i][j] = '.'
        }
    }
    function judge(a, b) {
        var m = a - 1;
        var q = b;
        while(m >= 0) {
            if(arr[m][q] === '.') m--;
            else return false;
        }
        m = a - 1;
        q = b - 1;
        while(m >= 0 && q >= 0) {
            if(arr[m][q] === '.') m--, q--;
            else return false;
        }
        m = a - 1;
        q = b + 1;
        while(m >= 0 && q < n) {
            if(arr[m][q] === '.') m--, q++;
            else return false;
        }
        return true;
    }
    var s = '';
    var ans = [];
    function solve(k) {
        if(k === n) {
            var t = [];
            for(i = 0; i < n; i++) {
                for(j = 0; j < n; j++) {
                    s += arr[i][j];
                }
                t.push(s);
                s = ''
            }
            ans.push(t);
        }
        for(var p = 0; p < n; p++) {
            if(judge(k, p)) {
                arr[k][p] = 'Q';
                solve(k + 1);
                arr[k][p] = '.';
            }
        }
    }
    solve(0);
    return ans;
};
```
#### 64、最小路径和
```javascript
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    var m = grid.length;
    var n = grid[0].length;
    for(var i = 0; i < m; i++) {
        for(var j =0; j < n; j++) {
            if(i === 0) {
                if(j > 0)
                        grid[i][j] += grid[i][j-1];
            }else {
                if(j > 0)
                        grid[i][j] += Math.min(grid[i][j-1], grid[i-1][j]);
                else 
                        grid[i][j] += grid[i - 1][j];
            }
        }
    }
    return grid[m - 1][n - 1];
};
```
#### 46、全排列
```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    var len = nums.length;
    var ans = [];
    function solve(k) {
        if(k === len) {
            ans.push([].concat(nums));
            return;
        }
        var t;
        for(var i = k; i < len; i++) {
            t = nums[i];
            nums[i] = nums[k];
            nums[k] = t;
            solve(k + 1);
            t = nums[i];
            nums[i] = nums[k];
            nums[k] = t;
        }
    }
    solve(0);
    return ans;
};
```
#### 47、全排列2
```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
    var len = nums.length;
    var ans = [];
    function solve(k) {
        if(k === len) {
            ans.push(nums.join(''));
            return;
        }
        var t;
        for(var i = k; i < len; i++) {
            t = nums[i];
            nums[i] = nums[k];
            nums[k] = t;
            solve(k + 1);
            t = nums[i];
            nums[i] = nums[k];
            nums[k] = t;
        }
    }
    solve(0);
    var final = [];
    for(var i = 0; i < ans.length; i++) {
        if(final.indexOf(ans[i]) === -1)
            final.push(ans[i]);
    }
    final = final.map(function(item) {
        var it = [];
        var flag = 1;
        for(var j = 0; j < item.length; j++) {
            if(item[j] === '-') {
                flag = -1;
            }else {
                it.push(Number(item[j]) * flag);
                flag = 1;
            }
        }
        return it;
    })
    return final;
};
```
#### 43、字符串相乘
```javascript
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
     function add(a, b) {
        var flag = 0;
        var la = a.length - 1;
        var lb = b.length - 1;
        var ans = '';
        var t = 0;
        while(la >= 0 && lb >= 0) {
            t = Number(a[la]) + Number(b[lb]) + flag;
            flag = Math.floor(t / 10);
            t %= 10;
            ans = t + ans;
            la--;
            lb--;
        }
        while(la >= 0) {
            t = Number(a[la]) + flag;
            flag = Math.floor(t / 10);
            t %= 10;
            ans = t + ans;
            la--;
        }
        while(lb >= 0) {
            t = Number(b[lb]) + flag;
            flag = Math.floor(t / 10);
            t %= 10;
            ans = t + ans;
            lb--;
        }
        if(flag > 0)
            ans = flag + ans;
        return ans;
    }
    function mult(a, b, n) {
        var ans = '';
        var flag = 0;
        var t = 0;
        var nb = Number(b);
        // console.log('nb',nb);
        for(var i = a.length - 1; i >= 0; i--) {
            t = Number(a[i]) * nb + flag;
            // console.log(t)
            flag = Math.floor(t / 10);
            t %= 10;
            ans = t + ans;
        }
        if(flag > 0) ans = flag + ans;
        while(n--) {
            ans += '0';
        }
        // console.log('mult', ans);
        return ans;
    }
    var pre = '0';
    var ans = '';
    var len =  num1.length;
    for(var i = len - 1; i >= 0; i--) {
        ans = add(mult(num2, num1[i], len - i - 1), pre);
        pre = ans;
    }
    for(i = 0; i < ans.length; i++) {
        if(ans[i] !== '0') break;
    }
    ans = ans.slice(i);
    return ans.length <= 0 ? '0' : ans;
};
```
#### N皇后问题2
```javascript
/**
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function(n) {
     var arr = [];
    for(var i = 0; i < n; i++) {
        arr[i] = [];
        for(var j = 0; j < n; j++) {
            arr[i][j] = '.'
        }
    }
    function judge(a, b) {
        var m = a - 1;
        var q = b;
        while(m >= 0) {
            if(arr[m][q] === '.') m--;
            else return false;
        }
        m = a - 1;
        q = b - 1;
        while(m >= 0 && q >= 0) {
            if(arr[m][q] === '.') m--, q--;
            else return false;
        }
        m = a - 1;
        q = b + 1;
        while(m >= 0 && q < n) {
            if(arr[m][q] === '.') m--, q++;
            else return false;
        }
        return true;
    }
    var s = '';
    var ans = 0;
    function solve(k) {
        if(k === n) {
            ans++;
        }
        for(var p = 0; p < n; p++) {
            if(judge(k, p)) {
                arr[k][p] = 'Q';
                solve(k + 1);
                arr[k][p] = '.';
            }
        }
    }
    solve(0);
   
    return ans;
};
```
#### 有效数字
```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isNumber = function(s) {
    s = s.trim();
    if(s && !isNaN(Number(s))) {
        return true;
    }else {
        return false;
    }
};
```
#### 二叉树后序遍历
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
    var ans = [];
    function dfs(rt) {
        if(!rt) return ;
        dfs(rt.left);
        dfs(rt.right);
        ans.push(rt.val);
    }
    dfs(root);
;   return ans;
};
```
#### 前缀树
```javascript
/**
 * Initialize your data structure here.
 */
var Trie = function() {
    function Node(val) {
        this._nodes = [];
        this._value = val;
        this._flag = false;
    }
    this._root = new Node();
};
Trie.createNew = function() {
    return new Trie();
}
/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    var _t = this._root;
    var flag = false;
    if(word.length < 0) return;
    for(var i = 0; i < word.length; i++) {
        flag = false;
        for(var j = 0; j < _t._nodes.length; j++) {
            if(_t._nodes[j]._value === word[i]) {
                _t = _t._nodes[j];
                flag = true;
                break;
            }
        }
        if(!flag) {
            var f = new this._root.constructor(word[i]);
            _t._nodes.push(f);
            _t = f;
        }
    }
    _t._flag = true;
};

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    var _t = this._root;
    var flag = false;
    for(var i = 0; i < word.length; i++) {
        flag = false;
        for(var j = 0; j < _t._nodes.length; j++) {
            if(_t._nodes[j]._value === word[i]) {
                _t = _t._nodes[j];
                flag = true;
                break;
            }
        }
        if(!flag) {
           return false;
        }
    }
    return _t._flag;
};

/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    var _t = this._root;
    var flag = false;
    for(var i = 0; i < prefix.length; i++) {
        flag = false;
        for(var j = 0; j < _t._nodes.length; j++) {
            if(_t._nodes[j]._value === prefix[i]) {
                _t = _t._nodes[j];
                flag = true;
                break;
            }
        }
        if(!flag) {
           return false;
        }
    }
    return true;
};

/** 
 * Your Trie object will be instantiated and called as such:
 * var obj = Object.create(Trie).createNew()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
```
#### 二叉树中序遍历
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    var ans = [];
    function dfs(rt) {
        if(!rt) return;
        dfs(rt.left);
        ans.push(rt.val);
        dfs(rt.right);
    }
    dfs(root);
    return ans;
};
// 非递归
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    var ans = [];
    var t = [];
    var last;
    var rt;
    if(!root) return ans;
    last = t.push(root);
    while(t.length > 0) {
        rt = t[last - 1];
        if(rt.left) {
            last = t.push(rt.left);
            rt.left = null;
        }else {
            ans.push(rt.val);
            last--;
            t.pop();
            if(rt.right) {
                last = t.push(rt.right);
            }
        }
    }
    return ans;
};
```
#### 二叉树的层次遍历
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    var flag = true;
    var ans = [];
    var pre = [];
    var next = [];
    if(!root) return ans;
    pre.push(root);
    while(pre.length > 0 || next.length > 0) {
        if(flag) {
            var pa = [];
            var p;
            while(pre.length > 0) {
                p = pre.shift();
                pa.push(p.val);
                if(p.left) {
                    next.push(p.left);
                }
                if(p.right) {
                    next.push(p.right);
                }
            }
            flag = !flag;
            if(pa.length > 0) ans.push(pa);
        }else {
            var na = [];
            var n;
            while(next.length > 0) {
                n = next.shift();
                na.push(n.val);
                if(n.left) {
                    pre.push(n.left);
                }
                if(n.right) {
                    pre.push(n.right);
                }
            }
             flag = !flag;
            if(na.length > 0) ans.push(na);
        }
    }
    return ans;
};
```
#### 最大子序和
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    var sum = 0;
    var ans = nums[0];
    for(var i = 0; i < nums.length; i++) {
        if(sum < 0) {
            sum = nums[i];
        }else {
            sum += nums[i];
        }
        ans = Math.max(ans, sum);
    }
    return ans;
};
```
#### 爬楼梯
```javascript
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    var ans = [0, 1, 2];
    for(var i = 3; i <= n; i++) {
        ans[i] = ans[i - 1] + ans[i - 2];
    }
    return ans[n];
};
```
#### 不同路径
```javascript
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    var ans = [];
    for(var i = 0; i < m; i++) {
        ans.push([]);
        for(var j = 0; j < n; j++) {
            if(i === 0) {
                ans[i][j] = 1;
            }else {
                if(j === 0) {
                     ans[i][j] = ans[i - 1][j];
                }else {
                     ans[i][j] = ans[i][j - 1] + ans[i - 1][j];
                }
            }
        }
    }
    return ans[m - 1][n - 1];
};
```
#### 不同路径2
```javascript
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
     var ans = [];
     var m = obstacleGrid.length;
     var n = obstacleGrid[0].length;
    for(var i = 0; i < m; i++) {
        ans.push([]);
        for(var j = 0; j < n; j++) {
            if(i === 0) {
                if(obstacleGrid[i][j]) {
                     ans[i][j] = 0;
                }else {
                     ans[i][j] = j === 0 ? 1 : ans[i][j - 1];
                }
            }else {
                if(j === 0) {
                    if(obstacleGrid[i][j]) {
                        ans[i][j] = 0;
                    }else {
                        ans[i][j] = ans[i - 1][j];
                    }
                }else {
                    if(obstacleGrid[i][j]) {
                        ans[i][j] = 0;
                    }else {
                        ans[i][j] = ans[i][j - 1] + ans[i - 1][j];
                    }
                }
            }
        }
    }
    return ans[m - 1][n - 1];
};
```
#### 最小花费爬楼梯
```javascript
/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function(cost) {
    var ans = [];
    var len = cost.length;
    for(var i = 0; i < cost.length; i++) {
        if(i < 2) ans[i] = cost[i];
        else {
            ans[i] = cost[i]+ Math.min(ans[i - 1], ans[i - 2]);
        }
    }
    return Math.min(ans[len - 1], ans[len - 2]);
};
```
#### 杨辉三角2
```javascript
/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
    var ans =[];
    for(var i = 0; i <= rowIndex; i++) {
        ans.push([]);
        for(var j = 0; j <= i; j++) {
            if(j === 0 || j === i) ans[i][j] = 1;
            else {
                ans[i][j] = ans[i - 1][j - 1] +ans[i - 1][j];
            }
        }
    }
    return ans[rowIndex];
};
```
#### 杨辉三角
```javascript
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
    var ans = [];
    for(var i = 0; i < numRows; i++) {
        ans.push([]);
        for(var j = 0; j <= i; j++) {
            if(j === 0 || j === i) ans[i][j] = 1;
            else {
                ans[i][j] = ans[i - 1][j - 1] +ans[i - 1][j];
            }
        }
    }
    return ans;
};
```
#### 最长上升子序列
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    var len = nums.length;
    var ans = [];
    var res = 0;
    for(var i = 0; i < len; i++) {
        ans[i] = 1;
        for(var j = 0; j < i; j++) {
            if(nums[i] > nums[j]) {
                ans[i] = Math.max(ans[i], ans[j] + 1);
            }
        }
        res = Math.max(res, ans[i]);
    }
    return res;
};
```
#### 最长递增子序列的个数
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumberOfLIS = function(nums) {
    var len = nums.length;
    var ans = [];
    var res = 0;
    for(var i = 0; i < len; i++) {
        ans[i] = 1;
        for(var j = 0; j < i; j++) {
            if(nums[i] > nums[j]) {
                ans[i] = Math.max(ans[i], ans[j] + 1);
            }
        }
        res = Math.max(res, ans[i]);
    }
    function dfs(r, end) {
        var as = 0;
        if(r === 0) return 1;
        for(var k = end; k >= 0; k--) {
            if(ans[k] === r && nums[end] > nums[k]) {
                as = as + dfs(r - 1, k);
            }
        }
        return as;
    }
    var final = 0;
    for(var y = 0; y < len; y++) {
        if(res === ans[y]) {
            final = final + dfs(res - 1, y);
        }
    }
    return final;
};
```
#### 区间和检索
```javascript
/**
 * @param {number[]} nums
 */
var NumArray = function(nums) {
    var ans = [];
    var len = nums.length;
    for(var i = 0; i < len; i++) {
       ans[i] = i === 0 ? nums[i] : ans[i - 1] + nums[i];
    }
    this.ans = ans;
};
NumArray.createNew = function(nums) {
    return new NumArray(nums);
}
/** 
 * @param {number} i 
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function(i, j) {
    return i === 0 ? this.ans[j] : this.ans[j] - this.ans[i - 1];
};

/** 
 * Your NumArray object will be instantiated and called as such:
 * var obj = Object.create(NumArray).createNew(nums)
 * var param_1 = obj.sumRange(i,j)
 */
 ```
 #### 打家劫舍
 ```javascript
 /**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    var ans = [];
    var len = nums.length;
    for(var i = 0; i < len; i++) {
        ans.push([]);
        if(i === 0) {
            ans[i][0] = 0;
            ans[i][1] = nums[i];
        }else {
            ans[i][0] = Math.max(ans[i - 1][1], ans[i - 1][0]);
            ans[i][1] = ans[i - 1][0] + nums[i];
        }
    }
    return len > 0 ? Math.max(ans[len - 1][1], ans[len - 1][0]) : 0;
};
```
#### 打家劫舍2
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    var len = nums.length;
    function solve(start, end) {
        var ans = [];
        for(var j = 0; j < start && j < len; j++) ans.push([0, nums[j]]);
        for(var i = start; i < end; i++) {
            ans.push([]);
            if(i === start) {
                ans[i][0] = 0;
                ans[i][1] = nums[i];
            }else {
                ans[i][0] = Math.max(ans[i - 1][1], ans[i - 1][0]);
                ans[i][1] = ans[i - 1][0] + nums[i];
            }
        }
        return end > 0 ? Math.max(ans[end - 1][1], ans[end - 1][0]) : 0;
    }
    return Math.max(solve(0, len - 1), solve(1, len));
};
```
#### 打家劫舍3
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var rob = function(root) {
    let Max = Math.max
     function solve(rt) {
        if(!rt) return {take: 0,untake: 0}
        let st = solve(rt.left)
        let sr = solve(rt.right)
        // console.log(st, sr)
        let take = st.untake + sr.untake + rt.val
        let untake =Max(st.take, st.untake) + Max(sr.take, sr.untake)
        return {take, untake}
    }
    let ans = solve(root)
    return Max(ans.take, ans.untake)
};
```
#### 买股票最佳时机
```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let len = prices.length;
    let ans = 0;
    let Max = Math.max;
    let t;
    for(let i = 0; i < len; i++) {
        t = 0;
        for(let j = 0; j < i; j++) {
            t = Max(prices[i] - prices[j], t);
        }
        ans = Max(ans, t);
    }
    return ans;
};
```
#### 解码方法
```javascript
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
    let len = s.length;
    let ans = [];
    let n;
    for(let i = 0; i < len; i++) {
        if(i === 0) {
            if(s[i] === '0') ans[i] = 0;
            else ans[i] = i + 1;
        }
        else {
            if(s[i - 1] === '0' && s[i] === '0') {
                ans[i] = 0;
            }else if(s[i - 1] === '0' && s[i] !== '0') {
                ans[i] = ans[i - 1];    
            }else if(s[i - 1] !== '0' && s[i] === '0') {
                n = Number(s[i - 1] + s[i]);
                if(n > 26) {
                    ans[i] = 0;
                }else {
                    ans[i] = i === 1 ? 1 : ans[i - 2];
                }    
            }else {
                n = Number(s[i - 1] + s[i]);
                if(n > 26) {
                    ans[i] = ans[i - 1];
                }else {
                    ans[i] = i === 1 ? ans[i - 1] + 1 : ans[i - 1] + ans[i - 2];
                }
            } 
        }
    }
    return ans[len - 1];
};
```
#### 三角形最小路径和
```javascript
/**
 * @param {number[][]} triangle
 * @return {number}
 */
// O(N) 空间复杂度只需要改成per = [], current = [],因为i状态只于i-1有关
var minimumTotal = function(triangle) {
    let len = triangle.length
    const Min = Math.min
    let ans = []
    for(let i = 0; i < len; i++) {
        ans.push([])
        if(i === 0) {
            ans[i][0] = triangle[i][0]
            continue
        }
        for(let j = 0; j <= i; j++) {
            if(j === 0) {
                ans[i][j] = ans[i - 1][j] + triangle[i][j]
            }else if(j === i) {
                ans[i][j] = ans[i - 1][j - 1] + triangle[i][j]
            }else {
                ans[i][j] = Min(ans[i - 1][j], ans[i - 1][j - 1]) + triangle[i][j]
            }
        }
    }
    let final = 1 << 30
    for(let i = 0; i < len; i++) {
        final = Min(final, ans[len - 1][i])
    }
    return len <= 0 ? 0 : final
};
```
#### 丑数2
```javascript
/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function(n) {
    let a,b,c
    a = b = c = 0
    let ans = [1]
    let Min = Math.min
    let t = 1
    for(let i = 1; i < n; i++) {
        t = Min(ans[a] * 2, ans[b] * 3, ans[c] * 5)
        if(t === ans[a] * 2) a++
        if(t === ans[b] * 3) b++
        if(t === ans[c] * 5) c++
        ans.push(t)
    }
    return t
};
```
#### 丑数
```javascript
/**
 * @param {number} num
 * @return {boolean}
 */
var isUgly = function(num) {
    if(num <= 0) return false
    while(num % 2 === 0) {
        num /= 2
    }
    while(num % 3 === 0) {
        num /= 3
    }
    while(num % 5 === 0) {
        num /= 5
    }
    if(num === 1) return true
    return false
};
```
#### 二叉树前序遍历
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    let ans = []
    function dfs(rt) {
        if(!rt) return
        ans.push(rt.val)
        dfs(rt.left)
        dfs(rt.right)
    }
    dfs(root)
    return ans
};
// 非递归版
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    let ans = []
    let t = []
    if(!root) return ans
    let len = t.push(root)
    ans.push(root.val)
    while(t.length > 0) {
        let rt = t[len - 1]
        if(rt.left) {
            ans.push(rt.left.val)
            len = t.push(rt.left)
            rt.left = null
        }else {
            t.pop()
            len--
            if(rt.right) {
                ans.push(rt.right.val)
                len = t.push(rt.right)
            }
        }
    }
    return ans
};
```
#### 判断子序列
```javascript
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t) {
    let lens = s.length
    let lent = t.length
    let start = 0
    for(let i = 0; i < lent; i++) {
        if(start === lens) return true
       if(t[i] === s[start]) {
           start++
       }
    }
    return lens === start
};
```
#### 匹配子序列的单词数
```javascript
/**
 * @param {string} S
 * @param {string[]} words
 * @return {number}
 */
// 用set水过去，但意义不大
var numMatchingSubseq = function(S, words) {
    let len = S.length
    let lws = words.length
    let ans = 0
    let set_fail = new Set()
    let set_ok = new Set()
    for(let i = 0; i < lws; i++) {
        let l = words[i].length
        let start = 0
        if(set_ok.has(words[i])) {
            ans++
            continue
        }
        if(set_fail.has(words[i])) {
            continue
        }
        for(let j = 0; j < len; j++) {
            if(words[i][start] === S[j]) start++
            if(start === l) break
        }
        if(start === l) {
            ans++
            set_ok.add(words[i])
        }else {
            set_fail.add(words[i])
        }
    }
    return ans
};
```
#### 一和零
```javascript
/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
// 01背包 问题
var findMaxForm = function(strs, m, n) {
    let Max = Math.max
    let len = strs.length
    let ans = []
    function find_zero(str) {
        let sum = 0
        for(let i = 0; i < str.length; i++) {
            if(str[i] === '0') sum++
        }
        return sum
    }
    function find_one(str) {
        let sum = 0
        for(let i = 0; i < str.length; i++) {
            if(str[i] === '1') sum++
        }
        return sum
    }
    for(let i = 0; i < len; i++) {
        ans.push([])
        let count_zero = find_zero(strs[i])
        let count_one = find_one(strs[i])
        for(let j = 0; j <= m; j++) {
            ans[i].push([])
            for(let k = 0; k <= n; k++) {
                ans[i][j].push([])
                if(count_zero <= j && count_one <= k) {
                    ans[i][j][k] = i === 0 ? 1 : Max(ans[i - 1][j - count_zero][k - count_one] + 1, ans[i - 1][j][k])
                }else {
                    ans[i][j][k] = i === 0 ? 0 : ans[i - 1][j][k]
                }
            }
        }
    }
    // console.log(ans)
    return ans[len - 1][m][n]
};
```
#### 二叉树剪枝
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var pruneTree = function(root) {
    function dfs(rt) {
        if(!rt) return true
        let flag_left = dfs(rt.left)
        if(flag_left) {
            rt.left = null
        }
        let flag_right = dfs(rt.right)
        if(flag_right) {
            rt.right = null
        }
        if(flag_left && flag_right && rt.val === 0) {
            rt = null
            return true
        }
        return false
    }
    dfs(root)
    return root
    
};
```
#### 01矩阵
```javascript
/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var updateMatrix = function(matrix) {
    let m = matrix.length
    let n = matrix[0].length
    let ans = []
    const INF = 1 << 30
    const Min = Math.min
    for(let i = 0; i < m; i++) {
        ans.push([])
        for(let j = 0; j < n; j++) {
            ans[i][j] = matrix[i][j] === 0 ? 0 : INF
            if(i === 0) {
                ans[i][j] = j === 0 ? ans[i][j] : Min(ans[i][j - 1] + 1, ans[i][j])
            }else {
                ans[i][j] = j === 0 ? Min(ans[i - 1][j] + 1, ans[i][j]) : Min(ans[i - 1][j] + 1, ans[i][j], ans[i][j - 1] + 1)
            }
        }
    }
    for(let i = m - 1; i >= 0; i--) {
        for(let j = n - 1; j >= 0; j--) {
            if(i === m - 1) {
                ans[i][j] = j === n - 1 ? ans[i][j] : Min(ans[i][j + 1] + 1, ans[i][j])
            }else {
                ans[i][j] = j === n - 1 ? Min(ans[i + 1][j] + 1, ans[i][j]) : Min(ans[i + 1][j] + 1, ans[i][j], ans[i][j + 1] + 1)
            }
        }
    }
    return ans
};
```
#### 两数相加2
```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let pre = null
    let cur
    let t1  = []
    let t2 = []
    while(l1) {
        t1.push(l1)
        l1 = l1.next
    }
    while(l2) {
        t2.push(l2)
        l2 = l2.next
    }
    let flag = 0
    let val = 0
    while(t1.length && t2.length) {
        let a = t1.pop()
        let b = t2.pop()
        val = a.val + b.val + flag
        flag = parseInt(val / 10)
        cur = new ListNode(val % 10)
        cur.next = pre
        pre = cur
    }
    while(t1.length) {
        let a = t1.pop()
        val = a.val + flag
        flag = parseInt(val / 10)
        cur = new ListNode(val % 10)
        cur.next = pre
        pre = cur
    }
    while(t2.length) {
        let a = t2.pop()
        val = a.val + flag
        flag = parseInt(val / 10)
        cur = new ListNode(val % 10)
        cur.next = pre
        pre = cur
    }
    if(flag > 0) {
        cur = new ListNode(flag)
        cur.next = pre
        pre = cur
    }
    return pre
};
```
#### 零钱兑换
```javascript
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    let ans = []
    let len = coins.length
    const INF = 1 << 30
    const Min = Math.min
    for(let i = 0; i < len; i++) {
        ans.push([])
        for(let j = 0; j <= amount; j++) {
            ans[i][j] = j === 0 ? 0 : INF
            if(i === 0) {
                ans[i][j] = j >= coins[i] ? Min(ans[i][j], ans[i][j - coins[i]] + 1) : ans[i][j]
            }else {
                ans[i][j] = j >= coins[i] ? Min(ans[i][j], ans[i - 1][j], ans[i][j - coins[i]] + 1) :  Min(ans[i][j], ans[i - 1][j])
            }
        }
    }
    return ans[len - 1][amount] === INF ? -1 : ans[len - 1][amount]
};
```
#### 组合总和
```javascript
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    let ans = []
    let t = []
    let len = candidates.length
    candidates.sort((a, b) => a - b)
    function dfs(cur, val) {
        let v = 0
        let index = 0
        if(val === target) {
            ans.push([].concat(t))
            return
        }
        if(cur === len) return
        dfs(cur + 1, v + val)
        while(v + val < target) {
            index++
            v += candidates[cur]
            t.push(candidates[cur])
            dfs(cur + 1, v + val)
        }
        
        for(let i = 0; i < index; i++) t.pop()
    }
    dfs(0, 0)
    return ans
};
```
#### 组合总数2
```javascript
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    let ans = []
    let t = []
    let len = candidates.length
    candidates.sort((a, b) => a - b)
    function unique(p) {
       for(let i = 0; i < ans.length; i++) {
           let item = ans[i]
           let flag = false
           if(item.length === p.length) {
               p.forEach((it, ind) => {
                   if(it !== item[ind]) flag = true
               })
           }else {
               flag = true
           }
           if(!flag) return false
       }
        return true
    }
    function dfs(cur, val) {
        let v = 0
        let index = 0
        if(val === target) {
            let temp = [].concat(t)
            if(unique(temp)) {
                ans.push(temp)
            }
            return
        }
        if(cur === len) return
        dfs(cur + 1, v + val)
        while(v + val < target && index < 1) {
            index++
            v += candidates[cur]
            t.push(candidates[cur])
            dfs(cur + 1, v + val)
        }
        
        for(let i = 0; i < index; i++) t.pop()
    }
    dfs(0, 0)
    return ans
};
```
#### 组合总数3
```javascript
/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function(k, n) {
    let ans = []
    let t = []
    function dfs(cur, val, count) {
        let v = 0
        let index = 0
        if(val === n && count === k) {
            let temp = [].concat(t)
            ans.push(temp)
            return
        }
        if(cur === 10) return
        dfs(cur + 1, v + val, count)
        while(v + val < n && index < 1) {
            index++
            v += cur
            t.push(cur)
            dfs(cur + 1, v + val, count + index)
        }
        
        for(let i = 0; i < index; i++) t.pop()
    }
    dfs(1, 0, 0)
    return ans
};
```
#### 组合
```javascript
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    let t = []
    let ans = []
    function dfs(cur, now) {
        if(cur > n + 1) return 
        if(now === k) {
            ans.push([].concat(t))
        }
        for(let i = cur; i <= n; i++) {
            t.push(i)
            dfs(i + 1, now + 1)
            t.pop()
        }
    }
    dfs(1, 0)
    return ans
};
```
#### 零钱兑换2
```javascript
/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function(amount, coins) {
    let clen = coins.length
    let ans = []
    for(let i = 0; i < clen; i++) {
        ans.push([])
        for(let j = 0; j <= amount; j++) {
            ans[i][j] = 0
            if(i === 0) {
                if(j === coins[i]) {
                    ans[i][j] = 1
                }else if(j > coins[i]) {
                    ans[i][j] = ans[i][j - coins[i]]
                }
            }else {
                 if(j === coins[i]) {
                    ans[i][j] = ans[i - 1][j - coins[i]] + ans[i - 1][j] + (ans[i][j - coins[i]] ? ans[i][j - coins[i]] : 1)
                }else if(j > coins[i]) {
                    ans[i][j] = ans[i - 1][j] + ans[i][j - coins[i]]
                }else {
                    ans[i][j] = ans[i - 1][j]
                }
            }
        }
    }
    if(amount < 1) return 1
    return clen < 1 ? 0 : ans[clen - 1][amount]
};
```
#### 验证二叉搜索树
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(r) {
    let flag = true
    if(!r) return true
    const Min = Math.min
    const Max = Math.max
    function dfs(root) {
        if(!root) return null
        let left = dfs(root.left)
        let right = dfs(root.right)
        if(left && right) {
            if(!(left.max < root.val && root.val < right.min)) flag = false
            return {
                min: Min(left.min, root.val, right.min),
                max: Max(left.max, root.val, right.max)
            }
        }else if(!left && right) {
            if(right.min <= root.val) flag = false
            return {
                min: Min(right.min, root.val),
                max: Max(right.max, root.val)
            }
        }else if(!right && left) {
            if(left.max >= root.val) flag = false
            return {
                min: Min(left.min, root.val),
                max: Max(left.max, root.val)
            }
        }else {
            return {
                min: root.val,
                max: root.val
            }
        }
    }
    dfs(r)
    return flag
};
```
#### 路径总和2
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function(root, sum) {
    let ans = []
    let t = []
    function dfs(rt, cur) {
        if(!rt) return
        t.push(rt.val)
        rt.left && dfs(rt.left, cur + rt.val)
        rt.right && dfs(rt.right, cur + rt.val)
        if(!rt.left && !rt.right &&　cur + rt.val === sum) {
            ans.push([].concat(t))
        }
        t.pop()
    }
    dfs(root, 0)
    return ans
};
```
#### 二叉树展为链表
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function(root) {
    let ans = []
    function dfs(rt) {
        if(!rt) return 
        ans.push(rt)
        dfs(rt.left)
        dfs(rt.right)
    }
    dfs(root)
    let pre
    while(ans.length > 0) {
        t = ans.shift()
        if(!pre) {
            pre = root
        }else {
            pre.right = t
            pre.left = null
            pre = t
        }
    }
    if(pre) {
        pre.left = pre.right = null
    }
};
```
#### 前序中序构造二叉树
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    let ans
    let pL = preorder.length
    let iL = inorder.length
    function generateTree(preStart, preEnd, inStart, inEnd) {
        if(preStart < 0 || preEnd >= pL || inStart < 0 || inEnd >= iL || preStart > preEnd || inStart > inEnd) return null
        let t
        for(let i = inStart; i <= inEnd; i++) {
            if(inorder[i] === preorder[preStart]) t = i
        }
        let rt = new TreeNode(preorder[preStart])
        rt.left = generateTree(preStart + 1, preStart + t - inStart, inStart, t - 1)
        rt.right = generateTree(preStart + t - inStart + 1, preEnd, t + 1, inEnd)
        return rt
    }
    ans = generateTree(0, pL - 1, 0, iL - 1)
    return ans
};
```
#### 中序后序生成二叉树
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function(inorder, postorder) {
    let ans
    let pL = postorder.length
    let iL = inorder.length
    function generateTree(inStart, inEnd, posStart, posEnd) {
        if(posStart < 0 || posEnd >= pL || inStart < 0 || inEnd >= iL || posStart > posEnd || inStart > inEnd) return null
        let t
        for(let i = inStart; i <= inEnd; i++) {
            if(inorder[i] === postorder[posEnd]) t = i
        }
        let rt = new TreeNode(postorder[posEnd])
        rt.left = generateTree(inStart, t - 1, posStart, posStart + t - inStart - 1)
        rt.right = generateTree(t + 1, inEnd, posStart + t - inStart, posEnd - 1)
        return rt
    }
    ans = generateTree(0, iL - 1, 0, pL - 1)
    return ans
};
```
#### 填充同一层的兄弟节点
```javascript
/**
 * Definition for binary tree with next pointer.
 * function TreeLinkNode(val) {
 *     this.val = val;
 *     this.left = this.right = this.next = null;
 * }
 */

/**
 * @param {TreeLinkNode} root
 * @return {void} Do not return anything, modify tree in-place instead.
 */
var connect = function(root) {
    let cur = []
    let pur = []
    if(!root) return
    cur.push(root)
    while(cur.length > 0 || pur.length > 0) {
        if(cur.length <= 0) {
            let t = cur
            cur = pur
            pur = t
        }
        let pre = null
        while(cur.length > 0) {
            let t = cur.shift()
            if(pre) {
                pre.next = t
            }
            t.left && pur.push(t.left)
            t.right && pur.push(t.right)
            pre = t
        }
    }
};
```
#### 填充同一层的兄弟节点2
```javascript
/**
 * Definition for binary tree with next pointer.
 * function TreeLinkNode(val) {
 *     this.val = val;
 *     this.left = this.right = this.next = null;
 * }
 */

/**
 * @param {TreeLinkNode} root
 * @return {void} Do not return anything, modify tree in-place instead.
 */
var connect = function(root) {
    let cur = []
    let pur = []
    if(!root) return
    cur.push(root)
    while(cur.length > 0 || pur.length > 0) {
        if(cur.length <= 0) {
            let t = cur
            cur = pur
            pur = t
        }
        let pre = null
        while(cur.length > 0) {
            let t = cur.shift()
            if(pre) {
                pre.next = t
            }
            t.left && pur.push(t.left)
            t.right && pur.push(t.right)
            pre = t
        }
    }
};
```
#### 子数组按位或操作
```javascript
/**
 * @param {number[]} A
 * @return {number}
 */
var subarrayBitwiseORs = function(A) {
    let len = A.length
    let pre = new Set()
    let ans = []
    for(let i = 0; i < len; i++) {
        let t = A[i]
        let arr = [t]
        ans.push(t)
        for(let key of pre.keys()) {
            ans.push(key | t)
            arr.push(key | t)
        }
       pre = new Set(arr)
    }
    
    return (new Set(ans)).size
};
```
#### 根到节点数字之和
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function(root) {
    let ans = 0
    function dfs(rt, val) {
        if(!rt) return
        val += rt.val
        if(!rt.left && !rt.right) {
            ans += Number(val)
            return
        }
        rt.left && dfs(rt.left, val)
        rt.right && dfs(rt.right, val)
    }
    dfs(root, '')
    return ans
};
```
#### 被围绕的区域
```javascript
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {
    let xl = board.length
    if(xl <= 0) return 
    let yl = board[0].length
    let t = []
    for(let i = 0; i < xl; i++) {
        t.push([])
        for(let j = 0; j < yl; j++) {
            t[i][j] = 0
        }
    }
    function dfs(x, y, ind) {
        t[x][y] = -1
        let flag = true
        if(x <= 0 || x >= xl - 1 || y <= 0 || y >= yl - 1) flag = false
        if(x >= 0 && x < xl && y >= 0 && y < yl) {
            if(x - 1 >= 0 && !t[x - 1][y]) flag = (board[x - 1][y] === 'X' || dfs(x - 1, y, ind)) && flag
            if(y + 1 < yl && !t[x][y + 1]) flag = (board[x][y + 1] === 'X' || dfs(x, y + 1, ind)) && flag
            if(x + 1 < xl && !t[x + 1][y]) flag = (board[x + 1][y] === 'X' || dfs(x + 1, y, ind)) && flag
            if(y - 1 >= 0 && !t[x][y - 1]) flag = (board[x][y - 1] === 'X' || dfs(x, y - 1, ind)) && flag
        }
        if(flag) t[x][y] = ind
        return flag
    }
    function toX(ind) {
        for(let i = 0; i < xl; i++) {
            for(let j = 0; j < yl; j++)
                if(t[i][j] === ind) board[i][j] = 'X'
        }
    }
    let index = 1
     for(let i = 0; i < xl; i++) {
        for(let j = 0; j < yl; j++) {
            if(board[i][j] === 'O' && !t[i][j]) {
                let res = dfs(i, j, index)
                if(res) {
                    toX(index)
                }
                index++
            }
        }
    }
};
```
#### 目标和
```javascript
/**
 * @param {number[]} nums
 * @param {number} S
 * @return {number}
 */
var findTargetSumWays = function(nums, S) {
    let len = nums.length
    let sum = 0
    function dfs(flag, ind, val) {
       if(ind >= len ) return
       let t = val + flag * nums[ind]
       if(ind === len - 1 && S === t) sum++
       dfs(1, ind + 1, t)
       dfs(-1, ind + 1, t)
    }
    dfs(1, 0, 0)
    dfs(-1, 0, 0)
    return sum
};
```
#### 在每个树行中找最大值
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var largestValues = function(root) {
    let ans = []
    let pre = []
    let next = []
    if(!root) return ans
    pre.push(root)
    while(pre.length > 0 || next.length > 0) {
        if(pre.length <= 0) {
            [pre, next] = [next, pre]
        }
        let m = pre[0].val
        while(pre.length > 0) {
            let t = pre.shift()
            t.left && next.push(t.left)
            t.right && next.push(t.right)
            m = Math.max(m, t.val)
        }
        ans.push(m)
    }
    return ans
};
```
#### 找出左下角的值
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var findBottomLeftValue = function(root) {
    let pre = []
    let next = []
    pre.push(root)
    let ans
    while(pre.length > 0 || next.length > 0) {
        if(pre.length <= 0) {
            [pre, next] = [next, pre]
        }
        ans = pre[0].val
        while(pre.length > 0) {
            let t = pre.shift()
            t.left && next.push(t.left)
            t.right && next.push(t.right)
        }
    }
    return ans
};
```
#### 子集
```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    let len = nums.length
    let ans = []
    let t = []
    function dfs(ind, flag) {
        if(ind === len) return
        if(flag) t.push(nums[ind])
        if(ind === len - 1) {
            ans.push([].concat(t))
        }
        dfs(ind + 1, 1)
        dfs(ind + 1, 0)
        if(flag) t.pop()
    }
    dfs(0, 1)
    dfs(0, 0)
    return ans
};
```
#### 子集2
```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
    let len = nums.length
    let ans = new Set()
    let t = []
    function dfs(ind, flag) {
        if(ind === len) return
        if(flag) t.push(nums[ind])
        if(ind === len - 1) {
            ans.add([].concat(t).sort((a, b) => a - b).join(','))
        }
        dfs(ind + 1, 1)
        dfs(ind + 1, 0)
        if(flag) t.pop()
    }
    dfs(0, 1)
    dfs(0, 0)
    let p = [...ans]
    p = p.map(item => {
        if(item.length <= 0) return []
        else return item.split(',')
    })
    p.forEach(item => {
        item.forEach((it, ind, arr) => {
            arr[ind] = Number(it)
        })
    })
    return p
};
```
#### 朋友圈
```javascript
/**
 * @param {number[][]} M
 * @return {number}
 */

var findCircleNum = function(M) {
    let len = M[0].length
    let t = []
    for(let i = 0; i < len; i++) t[i] = 0
    function dfs(stu, m) {
        for(let i = 0; i < len; i++) {
            if(M[stu][i]) {
               if(!t[i]) {
                   t[i] = m
                   dfs(i, m)
               }
            }
        }
    }
    let mark = 1
    for(let i = 0; i < len; i++) {
        if(!t[i]) {
            t[i] = mark
            dfs(i, mark)
            mark++
        }
    }
    return mark - 1
};
```
#### 递增子序列
```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var findSubsequences = function(nums) {
    let len = nums.length
    let set = new Set()
    let t = []
    function dfs(cur, flag) {
        if(cur === len) {
            t.length > 1 && set.add(t.join(','))
            return 
        }
        let push = false
        let tl = t.length
        if(flag && (!tl || (nums[cur] >= t[tl - 1]))) {
            t.push(nums[cur])
            push = true
        }
        dfs(cur + 1, true)
        dfs(cur + 1, false)
        if(push) t.pop()
    }
    dfs(0, true)
    dfs(0, false)
    let ans = []
    for(let item of set.keys()) {
        ans.push(item.split(',').map(n => Number(n)))
    }
    return ans
};
```
#### 岛屿的个数
```javascript
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    let mark = []
    let ans = 0
    let m = grid.length
    if(m < 1) return ans
    let n = grid[0].length
    let dx = [-1, 0, 1, 0]
    let dy = [0, 1, 0, -1]
    for(let i = 0; i < m; i++) {
        mark[i] = []
        for(let j = 0; j < n; j++) {
            mark[i][j] = 0
        }
    }
    function dfs(curX, curY) {
        if(curX < 0 || curX >= m || curY < 0 || curY >= n || grid[curX][curY] !== '1'|| mark[curX][curY]) return
        mark[curX][curY] = 1
        for(let i = 0; i < 4; i++) {
            let tx = curX + dx[i]
            let ty = curY + dy[i]
            dfs(tx, ty)
        }
    }
    
    for(let i = 0; i < m; i++) {
        for(let j = 0; j < n; j++) {
            if(grid[i][j] === '1' && !mark[i][j]) {
                ans++
                dfs(i, j)
            }
        }
    }
    return ans
};
```
#### 课程表
```javascript
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    let t = []
    let p = []
    for(let i = 0; i < numCourses; i++) {
        t[i] = 0
        p[i] = []
    }
    for(let i = 0; i < prerequisites.length; i++) {
       let [start, end] = prerequisites[i]
       t[start]++
       p[end].push(start)
    }
    let n = numCourses
    while(n > 0) {
        let flag = true
        for(let i = 0; i < numCourses; i++) {
            if(t[i] === 0) {
                n--
                flag = false
                for(let j = 0; j < p[i].length; j++) {
                    t[p[i][j]]--
                }
                t[i] = -1
            }
        }
        if(flag) return false
    }
    return true
};
```
#### 课程表2
```javascript
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function(numCourses, prerequisites) {
    let t = []
    let p = []
    let ans = []
    for(let i = 0; i < numCourses; i++) {
        t[i] = 0
        p[i] = []
    }
    for(let i = 0; i < prerequisites.length; i++) {
       let [start, end] = prerequisites[i]
       t[start]++
       p[end].push(start)
    }
    let n = numCourses
    while(n > 0) {
        let flag = true
        for(let i = 0; i < numCourses; i++) {
            if(t[i] === 0) {
                n--
                ans.push(i)
                flag = false
                for(let j = 0; j < p[i].length; j++) {
                    t[p[i][j]]--
                }
                t[i] = -1
            }
        }
        if(flag) return []
    }
    return ans
};
```
#### 课程表3
```javascript
/**
 * @param {number[][]} courses
 * @return {number}
 */
var scheduleCourse = function(courses) {
    courses.sort((a, b) => {
        let [sa, ea] = a
        let [sb, eb] = b
        if((ea < eb) || (ea === eb && sa <= sb)) return -1
        else return 1
    })
    let len = courses.length
    let t = []
    for(let i = 0; i <= len; i++) t[i] = 0
    let ans = 0
    for(let i = 0; i < len; i++) {
        let [start, end] = courses[i]
        for(let j = ans; j >= 0; j--) {
            let p = t[j] + start
            if(p <= end && ((!t[j + 1]) || (t[j + 1] > p))) {
                t[j + 1] = p
            }
        }
        if(t[ans + 1] > 0) ans++
    }
    // console.log(courses)
    // console.log(t, ans)
    return ans
};
```
#### 加油站
```javascript
/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function(gas, cost) {
    let start = 0
    let len = gas.length
    let now = 0
    for(let i = 0; i < len; i++) {
        let current = i
        let n = 0
        let isOk = true
        now = 0
        while(n < len) {
            now += gas[current]
            if(now - cost[current] < 0) {
                isOk = false
                break
            }else {
                now -= cost[current]
            }
            n++
            current = (current + 1) % len
        }
        if(isOk) return i
    }
    return -1
};
```
#### 移调K位数字
```javascript
/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
var removeKdigits = function(num, k) {
    let s = (num + '').split('')
    function delete_0() {
        while(s.length && (s[0] === '0')) {
            s.splice(0, 1)
        }
    }
    function find() {
        delete_0()
        let i = 1
        for(; i < s.length; i++) {
            if(s[i] < s[i - 1]) return i - 1
        }
        return i - 1
    }
    while(k > 0 && s.length) {
        let index = find()
        k--
        s.splice(index, 1)
    }
    delete_0()
    return s.length ? s.join('') : '0'
};
```
#### 跳跃游戏
```javascript
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    let index = 0
    let len = nums.length
    while(index < len) {
        let k = nums[index]
        let t = 0
        let f = index
        if(k + index >= len - 1) return true
        if(nums[index] <= 0) return false
        for(let i = index + 1, j = 0; j < k && i < len; i++, j++) {
            if(i + nums[i] >= t) {
                t = i + nums[i]
                f = i
            }
        }
        index = f
    }
    return false
};
```
#### 救生艇
```javascript
/**
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */
var numRescueBoats = function(people, limit) {
    let ans = 0
    people.sort((a, b) => b - a)
    function find(cur) {
        for(let i = cur + 1; i < people.length; i++) {
            if(people[i] + people[cur] <= limit) {
                return i
            }
        }
        return -1
    }

    for(let i = 0; i < people.length;) {
        if(people[i] >= limit) {
            ans++
            people.splice(i, 1)
        }else if(people[i] < limit) {
            let t = find(i)
            people.splice(i, 1)
            if(t > 0) {
                people.splice(t - 1, 1)
            }
            ans++
        }
    }
    return ans
};
```
#### 只出现1次的数字1
```javascript
```
#### 只出现1次的数字2
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let ans = 1
    let res = 0
    let len = nums.length
    for(let i = 0; i < 32; i++) {
        let sum = 0
        for(let j = 0; j < len; j++) {
            let t = ans & nums[j]
            if(t) sum++
        }
        if(sum % 3) {
            res |= ans
        }
        ans <<= 1
    }
    return res
};
```
#### 只出现1次的数字3
```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function(nums) {
    let t = 0
    let len = nums.length
    for(let i = 0; i < len; i++) t ^= nums[i]
    let k = t & (-t)
    let a = 0, b = 0
    for(let i = 0; i < len; i++) {
        if(nums[i] & k) a ^= nums[i]
        else b ^= nums[i]
    }
    return [a, b]
};
```
#### 重复的DNA序列
```javascript
/**
 * @param {string} s
 * @return {string[]}
 */
var findRepeatedDnaSequences = function(s) {
    let t = new Set()
    let len = s.length
    let ans = []
    for(let i = 0; i < len; i++) {
        let l = s.slice(i, i + 10)
        if(t.has(l)) ans.push(l)
        else t.add(l)
    }
    return [...new Set(ans)]
};
```
#### 比特位计数
```javascript
/**
 * @param {number} num
 * @return {number[]}
 */
var countBits = function(num) {
    let ans = []
    // 解法一
    for(let i = 0; i <= num; i++) {
        let k = i
        ans[i] = 0
        while(k) {
            k &= (k - 1)
            ans[i]++
        }
    }
    // 解法二
    ans[0] = 0
    for(let i = 1; i <= num; i++) {
        ans[i] = ans[i >> 1] + (i % 2)
    }
    return ans
};
```
#### UTF-8 编码验证
```javascript
/**
 * @param {number[]} data
 * @return {boolean}
 */
var validUtf8 = function(data) {
    const one = 0
    const two = (1 << 7) + (1 << 6)
    const three = (1 << 5) + two
    const four = (1 << 4) + three
    const ch_one = (1 << 7)
    const ch_two = three
    const ch_three = four
    const ch_four = four + (1 << 3)
    let len = data.length
    function check(cur, step) {
        if(cur + step > len) return false
        for(let i = 0; i < step && cur + i < len; i++) {
            if((data[cur + i] & two) !== 128) return false
        }
        return true
    }
    for(let i = 0; i < len;) {
        if((ch_one & data[i]) === one) {
            i++
        }else if((ch_two & data[i]) === two) {
            if(check(i + 1, 1)) i += 2
            else return false
        }else if((ch_three & data[i]) === three) {
            if(check(i + 1, 2)) i += 3
            else return false
        }else if((ch_four & data[i]) === four) {
            if(check(i + 1, 3)) i += 4
            else return false
        }else {
            return false
        }
    }
    return true
};
```
#### 数字范围按位与
```javascript
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var rangeBitwiseAnd = function(m, n) {
    let ans = 0
    for(let i = 30; i >= 0; i--) {
        let t = 1 << i
        if((t & n) ^ (m & t)) break
        else ans += (m & t)
    }
    return ans
};
```
#### 汉明距离
```javascript
/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function(x, y) {
    let ans = 0
    x = x ^ y
    while(x) {
        x &= (x - 1)
        ans++
    }
    return ans
};
```
#### 汉明距离总和
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var totalHammingDistance = function(nums) {
    let len = nums.length
    let ans = 0
    for(let i = 0; i < 31; i++) {
        let k = 1 << i
        let s = 0
        for(let j = 0; j < len; j++) {
            if(k & nums[j]) s++
        }
        ans += (len - s) * s
    }
    return ans
};
```
#### 数组中两个数的最大异或值
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaximumXOR = function(nums) {
    function Node(val) {
        this.val = val
        this.next = [null, null]
    }
    let len = nums.length
    function build(root, n) {
        let flag = 0
        for(let i = 31; i >= 0; i--) {
            let k = 1 << i
            if(k & n) {
                flag |= k
                if(!root.next[1]) root.next[1] = new Node(flag)
                root = root.next[1]
            }else {
                if(!root.next[0]) root.next[0] = new Node(flag)
                root = root.next[0]
            }
        }
    }
    function solve(root, n) {
        let flag = 0
        for(let i = 31; i >= 0; i--) {
            let k = 1 << i
            if(k & n) {
                if(root.next[0]) {
                    flag |= k
                    root = root.next[0]
                }
                else root = root.next[1]
                
            }else {
                if(root.next[1]) {
                    flag |= k
                    root = root.next[1]
                }
                else root = root.next[0]
            }
        }
        return flag
    }
    let rt = new Node()
    let ans = 0
    for(let i = 0; i < len; i++) build(rt, nums[i])
    for(let i = 0; i < len; i++) {
        ans = Math.max(ans, solve(rt, nums[i]))
    }
    return ans
};
```
#### 第K个排列
```javascript
/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getPermutation = function(n, t) {
    let k = []
    let ans = ''
    let index = 0
    let p = [1]
    for(let i = 0; i < n; i++) k[i] = i + 1
    for(let i = 1; i < n; i++) p[i] = p[i - 1] * i
    while(n) {
        index = Math.ceil(t / p[n - 1])
        ans += k[index - 1]
        k.splice(index - 1, 1)
        t -= (index - 1) * p[n - 1]
        n--
    }
    return ans
};
```
#### 单词搜索
```javascript
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    let n = board.length
    let m = n > 0 ? board[0].length : 0
    let len = word.length
    let t = []
    let dx = [-1, 0, 1, 0]
    let dy = [0, 1, 0, -1]
    let ans = false
    for(let i = 0; i < n; i++) {
        t[i] = []
        for(let j = 0; j < m; j++)
            t[i][j] = 0
    }
    function dfs(x, y, index) {
         if(index === len) {
             ans = true
             return 
         }
         if(x < 0 || x >= n || y < 0 || y >= m || t[x][y] || ans) return
         if(board[x][y] === word[index]) {
            t[x][y] = 1
            for(let i = 0; i < 4; i++) {
                dfs(x + dx[i], y + dy[i], index + 1)
            }
            t[x][y] = 0
         }
    }
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            if(!ans && board[i][j] === word[0])
                dfs(i, j, 0)
        }
    }
    return ans
};
```
#### 单词搜索2
```javascript
/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(board, words) {
    let n = board.length
    let m = n > 0 ? board[0].length : 0
    let wslen = words.length
    let len = 0
    let word = ''
    let t = []
    let dx = [-1, 0, 1, 0]
    let dy = [0, 1, 0, -1]
    let ans = false
    let res = new Set()
    for(let i = 0; i < n; i++) {
        t[i] = []
        for(let j = 0; j < m; j++)
            t[i][j] = 0
    }
    function dfs(x, y, index) {
         if(index === len) {
             ans = true
             return 
         }
         if(x < 0 || x >= n || y < 0 || y >= m || t[x][y] || ans) return
         if(board[x][y] === word[index]) {
            t[x][y] = 1
            for(let i = 0; i < 4; i++) {
                 dfs(x + dx[i], y + dy[i], index + 1)
            }
            t[x][y] = 0
         }
    }
    function solve() {
        for(let i = 0; i < n; i++) {
            for(let j = 0; j < m; j++) {
                if(!ans && board[i][j] === word[0])
                    dfs(i, j, 0)
                if(ans) return true
            }
        }
        return false
    }
    for(let k = 0; k < wslen; k++) {
        len = words[k].length
        ans = false
        word = words[k]
        if(res.has(word)) continue
        if(solve()) res.add(word)
    }
    
    return [...res]
};
```
### 字母大小写全排列
```javascript
/**
 * @param {string} S
 * @return {string[]}
 */
var letterCasePermutation = function(S) {
    let t = []
    let res = []
    let ans = []
    let len = S.length
    let num = 0
    for(let i = 0; i < len; i++) {
        if((S[i] >= 'a' && S[i] <= 'z') || (S[i] >= 'A' && S[i] <= 'Z')) num++
    }
    function dfs(cur, flag) {
        if(flag) t.push(1)
        else t.push(0)
        if(cur === num - 1) {
            res.push(t.join(''))
            t.pop()
            return
        }
        dfs(cur + 1, true)
        dfs(cur + 1, false)
        t.pop()
    }
    num && dfs(0, true)
    num && dfs(0, false)
    // console.log(res)
    for(let i = 0; i < res.length; i++) {
        let word = res[i]
        let p = ''
        let ind = 0
        for(let j = 0; j < len; j++) {
            if((S[j] >= 'a' && S[j] <= 'z') || (S[j] >= 'A' && S[j] <= 'Z')) {
                if(word[ind] === '1') p += S[j].toUpperCase()
                else p += S[j].toLowerCase()
                ind++
            }else p += S[j] 
        }
        ans.push(p)
    }
    !num && ans.push(S)
    // console.log(ans)
    return ans
};
```
#### 二叉树的锯齿形层次遍历
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
    let p = []
    let t = [root]
    let flag = true
    let ans = []
    while(t.length) {
         p = [].concat(t)
         t = []
         let q = []
         while(p.length) {
             let temp
             temp = p.pop()
             if(temp) {
                 if(flag) {
                    t.push(temp.left)
                    t.push(temp.right)
                 }else {
                    t.push(temp.right)
                    t.push(temp.left)
                 }
                 q.push(temp.val)
             }
        }
        q.length > 0 && ans.push(q)
        flag = !flag
    }
   return ans
```
#### 复原ip地址
```javascript
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
    let len = s.length
    let ans = []
    let res = []
    function dfs(cur, sum) {
        if(sum === 4 && cur === len) {
            res.push(ans.join('.'))
            return
        }
        if(sum >= 4 || cur >= len) return
        for(let i = 0; i < 3 && i + cur < len; i++) {
            let n = Number(s.slice(cur, i + cur + 1))
            if((n < 256 && n > 0 && n.toString().length === i + 1) || (n === 0 && i === 0)) {
                ans.push(n)
                dfs(cur + i + 1, sum + 1)
                ans.pop()
            }
        }
    }
    dfs(0, 0)
    return [...new Set(res)]
};
```
#### 分割回文串
```javascript
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
    let res = []
    let len = s.length
    let ans = []
    function solve(p) {
        let l = p.length
        let mid = l << 1
        for(let i = 0; i < mid; i++) {
            if(p[i] !== p[l - i - 1]) return false
        }
        return true
    }
    function dfs(cur) {
        if(cur === len) {
            ans.push(res.join(','))
        }
        for(let i = 0; i + cur < len; i++) {
            let p = s.slice(cur, cur + i + 1)
            if(solve(p)) {
                res.push(p)
                dfs(cur + i + 1)
                res.pop()
            }
        }
    }
    dfs(0)
    let final = [...new Set(ans)]
    return final.map(item => item.split(','))
    
};
```
#### 删除链表的倒数第N个节点
```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    let ans = head
    let t = null
    let index = 1
    while(head) {
        if(index === n + 1) {
            t = ans
        }else if(index > n + 1) {
            t = t.next
        }
        head = head.next
        index++
    }
    if(t) {
        let p = t.next
        if(p) t.next = p.next
    }else {
        ans = ans.next
    }
   
    return ans
};
```
#### 删除链表中重复元素2
```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    let pre = null
    let ans = null
    function find(rt, val) {
        while(rt) {
            if(rt.val !== val) return rt
            rt = rt.next
        }
        return rt
    }
    while(head) {
        let next = head.next
        if(next && next.val === head.val) {
            head = find(head, head.val)
            if(pre) {
                pre.next = head
            }
        }else {
            if(!ans) ans = head
            pre = head
            head = head.next
        }
    }
    return ans
};
```
#### 字符串的排列
```javascript
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
    let len1 = s1.length
    let len2 = s2.length
    let tmp = {}
    let p = {}
    let str = 'abcdefghijklmnopqrstuvwxyz'
    function check() {
        for(let i = 0; i < 26; i++) {
           if(tmp[str[i]] !== p[str[i]]) return false
        }
        return true
    }
    for(let i = 0; i < 26; i++) {
       tmp[str[i]] = 0
       p[str[i]] = 0
    }
    for(let i = 0; i < len1; i++) tmp[s1[i]]++
    for(let i = 0; i < len2 && i < len1; i++) p[s2[i]]++
    if(check()) return true
    let pre = 0
    for(let i = len1; i < len2; i++) {
        p[s2[pre]]--
        p[s2[i]]++
        if(check()) return true
        pre++
    }
    return false
};
```
#### 环形链表
```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
    let slow = head
    let fast = head
    let len = 0
    let flag = false
    // 快慢指针找环
    while(fast && fast.next) {
        slow = slow.next
        fast = fast.next.next
        if(slow === fast) {
            flag = true
            break
        }
    }
    if(flag) {
        // 计算环的长度
        while(slow) {
            len++
            slow = slow.next
            if(slow === fast) break
        }
        let k = head
        // 提前走len环长
        while(head && len) {
            len--
            head = head.next
        }
        while(head !== k) {
            head = head.next
            k = k.next
        }
    }
    return flag ? head : null
};
```
#### 寻找重复数
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
    let len = nums.length
    let mid
    let start = 1
    let end = len - 1
    while(start < end) {
        let num = 0
        mid = (start + end) >> 1
        for(let i = 0; i < len; i++) {
            if(nums[i] <= mid) num++
        }
        if(num > mid) {
            end = mid
        }else {
            start = mid + 1
        }
    }
    return start
};
```
#### 乘积小于K 的子数组
```javascript
// 思路：维护一个滑动数组 end尽可能的往右移，当end不能右移时，考虑移动start。初始化 start end = 0，end 每右移一步，他对ans的贡献值就是当前数组的长度。
//举例：[1,2] => [1,2,3] 时3对当前结果的贡献值实际就是以3结尾的子数组的个数：[1,2,3] [2,3] [3]
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanK = function(nums, k) {
    let start = 0
    let end = 0
    let count = 1
    let ans = 0
    let len = nums.length
    while(end < len) {
        let p = count * nums[end]
        if(nums[end] >= k) {
            start = ++end
            continue
        }
        if(p >= k) {
            count /= nums[start]
            start++
        }else {
            count = p
            ans += (end - start + 1)
            end++
        }
    }
    return ans
};
```
#### 长度最小的子数组
```javascript
/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(s, nums) {
   let start = 0
   let end = 0
   let count = 0
   let ans = 1 << 30
   let len = nums.length
   while(end < len) {
       while(count < s && end < len) {
           count += nums[end]
           end++
       }
       if(count >= s) ans = Math.min(ans, end - start)
       while(count >= s) {
           count -= nums[start]
           ans = Math.min(ans, end - start)
           start++
       }
   }
    return ans === (1 << 30) ? 0 : ans
};
```
#### 数组中的最长山脉
```javascript
/**
 * @param {number[]} A
 * @return {number}
 */
var longestMountain = function(A) {
    let len = A.length
    let start = 0
    let p = 0
    let ans = 0
    while(start < len) {
        p = start
        let fb = false
        let fa = false
        while(A[p] < A[p + 1] && p + 1 < len) {
            p++
            fa = true
        }
        while(A[p] > A[p + 1] && p + 1 < len) {
            p++
            fb = true
        }
        if(p - start >= 2 && fa && fb) {
            ans = Math.max(ans, p - start + 1)
        }
        if(p - start < 1) start = p + 1
        else start = p
    }
    return ans
};
```