// 将字符串转换为数字
const toNumber = (str) => {
	return parseInt(str)
}

// 处理时间字符串并返回全为数字的数组
const timeStrToTimeArr = (str) => {
	let timeNumArr = []
	str.split('').forEach((item) => {
		if (item !== ':') timeNumArr.push(toNumber(item))
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

const timeValidate = (arr) => {
	if (arr[0] > 2) {
		return false
	}
	if (arr[0] === 2 && arr[1] > 4) {
		return false
	}
	if (arr[2] > 5) {
		return false
	}
	return true
}

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
	let index = 3
	// 最小值为排序后的数组中 index 为 0 的值
	minNum = allNumArr[0]
	while(index >= -1) {
		let closestIndex = allNumArr.indexOf(closestTimeArr[index])
		let closestNum = allNumArr[closestIndex + 1]
		if (index > -1) {
			if (closestTimeArr[index + 1]) {
				closestTimeArr[index + 1] = minNum
			}
			if (closestNum) {
				closestTimeArr[index] = closestNum
				if (timeValidate(closestTimeArr)) {
					// return timeArrToTimeStr(closestTimeArr)
					return timeArrToTimeStr(closestTimeArr)
				}
			}
		} else {
			closestTimeArr[0] = minNum
			// return timeArrToTimeStr(closestTimeArr)
			return timeArrToTimeStr(closestTimeArr)
		}
		index--
	}
}
console.log(nextClosestTime('19:29'))