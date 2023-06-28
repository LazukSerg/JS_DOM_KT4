const form = document.forms.bank;

const logoDiv = document.getElementById('logo')
const numberDiv = document.getElementById('number')
const cardholderDiv = document.getElementById('cardholder')
const dateDiv = document.getElementById('date')
const systemDiv = document.getElementById('system')

let table = document.getElementById('table')

const num = "0000000000000000"
const date = "0000"

form.addEventListener("input", function(e) {
	e.preventDefault()
	viewLogo()
	viewSystem()
	viewNumber()
	viewCardholder()
	viewDate()
});

form.addEventListener("submit", function(e) {
	e.preventDefault()
	for(let i = 0; i < form.elements.length - 1; i++) {
		if(form.elements[i].value.length == 0) {
				return
		}
	}
	var tBody = table.getElementsByTagName('tbody')[0]
	let tr = document.createElement("tr")
	for(let k = 0; k < 5; k++) {
		let td = document.createElement("td")
		if(k == 4) {
			let value = form.elements[k].value
			let result = ""
			for(let i = 0; i < value.length; i++) {
				result += value.charAt(i)
				if(i == 1) {
					result += "/"
				}
			}
			td.innerHTML = result
		} else {
			td.innerHTML = form.elements[k].value
		}
		tr.append(td)
	}
	tBody.append(tr)
	form.reset()
	clearDiv()
})

window.addEventListener('unload', function(event) {
	form.reset()
})

function clearDiv() {
	logoDiv.style.cssText += ' background-image: none'
	numberDiv.innerHTML = "0000_0000_0000_0000"
	cardholderDiv.innerHTML = "CARDHOLDER"
	dateDiv.innerHTML = "00/00"
	systemDiv.style.cssText += ' background-image: none'
}

function viewLogo() {
	let input = form.firstElementChild
	let lowerInput = input.value.toLowerCase()
	if (lowerInput == 'тинькофф') {
		logoDiv.style.cssText += ' background-image: url("tinkoff.svg")'
	} else if (lowerInput == 'втб') {
		logoDiv.style.cssText += ' background-image: url("vtb.png")'
	} else {
		logoDiv.style.cssText += ' background-image: none'
	}
}

function viewSystem() {
	let input = form.elements[1]
	let lowerInput = input.value.toLowerCase()
	if (lowerInput == 'visa') {
		systemDiv.style.cssText += ' background-image: url("visa.png")'
	} else if (lowerInput == 'mastercard') {
		systemDiv.style.cssText += ' background-image: url("mastercard.png")'
	} else {
		systemDiv.style.cssText += ' background-image: none'
	}
}

function viewNumber() {
	let input = form.elements[2]
	let numberInput = input.value
	let numberWithZeros = numberInput + num.substring(numberInput.length)
	let result = ""
	for (let i = 0; i < numberWithZeros.length; i = i + 4) {
		result += numberWithZeros.substring(i, i + 4);
		if(i < 12) {
			result += "_"
		}
	} 
	numberDiv.innerText = result
}

function viewCardholder() {
	let input = form.elements[3]
	let result = input.value
	if(result.length == 0) {
		result = "CARDHOLDER"
	}
	cardholderDiv.innerText = result.toUpperCase()
}

function viewDate() {
	let input = form.elements[4]
	let dateInput = input.value
	let dateWithZeros = dateInput + date.substring(dateInput.length)
	let result = ""
	for(let i = 0; i < dateWithZeros.length; i++) {
		result += dateWithZeros.charAt(i)
		if(i == 1) {
			result += "/"
		}
	}
	dateDiv.innerText = result
}

function checkOnlyNumber(value) {
	return value.replace(/[^0-9]/g, '')
}

