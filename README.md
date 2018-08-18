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
