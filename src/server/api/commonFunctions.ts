// Created by trevor on 12/31/16.

export function CheckNumberParameter(input: any): number {
	let result: number = 0;
	if (input) {
		if ((typeof input) == "number")
			result = input;
		else if ((typeof input) == "string")
			result = parseInt(input);

		if (result < 0)
			result = 0;
	}
	return result;
}
