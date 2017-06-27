/**
 *  使用贝格尔排列法获取比赛对阵表
 *  @param {number} num - 比赛队伍数量
 *  @return {array} - 表示比赛对阵表的三维数组
 */
const bergerMethod = num => {
	// 格式不满足时抛出错误
	if(typeof num !== 'number' || num < 2) throw new Error('输入非数字或小于2');
	
	// 初始化结果数组和比赛轮数
	let resArr = [],
		times = num - 1;

	// 初始化第一轮数组
	let arr = Array.from({length: num}).map((v, i) => i + 1);
	resArr[0] = arr;
	// 如果队伍数量是单数则将0添加，凑成双数,并且将轮数增1
	if(num%2) {
		arr[num] = 0;
		times++;
	}

	// 求得各个位置的数字需要逆时针移动的步数
	let step = (num-1)/2|0;

	let round = 2;
	do{
		let curArr = [],
			lastArr = resArr[resArr.length - 1];

		// 将第一轮右上角的编号(“0”或最大的一个代号数)移动
		if(round%2) {
			curArr[times] = lastArr[0];
		} else {
			curArr[0] = lastArr[times];
		}

		var len = lastArr.length;
		for(let idx = 0; idx < len; idx++) {
			if(lastArr[idx] === 0 || lastArr[idx] === len) continue;
			// 逆时针移动数字
			curArr[(idx>=len-round%2-step ? idx+4 : idx+3)%len] = lastArr[idx]
		}

		resArr.push(curArr);

		round++;
	} while(round <= times)

	// 将数组中的循环数组映射为对赛数组
	resArr = resArr.map(v => {
		var arr = [],
		    len = v.length;
		for(let i = 0; i < len/2; i++) {
			arr.push([v[i], v[len-i-1]]);
		}
		return arr;
	});

	return resArr;
}


export default bergerMehod;