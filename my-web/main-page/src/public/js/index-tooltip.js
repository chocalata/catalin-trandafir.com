const computePosition = window.FloatingUIDOM.computePosition;
const flip = window.FloatingUIDOM.flip;
const shift = window.FloatingUIDOM.shift;

const moreTechsAll = document.querySelectorAll(".more-techs");

function placeTooltip() {
	for (let index = 0; index <= moreTechsAll.length; index++) {
		// About me tooltip
		let aboutMeMoreTechs = document.querySelector(
			".more-techs.am-mt-" + index
		);
		let aboutMeTooltip = document.querySelector(
			".more-techs-tooltip.am-mt-" + index
		);

		if (aboutMeMoreTechs && aboutMeTooltip) {
			computePosition(aboutMeMoreTechs, aboutMeTooltip, {
				placement: "bottom",
				middleware: [flip(), shift()],
			}).then(({ x, y }) => {
				//when @media screen and (max-width: 750px), dont use left
				if (window.innerWidth < 750) {
					Object.assign(aboutMeTooltip.style, {
						top: `${y}px`,
						left: "0px",
						"min-width": "100%",
					});
					return;
				}

				Object.assign(aboutMeTooltip.style, {
					left: `${x}px`,
					top: `${y}px`,
					"min-width": "300px",
				});
			});
		}

		// Project tooltip
		let projectMoreTechs = document.querySelector(
			".more-techs.pr-mt-" + index
		);
		let projectTooltip = document.querySelector(
			".more-techs-tooltip.pr-mt-" + index
		);

		if (projectMoreTechs && projectTooltip) {
			computePosition(projectMoreTechs, projectTooltip, {
				placement: "bottom",
				middleware: [flip(), shift()],
			}).then(({ x, y }) => {
				//when @media screen and (max-width: 750px), dont use left
				if (window.innerWidth < 750) {
					Object.assign(projectTooltip.style, {
						top: `${y}px`,
						left: "0px",
						"min-width": "100%",
					});
					return;
				}

				Object.assign(projectTooltip.style, {
					left: `${x}px`,
					top: `${y}px`,
					"min-width": "300px",
				});
			});
		}
	}
}

//with interval:
window.addEventListener("scroll", placeTooltip);

window.addEventListener("resize", placeTooltip);

placeTooltip();
