function say(word){
	console.log(word)
}

function execute(func, value){
	func(value)
}

execute(say,'Hello World!')