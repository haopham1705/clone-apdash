// JavaScript Document
// == Settings ==
const lang = 'EN'; // RU or EN description
const typeCountdown = 'time'; // 'time' to set the countdown to a specific time or 'date' to set the countdown to the designated date

let EndDate = '2021/07/10, 22:00'; // Expiration Date yyyy/mm/dd, hh:mm. Working only if typeCountdown = 'date'

let days = 10; // Number of days before the end. Working only if typeCountdown = 'time'
let timeOut = '00:00'; // 'hh:mm'. Number of hours and minutes before the end. Working only if typeCountdown = 'time'

const ColorDigitEnd = '#bfbfbf';
// == Settings END ==

let hours, minutes, target_date, ExpirationDate;
let formatCountdown = null;
let day_lang = hour_lang = minute_lang = second_lang = '';


function daysLeft(target) {
	if (target > (24 * 60 * 60 * 1000)) { formatCountdown = 'day|hour|minute|second'; }
	else if (target > (60 * 60 * 1000)) { formatCountdown = 'hour|minute|second'; }
	else { formatCountdown = 'minute|second'; }
}

if (typeCountdown === 'time') {
	timeOut = timeOut.split(':');
	hours = timeOut[0];
	minutes = timeOut[1];
	target_date = ((days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60) * 1000);
	
	daysLeft(target_date);
	target_date += new Date().getTime();
} else if (typeCountdown === 'date') {
	ExpirationDate = new Date(EndDate);
	target_date = (ExpirationDate - new Date());
	daysLeft(target_date);
	target_date += new Date().getTime();
}
else {
	target_date = 0;
	formatCountdown = 'day|hour|minute|second';
}

if (lang === 'VI') {
	day_lang = 'Ngày';
	hour_lang = 'Giờ';
	minute_lang = 'Phút';
	second_lang = 'Giây';
} else if (lang === 'EN') {
	day_lang = 'Ngày';
	hour_lang = 'Giờ';
	minute_lang = 'Phút';
	second_lang = 'Giây';
}
	
class Countdown {
	get TIMESTAMP_SECOND() { return 1000; }
	get TIMESTAMP_MINUTE() { return 60 * this.TIMESTAMP_SECOND; }
	get TIMESTAMP_HOUR() { return 60 * this.TIMESTAMP_MINUTE; }
	get TIMESTAMP_DAY() { return 24 * this.TIMESTAMP_HOUR; }

	constructor(userOptions) {
		this.options = {
			cont: null,
			countdown: true,
			endDate: {
				day: 0,
				hour: 0,
				minute: 0,
				second: 0 },
			endCallback: null,
			outputFormat: formatCountdown,
			outputTranslation: {
				day: day_lang,
				hour: hour_lang,
				minute: minute_lang,
				second: second_lang }
		};

		this.lastTick = null;
		this.intervalsBySize = ['day', 'hour', 'minute', 'second'];
		this.interval = null;
		this.digitConts = {};
		this._assignOptions(this.options, userOptions);
	}

	start() {
		let endDate, endDateData;
		this._fixCompatibility();

		endDate = this._getDate(this.options.endDate);
		endDateData = this._prepareTimeByOutputFormat(endDate);

		this._writeData(endDateData);
		this.lastTick = endDateData;

		if (this.options.countdown && endDate.getTime() <= Date.now()) {
			if (typeof this.options.endCallback === 'function') {
				this.stop();
				this.options.endCallback();
			}
		} else {
			this.interval = setInterval(() =>
				{ this._updateView(this._prepareTimeByOutputFormat(endDate)); },
				this.TIMESTAMP_SECOND);
		}
	}
	
	stop() { if (this.interval !== null) { clearInterval(this.interval); }}

	_getDate(date) {
		if (typeof date === 'object') {
			if (date instanceof Date) { return date; }
			else {
				let expectedValues = {
					day: 0,
					hour: 0,
					minute: 0,
					second: 0
				};
				
				for (let i in expectedValues) {
					if (expectedValues.hasOwnProperty(i) && date.hasOwnProperty(i)) { expectedValues[i] = date[i]; }
				}
				return new Date(expectedValues.day, expectedValues.hour, expectedValues.minute, expectedValues.second);
			}
		} else if (typeof date === 'number' || typeof date === 'string') { return new Date(date); }
		else { return new Date(); }
	}

	_prepareTimeByOutputFormat(dateObj) {
		let usedIntervals, output = {}, timeDiff;
		
		usedIntervals = this.intervalsBySize.filter(item => { return this.options.outputFormat.split('|').indexOf(item) !== -1; });
		
		timeDiff = this.options.countdown ? dateObj.getTime() - Date.now() : Date.now() - dateObj.getTime();
		
		usedIntervals.forEach(item => {
			let value;
			if (timeDiff > 0) {
				switch (item) {
					case 'day':
						value = Math.trunc(timeDiff / this.TIMESTAMP_DAY);
						timeDiff -= value * this.TIMESTAMP_DAY;
						break;
					case 'hour':
						value = Math.trunc(timeDiff / this.TIMESTAMP_HOUR);
						timeDiff -= value * this.TIMESTAMP_HOUR;
						break;
					case 'minute':
						value = Math.trunc(timeDiff / this.TIMESTAMP_MINUTE);
						timeDiff -= value * this.TIMESTAMP_MINUTE;
						break;
					case 'second':
						value = Math.trunc(timeDiff / this.TIMESTAMP_SECOND);
						timeDiff -= value * this.TIMESTAMP_SECOND;
						break;
				}
			} else {
				value = '00';
				const elements = document.querySelectorAll('.digit_cont');
				for (let i = 0; i < elements.length; i++) { elements[i].style.color = ColorDigitEnd; }
			}
			output[item] = (('' + value).length < 2 ? '0' + value : '' + value).split('');
		});
    return output;
  }
	
	_fixCompatibility() {
		Math.trunc = Math.trunc || function (x) {
			if (isNaN(x)) { return NaN; }
			if (x > 0) { return Math.floor(x); }
			return Math.ceil(x);
		};
	}

	_writeData(data) {
		let code = ``, intervalName;
		
		for (intervalName in data) {
			if (data.hasOwnProperty(intervalName)) {
				let element = `<div><div class="interval_cont interval_cont_${intervalName}">`,
        intervalDescription = `<div class="description"> ${this.options.outputTranslation[intervalName]}</div>`;
        
				data[intervalName].forEach((digit, index) => { element += `<div class="digit_cont digit_cont_${index}" id="test">${this._getDigitElementString(digit, 0)}</div>`; });
				
				code += element + '</div>' + intervalDescription + '</div>';
			}
		}
		this.options.cont.innerHTML = code;
		this.lastTick = data;
	}

	_getDigitElementString(newDigit, lastDigit) {
		return `<div class="last_placeholder"><span>${lastDigit}</span></div>
						<div class="new_placeholder">${newDigit}</div>
						<div class="last_rotate">${lastDigit}</div>
						<div class="new_rotate">
							<div class="rotated"><span>${newDigit}</span></div>
						</div>`;
	}

	_updateView(data) {
		for (let intervalName in data) {
			if (data.hasOwnProperty(intervalName)) {
				data[intervalName].forEach((digit, index) => {
						if (this.lastTick !== null
								&& this.lastTick[intervalName][index]
								!== data[intervalName][index])
						{
							this._getDigitCont(intervalName, index).innerHTML = this._getDigitElementString(data[intervalName][index], this.lastTick[intervalName][index]);
						}
				});
			}
		}
		this.lastTick = data;
	}

	_getDigitCont(intervalName, index) {
		if (!this.digitConts[`${intervalName}_${index}`]) {
			this.digitConts[`${intervalName}_${index}`] = this.options.cont.querySelector(`.interval_cont_${intervalName} .digit_cont_${index}`);
		}
		return this.digitConts[`${intervalName}_${index}`];
	}

	_assignOptions(options, userOptions) {
		for (let i in options) {
			if (options.hasOwnProperty(i) && userOptions.hasOwnProperty(i)) {
				if (options[i] !== null && typeof options[i] === 'object' && typeof userOptions[i] === 'object') {
					this._assignOptions(options[i], userOptions[i]);
				}
				else { options[i] = userOptions[i]; }
			}
		}
	}
}