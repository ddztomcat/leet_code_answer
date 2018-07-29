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