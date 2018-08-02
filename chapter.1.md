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
            console.log('add', ans);
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