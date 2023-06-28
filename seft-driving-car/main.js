carCanvas.height = window.innerHeight;
carCanvas.width = 200;
networkCanvas.height = window.innerHeight;
networkCanvas.width = 800;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");
const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
const N = 200;
const cars = generateCars(N);
const traffic = [
    new Car(100, -100, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(2), -300, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(0), -500, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(1), -500, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(1), -700, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(2), -700, 30, 50, "DUMMY", 2, getRandomColor()),
];
let bestCar = cars[0];
if (localStorage.getItem("bestBrain")) {
    for (let i = 0; i < cars.length; i++) {
        cars[i].brain = JSON.parse(
            localStorage.getItem("bestBrain"));
        if (i > 0) {
            NeuralNetwork.mutate(cars[i].brain, 0.05);
        }
    }
}

animate();

function animate() {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update([], []);
    }
    for (let i = 0; i < cars.length; i++) {
        cars[i].update(road.borders, traffic);
    }
    bestCar = cars.find(
        c => c.y == Math.min(
            ...cars.map(c => c.y)
        ));

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);
    road.draw(carCtx);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx);
    }
    carCtx.globalAlpha = 0.2;
    for (let i = 0; i < cars.length; i++) {
        cars[i].draw(carCtx);
    }
    carCtx.globalAlpha = 1;
    bestCar.draw(carCtx, true);

    Visualizer.drawNetwork(networkCtx, bestCar.brain);

    requestAnimationFrame(animate);
}

function generateCars(N) {
    const cars = [];
    //myCar = new Car(road.getLaneCenter(1), 100, 30, 50, "KEYS", 3, "red");
    //myCar.controls.forward = true;
    //myCar.controls.backward = false;

    //cars.push(myCar);

    for (let i = 1; i <= N; i++) {
        cars.push(new Car(100, 100, 30, 50, "AI"));
    }
    return cars;
}

function save() {
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
    console.log("saved.");
}

function discard() {
    localStorage.removeItem("bestBrain");
    console.log("removed.");
}