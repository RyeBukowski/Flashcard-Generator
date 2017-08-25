var inquirer = require("inquirer");
var fs = require("fs");




var ClozeCard = function(text, cloze) {
	this.cloze = cloze;
	this.fullText = text;
	this.partial = text.replace(cloze, "...");

	

};

function makeAcard() {
	inquirer.prompt([
		{
			name:"Action",
			message:"What flashcard would you like?",
			choices: ["Cloze Flashcard", "Basic Flashcard", "Start Studying"]
		}]).then(function(response) {
		if(response.Action === "Cloze Flashcard") {
			clozeMaker();
		}
		else if (response.Action === "Basic Flashcard") {
			basicMaker();
		}

		else {

		}
	});
}

makeAcard();

function clozeMaker() {
	return inquirer.prompt([
		{
			name: "fulltext",
			message: "Enter the full text",
			type: "input",

			name: "cloze",
			message: "What should be omitted from the text?",
			type: "input",

		}]).then(function(response) {
			newCloCard = new ClozeCard(response.fulltext, response.cloze, response.partial);
			//console.log(newCloCard);

			fs.appendFile("cards.txt", JSON.stringify(newCloCard) + '\n', function(err) {
				if(err) {
					console.log(err);
				}
			});

			inquire.prompt([
				{
					name: "startagain",
					message: "Make another cloze? (Yes or No)",
					type: "input",
				}]).then(function(response) {
					if(response.startagain === "Yes") {
						clozeMaker();
					}
					else {
						makeAcard();
					}
				});
	});
}

/*var firstPresidentCloze = new ClozeCard(
    "George Washington was the first president of the United States.", "the first president");

console.log(firstPresidentCloze.cloze); 
console.log(firstPresidentCloze.partial); 
console.log(firstPresidentCloze.fullText);
var brokenCloze = new ClozeCard("This doesn't work", "oops");
*/

var flashCard = function(front, back) {
	this.front = front;
	this.back = back;
}

function basicMaker() {
	return inquirer.prompt([
		{
			name:"frontCard",
			message: "What info goes on the front?",
			type: "input",

			name:"backCard",
			message: "What info goes on the back?",
			type: "input"
		}]).then(function(response) {
			newBasCard = new flashCard(response.frontCard, response.backCard);

			fs.appendFile("cards.txt", JSON.stringify(newBasCard) + '\n', function(err) {
				if(err) {
					console.log(err);
				}
			});

			inquire.prompt([
				{
					name: "startagain",
					message: "Make another flashcard? (Yes or No)",
					type: "input",
				}]).then(function(response) {
					if(response.startagain === "Yes") {
						basicMaker();
					}
					else {
						makeAcard();
					}
				});
	});
}













module.exports = BasicCard;
module.exports = ClozeCard;