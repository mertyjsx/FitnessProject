export function convertToSenteneCase(word) {
	var result = word.replace(/([A-Z])/g, " $1");
	var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
	return finalResult
}