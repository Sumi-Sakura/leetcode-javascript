// 将字符串转换为数字
const toNumber = (str) => {
	return parseInt(str)
}

// 处理时间字符串并返回全为数字的数组
const timeStrToTimeArr = (str) => {
	let timeNumArr = []
	// 分割数组并循环
	str.split('').forEach((item) => {
		// 去掉冒号
		if (item !== ':') {
			// 将数组内的数字字符都转换为数字类型
			timeNumArr.push(toNumber(item))
		}
	})
	return timeNumArr
}

// 处理包含所有时间数字的数组，返回一个经过去重排序处理的数组
const sortOutTimeArr = (arr) => {
	let allNumArr = []
	// 对数组去重并从小到大排序
	allNumArr = Array.from(new Set(arr)).sort((a, b) => {
		return a > b
	})
	return allNumArr
}

// 校验时间的准确性
const timeValidate = (arr) => {
	// 小时的第一个数字不能大于 2
	if (arr[0] > 2) {
		return false
	}
	// 小时的第一个数字为 2 时，第二个数字不能大于 3
	if (arr[0] === 2 && arr[1] > 3) {
		return false
	}
	// 分钟的第三个数字不能大于 5
	if (arr[2] > 5) {
		return false
	}
	return true
}

// 将数字数组添加冒号后转换为字符串输出
const timeArrToTimeStr = (arr) => {
	let timeArr = [...arr]
	timeArr.splice(2, 0, ':')
	let timeStr = timeArr.join('')
	return timeStr
}

const nextClosestTime = (time) => {
	let closestTimeArr = timeStrToTimeArr(time)
	let allNumArr = sortOutTimeArr(closestTimeArr)
	let minNum = 0
	// 总共 4 个数字，且需要从最后一位开始寻找最接近且在该时间之后的时间
	let index = 3
	// 最小值为排序后的数组中 index 为 0 的值
	minNum = allNumArr[0]
	while(index >= -1) {
		// 找到当前数字在存有所有数字中的数组中的索引值，+1 以后就是最接近的数字的索引值
		let closestIndex = allNumArr.indexOf(closestTimeArr[index]) + 1
		// 最近且大于当前数字的数字
		let closestNum = allNumArr[closestIndex]
		// 如果索引值大于 -1 则说明并没有循环完整个数字
		if (index > -1) {
			// 如果不为最后一位
			if (closestTimeArr[index + 1]) {
				// 则将它的后一位数字置为最小值
				closestTimeArr[index + 1] = minNum
			}
			// 如果最接近的数字存在
			if (closestNum) {
				// 则将当前位置赋值为最接近的数字
				closestTimeArr[index] = closestNum
				// 并对时间的合法性进行校验
				if (timeValidate(closestTimeArr)) {
					// 如果校验通过则返回最接近的时间
					return timeArrToTimeStr(closestTimeArr)
				}
			}
		// 循环完整个数组都没有找到合适的时间则返回全为最小值的时间
		} else {
			// 后面三位已经在循环中被置为最小值，所以这里只需要将首位置为最小值即可
			closestTimeArr[0] = minNum
			return timeArrToTimeStr(closestTimeArr)
		}
		index--
	}
}
console.log(nextClosestTime('23:49'))