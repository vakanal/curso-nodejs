export const info = (text: string): string => {
	console.info('INFO', text);
	return text;
};

export const error = (text: string): string => {
	console.error('ERROS', text);
	return text;
};
