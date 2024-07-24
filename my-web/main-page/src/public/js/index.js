import * as THREE from "three";

var introMenu = document.getElementById("intro-menu");
var headerMenu = document.getElementById("header-menu");
var dropdownMenu = document.getElementById("dropdown-menu");

const canvas = document.querySelector("#bg");

//Container of the objects, camera and lights
const scene = new THREE.Scene();

//Perspective camera is like a human view. (grados o campo de vision, proporción dependiendo de la pantalla del usuario, profundidad desde, profundidad hasta)
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

//rederiza los graficos a la escena.
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});

//Cantidad de pixeles del dispositivo
renderer.setPixelRatio(window.devicePixelRatio);

//tamaño de la pantalla
renderer.setSize(window.innerWidth, window.innerHeight);

const sphere_geometry = new THREE.SphereGeometry(0.1);
const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

for (let i = 0; i < 1000; i++) {
	const sphere = new THREE.Mesh(sphere_geometry, material);

	// Random positions between -25 and 25
	const x = Math.random() * 100 - 50;
	const y = Math.random() * 100 - 50;
	const z = Math.random() * 100 - 50;

	sphere.position.set(x, y, z);
	scene.add(sphere);
}

//lights everything equaly
const ambienLight = new THREE.AmbientLight(0xffffff);

scene.add(ambienLight);

//size of the camera and renderer depending on the size of the screen.
window.addEventListener(
	"resize",
	() => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
		showJobLine();
	},
	false
);

var rotationAmount = 0.006; // Increase the rotation speed
var targetRotation = camera.rotation.x;
var lastScrollY = 0;

function handleScrollCamera() {
	if (window.scrollY > lastScrollY) {
		targetRotation -= rotationAmount;
	} else {
		targetRotation += rotationAmount;
	}
	lastScrollY = window.scrollY;
}

function animate() {
	requestAnimationFrame(animate);
	camera.rotation.x += (targetRotation - camera.rotation.x) * 0.1; // Smooth scrolling effect
	renderer.render(scene, camera);
}

animate();
showJobLine();
showHeader();

window.addEventListener("scroll", () => {
	showJobLine();
	handleScrollCamera();
	showHeader();
});

function showHeader() {
	if (isScrolledIntoView(introMenu)) {
		headerMenu.style.visibility = "hidden";
		dropdownMenu.style.visibility = "hidden";
	} else {
		headerMenu.style.visibility = "visible";
	}
}

/* if is not on screen */
function isScrolledIntoView(elem) {
	var docViewTop = window.scrollY;
	var docViewBottom = docViewTop + window.innerHeight;

	var elemTop = elem.offsetTop;
	var elemBottom = elemTop + elem.offsetHeight;

	return elemBottom <= docViewBottom && elemTop >= docViewTop;
}

/*document.getElementById("img-menu").addEventListener("mouseover", (element) => {
	element.target.src = "/img/menu-black.svg";
});

document.getElementById("img-menu").addEventListener("mouseout", (element) => {
	element.target.src = "/img/menu-white.svg";
});*/

//On click menu-dropdown-icon change visibility of the menu
document.getElementById("dropdown-menu-icon").addEventListener("click", () => {
	if (dropdownMenu.style.visibility === "visible") {
		dropdownMenu.style.visibility = "hidden";
	} else {
		dropdownMenu.style.visibility = "visible";
	}
});

//On @media screen and (max-width: 540px) change visibility of the menu
window.addEventListener("resize", () => {
	if (window.innerWidth > 540) {
		dropdownMenu.style.visibility = "hidden";
	}
});

function showJobLine() {
	const canvas = document.getElementById("line");
	const ctx = canvas.getContext("2d");

	// Ajusta el tamaño del canvas para que cubra toda la ventana
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	let dots = document.querySelectorAll("[id^=dot-]");

	// Dibuja la línea
	ctx.beginPath();

	const dot1 = document.getElementById("dot-1");
	const center1 = getCenter(dot1);

	ctx.moveTo(center1.x, center1.y);

	for (let i = 1; i < dots.length; i++) {
		const dot = dots[i];
		const center = getCenter(dot);
		ctx.lineTo(center.x, center.y);
	}

	ctx.strokeStyle = "#C2D9FF"; // color de la línea
	ctx.lineWidth = 4; // grosor de la línea
	ctx.stroke();

	// Función para obtener el centro de un elemento
	function getCenter(element) {
		const rect = element.getBoundingClientRect();
		return {
			x: rect.left + rect.width / 2,
			y: rect.top + rect.height / 2,
		};
	}
}

document.querySelectorAll(".dropdown-menu a").forEach((e) => {
	e.addEventListener("click", (e) => {
		//set invisible the dropdown menu
		dropdownMenu.style.visibility = "hidden";
	});
});

function sendingContactData(sending) {
	let button = document.getElementById("submit-form");
	button.disabled = sending;

	if (sending) {
		button.innerHTML =
			'<svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100" height="100" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve"> <path fill="#5e76ff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"> <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite" /> </path> </svg>';
	} else button.innerHTML = "Send";
}

document
	.getElementById("contact-form")
	.addEventListener("submit", function (e) {
		e.preventDefault();

		sendingContactData(true);

		grecaptcha.ready(function () {
			grecaptcha
				.execute(RECAPTCHA_SITE_KEY, {
					action: "submit",
				})
				.then(function (token) {
					// Collect form data
					const form = document.getElementById("contact-form");
					const formData = new URLSearchParams(new FormData(form));
					formData.append("g-recaptcha-response", token);

					// Send form data to the server via fetch API
					fetch("/contact", {
						method: "POST",
						headers: {
							"Content-Type": "application/x-www-form-urlencoded",
							Accept: "application/json",
						},
						body: formData.toString(),
					})
						.then((response) => {
							if (response.ok) {
								return response.text();
							}

							throw new Error("Something went wrong.");
						})
						.then((data) => {
							sendingContactData(false);
							alert("Thank you for your message!");
						})
						.catch((error) => {
							console.error("Error:", error);
							sendingContactData(false);
							alert("Sorry, something went wrong. D:");
						});
				});
		});
	});
