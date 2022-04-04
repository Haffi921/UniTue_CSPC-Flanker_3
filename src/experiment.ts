function zip(context_arr: number[], contextA: any[], contextB: any[]): any[] {
	const switcher = [contextA, contextB];
	const zipped = [];

	for (const i of context_arr) zipped.push(switcher[i].shift());

	return zipped;
}