// What we know...

// To begin with... we have two trains coming from two different locations.  Let's build some default values to play with.

var numberOfTrains = 2;
console.log("The number of trains is " + numberOfTrains + ".");
var numberOfEndpoints = numberOfTrains;

// Also... we assume that these trains are on a rail that leads directly from Detroit to Chicago.  Per distance24.org, this is 382 kilometers (237 miles).

var distanceMeasurementUnit = "miles"; // Could be "kilometers"
var distanceBetweenEndpoints = 237;
console.log("The total distance between endpoints is " + distanceBetweenEndpoints + " " + distanceMeasurementUnit + ".");

// And we are given the speed of the two trains...

var trainSpeed1 = 45;
console.log("Train 1 speed: " + trainSpeed1 + " " + distanceMeasurementUnit + " per hour.");
var trainSpeed2 = 60;
console.log("Train 2 speed: " + trainSpeed2 + " " + distanceMeasurementUnit + " per hour.");

// So if train1 leaves Chicago and train2 leaves Detroit at the same time, at what point do their combined distances equal the total distance?  We'll want to know WHEN it happens, right?

var timeOfCollision;

// So this can be solved using algebra.  If y = distance (miles) and x = time (hours), then we can plug these numbers into some equations.  For the first train, the relationship betwee time and distance is y = trainSpeed1 * x.  For the other it is y = trainSpeed2 * x.  To determine when, together, the two trains will complete the total distance, the algebra breaks down to this:  (trainSpeed1 * x) + (trainSpeed2 * x) = distanceBetweenEndpoints.  Solve for x and you get the total time.  Ultimately this turns out to be distanceBetweenEndpoints / (trainSpeed1 + trainSpeed2).  So...

timeToCollision = distanceBetweenEndpoints / (trainSpeed1 + trainSpeed2);
console.log("The trains will collide after " + timeToCollision + " hours.");

// We're going to have to give the location as a relative distance from the starting points.

console.log("When they collide, the train traveling at a speed of " + trainSpeed1 + " will have traveled " + (trainSpeed1 * timeToCollision) + " " + distanceMeasurementUnit + ".  The train traveling at a speed of " + trainSpeed2 + " will have traveled " + (trainSpeed2 * timeToCollision) + " " + distanceMeasurementUnit + ".");
console.log("-------------------------------");

// Well, that was fun in the console.  So now let's build a function that can be accessed from our HTML.  

// We're using a "submit" button in a form to acquire our data, so first we'll stop the webpage from refreshing upon submit.  We will add an event listener on the form, forcing it to prevent its default behavior:

const userForm = document.getElementById("userForm");

function handleForm(event) { 
	event.preventDefault(); 
} 

userForm.addEventListener('submit', handleForm);

// Then we'll build a function that will be called when the form is submitted.

function trainCollision() {

	// First let's capture our user data.  We'll just recycle all of the variable declared earlier but re-declare them in order to make this a potential stand-alone function.  Annoyingly, any number being passed in via "value" will be a string, so we'll need to parse it back into a number for computational purposes.

	const trainSpeed1 = parseFloat(document.getElementById("trainSpeed1").value);
	const trainSpeed2 = parseFloat(document.getElementById("trainSpeed2").value);
	const distanceBetweenEndpoints = parseFloat(document.getElementById("distanceBetweenEndpoints").value);
	const distanceMeasurementUnit = document.getElementById("distanceMeasurementUnit").value;
	const cityName1 = document.getElementById("cityName1").value;
	const cityName2 = document.getElementById("cityName2").value;

	// We'll then make sure we captured our data correctly.

	console.log("Train 1 speed: " + trainSpeed1 + " " + distanceMeasurementUnit + " per hour.");
	console.log("Train 2 speed: " + trainSpeed2 + " " + distanceMeasurementUnit + " per hour.");
	console.log("The total distance between " + cityName1 + " and " + cityName2 + " is " + distanceBetweenEndpoints + " " + distanceMeasurementUnit + ".");

	// Now we'll do the math and place the solution in the DOM.

	const timeToCollision = distanceBetweenEndpoints / (trainSpeed1 + trainSpeed2);
	const trainDistanceTraveled1 = trainSpeed1 * timeToCollision;
	const trainDistanceTraveled2 = trainSpeed2 * timeToCollision;

	// Adding toFixed(2) in order to shorten to two decimal places...

	const collisionResult = "With two trains simultaneously leaving " + cityName1 + " and " + cityName2 + " at a distance of " + distanceBetweenEndpoints + " " + distanceMeasurementUnit + ", the trains will collide in " + timeToCollision.toFixed(2) + " hours.  The train leaving " + cityName1 + " will have traveled " + trainDistanceTraveled1.toFixed(2) + " " + distanceMeasurementUnit + ".  The train leaving " + cityName2 + " will have traveled " + trainDistanceTraveled2.toFixed(2) + " " + distanceMeasurementUnit + ".";

	// Check the result text in the console...

	console.log(collisionResult);

	// ... and toss it into the DOM.

	resultText = document.getElementById("resultText");
	resultText.innerHTML = collisionResult;
	resultText.className = "visible";

} 

// Remove result text when form is reset...

function resetForm() {

	resultText = document.getElementById("resultText");
	resultText.innerHTML = "";
	resultText.className = "hidden";

}

