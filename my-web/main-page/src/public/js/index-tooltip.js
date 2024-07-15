const computePosition = window.FloatingUIDOM.computePosition;
const flip = window.FloatingUIDOM.flip;
const shift = window.FloatingUIDOM.shift;

const moreTechsAll = document.querySelectorAll(".more-techs");

function placeTooltip() {
	for (let index = 1; index <= moreTechsAll.length; index++) {
		let moreTechs = document.querySelector(".more-techs.mt-" + index);
		let tooltip = document.querySelector(".more-techs-tooltip.mt-" + index);

		computePosition(moreTechs, tooltip, {
			placement: "bottom",
			middleware: [flip(), shift()],
		}).then(({ x, y }) => {
			//when @media screen and (max-width: 750px), dont use left
			if (window.innerWidth < 750) {
				Object.assign(tooltip.style, {
					top: `${y}px`,
					left: "0px",
					"min-width": "100%",
				});
				return;
			}

			Object.assign(tooltip.style, {
				left: `${x}px`,
				top: `${y}px`,
				"min-width": "300px",
			});
		});
	}
}

//with interval:
window.addEventListener("scroll", placeTooltip);

window.addEventListener("resize", placeTooltip);

placeTooltip();
