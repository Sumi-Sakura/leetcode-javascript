# 681. Next Closest Time

Given a time represented in the format "HH:MM", form the next closest time by reusing the current digits. There is no limit on how many times a digit can be reused.

You may assume the given input string is always valid. For example, "01:34", "12:09" are all valid. "1:34", "12:9" are all invalid.

## Example 1:
    Input: "19:34"
    Output: "19:39"
    Explanation: The next closest time choosing from digits 1, 9, 3, 4, is 19:39, which occurs 5 minutes later.  It is not 19:33, because this occurs 23 hours and 59 minutes later.

## Example 2:
    Input: "23:59"
    Output: "22:22"
    Explanation: The next closest time choosing from digits 2, 3, 5, 9, is 22:22. It may be assumed that the returned time is next day's time since it is smaller than the input time numerically.

## 简译
给你一个时间字符串，需要返回距离该近且在该时间之后的时间，且返回的时间内的数字要为原字符串所拥有的数字

## 思路
1.	假设传入的时间为 `ab:cd` ，那么需要找到最近的时间，最开始肯定要从 `d` 开始改变，如果 `a`、`b`、`c` 中存在比 `d` 大的值，那么直接将这个值赋值给 `d` 即可

2.	如果不存在比 `d` 大的值，那么就要去找比 `c` 大的值并去替换 `c`，这时需要注意两点
	-	如果存在某个值比 `c` 大，替换后，时间是需要合法的，因为 `c` 不能大于 5
	-	如果存在某个值比 `c` 大，替换后，`d` 也要相应改变，因为 `c` 已经比原有的值要大了，所以最接近的值应该是 `d` 改为`a`、`b`、`c`、`d` 中的最小值

3.	同理，`c` 如果也无法替换，那么要去替换小时的数字，这里需要注意一点
	-	小时的十分位是不能大于 3 的，且当小时时分位为 2 时，小时的个位不能大于 3

4.	当四个值都找不到合适的值（既接近又合法）去替换时，那么只能返回由 4 个最小值拼接而成的时间