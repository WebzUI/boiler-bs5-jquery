function getUrlParameter(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
	var results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function baseUrl() {
	return (
		window.location.origin +
		"/" +
		window.location.pathname.split("/").filter((str) => str !== "")[0]
	);
}
function checkString(str, alt = "-", type = "") {
	if (typeof str == "undefined" || str == false || str == null || str == "") {
		return alt;
	}
	if (["bday", 'date'].includes(type) && str.trim() == "0000-00-00") {
		return alt;
	}
	return str;
}
function formatNumber(str, option, alt = "-", pre = "") {
	if (typeof str == "undefined" || str == false || str == null || str == "") {
		return alt;
	} else if (option == "money_int") {
		return pre + parseInt(str).toLocaleString("en-US");
	}
	return str;
}
function formatDateTime(dateString, type, alt = "-") {
	if (
		[null, ""].includes(dateString) ||
		new Date(dateString) == "Invalid Date"
	) {
		return alt;
	}
	const date = new Date(dateString);

	if (type == "date") {
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	} else if (type == "date_noyear") {
		if (date.getFullYear() == new Date().getFullYear()) {
			return date.toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
			});
		}
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	} else if (type == "date_slash") {
		newDate = date.toLocaleDateString();
		return newDate
			.split("/")
			.map((date) => {
				if (date.length == 1) {
					return parseInt(date).toLocaleString().padStart(2, "0");
				}
				return date;
			})
			.join("/");
	} else if (type == "date_slash_ymd") {
		newDate = date.toLocaleDateString();
		return date.getFullYear() + "/" + (date.getMonth() + 1).toLocaleString().padStart(2, '0') + "/" + date.getDate().toLocaleString().padStart(2, '0')
	} else if (type == "time") {
		return date.toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "numeric",
		});
	} else if (type == "time_nulltime") {
		if (date.toLocaleTimeString() == "12:00:00 AM") {
			return alt;
		}
		return date.toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "numeric",
		});
	} else if (type == "datetime_nulltime") {
		if (date.toLocaleTimeString() == "12:00:00 AM") {
			return date.toLocaleString("en-US", {
				month: "short",
				day: "numeric",
				year: "numeric",
			});
		}
		return date.toLocaleTimeString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
			hour: "numeric",
			minute: "numeric",
		});
	} else if (type == "datetime") {
		return date.toLocaleTimeString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
			hour: "numeric",
			minute: "numeric",
		});
	} else if (type == "datetime_noyear") {
		if (date.getFullYear() == new Date().getFullYear()) {
			return date.toLocaleTimeString("en-US", {
				month: "short",
				day: "numeric",
				hour: "numeric",
				minute: "numeric",
			});
		}
		return date.toLocaleTimeString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
			hour: "numeric",
			minute: "numeric",
		});
	} else if (type == "time_plain") {
		return date.getHours().toLocaleString().padStart(2, "0") + ":" + date.getMinutes().toLocaleString().padStart(2, "0") + ":" + date.getSeconds().toLocaleString().padStart(2, "0");
	} else if (type == "date_plain") {
		return date.getFullYear() + "-" + (date.getMonth() + 1).toLocaleString().padStart(2, "0") + "-" + (date.getDate()).toLocaleString().padStart(2, "0");
	} else if (type == "datetime_plain") {
		return date.getFullYear() + "-" + (date.getMonth() + 1).toLocaleString().padStart(2, "0") + "-" + (date.getDate()).toLocaleString().padStart(2, "0") + " " +
			date.getHours().toLocaleString().padStart(2, "0") + ":" + date.getMinutes().toLocaleString().padStart(2, "0") + ":" + date.getSeconds().toLocaleString().padStart(2, "0");
	}
	return alt;
}
// attribute name specific
$('[name="table_search"]').on(
	"change search keyup keydown keypress",
	function () {
		const searchTxt = $(this).val().trim().toLowerCase();
		let elemTable = "#tableResults";
		let rowResult = 0;

		$(elemTable)
			.find("tr")
			.each(function () {
				const rowText = $(this)
					.text()
					.replace(/[\t\n]/g, " ")
					.split(" ")
					.filter((word) => word.trim() != "")
					.join(" ")
					.toLowerCase();
				if (rowText.includes(searchTxt)) {
					$(this).show();
					if ($(this).find("td").length > 3) {
						rowResult++;
					}
				} else {
					if ($(this).find("td").length > 3) {
						$(this).hide();
					}
				}
			});
		if (rowResult > 0) {
			$("#tableResultsCount").html(rowResult + " result(s)");
		} else {
			$("#tableResultsCount").html("");
		}
	}
);
function paramToObject(str) {
	let obj = {};
	str.split("&").forEach((row) => {
		if (row != "") {
			if (row.split("=")[1] != "") {
				obj[row.split("=")[0]] = decodeURI(row.split("=")[1]);
			}
		}
	});

	return obj;
}
function objectToParam(obj) {
	let paramList = [];

	if (obj[0] == undefined) {
		for (const item in obj) {
			if (obj[item] != "") {
				paramList.push(`${item}=${encodeURI(obj[item])}`);
			}
		}
	} else {
		obj.forEach((row) => {
			if (row.value != "") {
				paramList.push(`${row.name}=${encodeURI(row.value)}`);
			}
		});
	}

	return paramList.join("&");
}
function timeDifference(str, type) {
	if (type == "time") {
		const dateTime = str.split(" ");
		const time = (dateTime.length == 2) ? dateTime[1].split(":") : str.split(":");
		return (parseInt(time[0]) * 60 * 60) + (parseInt(time[1]) * 60) + parseInt(time[2]);
	}
}
function convertDateRange(dateRange) {
	let decoded = decodeURIComponent(dateRange); // Decode URL-encoded characters
	decoded = decoded.replace(/%20/g, " "); // Replace %20 with space
	decoded = decoded.replace(/%2F/g, "/"); // Replace all %2F occurrences with slash
	decoded = decoded.replace(/%25/g, "%"); // Replace all %25 occurrences with %
	let dates = decoded.split("-"); // Split the string at the hyphen
	let startDate = new Date(dates[0].trim()); // Create a Date object from the start date
	let endDate = new Date(dates[1].trim()); // Create a Date object from the end date
	let start = startDate.toLocaleDateString(); // Format start date to readable format
	let end = endDate.toLocaleDateString(); // Format end date to readable format
	return `${start} - ${end}`; // Return the formatted date range
}
function toFullName(nameParts) {
	return nameParts
		.filter((name) => name != "")
		.join(" ")
		.trim();
}
function convertTravelDates(dateRange, format, alt = "-") {
	if (dateRange.split(" - ").length > 2 || dateRange.split("-").length < 1) {
		return false;
	}
	if (dateRange.trim().length == 0) {
		return alt;
	} else if (format == "short") {
		return (
			formatDateTime(dateRange.split(" - ")[0], "date") +
			" - " +
			formatDateTime(dateRange.split(" - ")[1], "date")
		);
	} else if (format == "raw_to_picker") {
		const left = dateRange.split("-")[0];
		const right = dateRange.split("-")[1];
		const leftMonth = left.split(" ")[0];
		const leftDay = left.split(" ")[0];

		const startDate = formatDateTime(
			left + " " + right.split(" ").slice(-1),
			"date_slash"
		);
		let endDate = "";
		if (!isNaN(right.replace(/,/g, "").split(" ")[0])) {
			endDate = formatDateTime(leftMonth + right, "date_slash");
		} else {
			endDate = formatDateTime(right, "date_slash");
		}

		return startDate + " - " + endDate;
	}

	return dateRange;
}
function formatUrl(str, alt = "-") {
	if (!str || str.trim().length === 0) {
		return alt;
	} else if (isValidUrl(str)) {
		return '<a href="' + str + '" target="_blank">Click here</a>';
	} else {
		return str;
	}
}
function isValidUrl(str) {
	const urlRegex = /^(?:(?:https?|ftp):)?\/\/(?:www\.|(?:m\.)?(?:facebook|fb|instagram|ig)\.com\/)\S+$/i;
	return urlRegex.test(str);
}
function getMatches(needle, haystack) {
	return haystack.filter(row => typeof row == "string" && row != "").map(row => row.trim().toLowerCase()).filter(row => row.includes(needle));
}
$('[name="log_search"]').on('change search keypress keyup keydown', function () {
	const text = $(this).val().trim().toLowerCase();
	console.log(text);
	$('.logs .log').each(function () {
		const rowText = $(this).text().trim().replace(/\n\s/g, ' ').split(" ").filter(word => word.trim() != "").join(" ").toLowerCase();
		if (rowText.includes(text) || text.length < 1) {
			$(this).show();
		} else {
			$(this).hide();
		}
	});
});
$('[name="log_search"]').click(function () {
	$(this).select();
});
// var fields = document.querySelectorAll('input[autocomplete="off"], textarea[autocomplete="off"]');
// 	fields.forEach(function(field) {
// 	field.setAttribute('autocomplete', 'nope');
// 	field.setAttribute('readonly', 'readonly');
// 	field.style.backgroundColor = 'white';
// });
$('input[autocomplete="off"], textarea[autocomplete="off"]').each(function () {
	if ($(this).hasClass('anti-chrome')) {
		$(this).attr('autocomplete', 'nope');
		$(this).attr('readonly', 'readonly');
		$(this).css('background-color', 'white');
		$(this).blur(function () {
			$(this).removeAttribute('autocomplete');
		});
	}
});
function selectorizer(elem, val) {
	$(elem).find('option').each(function () {
		if ($(this).val().toLowerCase() == val.toLowerCase()) {
			$(this).prop('selected', true)
		} else {
			$(this).prop('selected', false);
		}
	})
}
function badgerizer(status) {
	if (['APPROVED', 'ACTIVE','SUCCESS'].includes(status)) {
		return `<div class="badge bg-success text-white">${status}</div>`;
	} else if (['DISAPPROVED','ERROR'].includes(status)) {
		return `<div class="badge bg-danger">${status}</div>`;
	} else if (status == "RECEIVED") {
		return `<div class="badge bg-info">${status}</div>`;
	} else if (['INACTIVE'].includes(status)) {
		return `<div class="badge bg-danger">${status}</div>`;
	} else {
		return status;
	}
}
function disableAutoFill(input) {
	input.setAttribute('readonly', 'true');
}
function enableAutoFill(input) {
	input.removeAttribute('readonly');
}
function manualFormToArray(txt) {
	const lines = txt.split("\n");
	let form = [];
	lines.forEach(row => {
		if (row.trim().length != 0) {
			if (row.split(':').length == 2) {
				form.push([row.split(':')[0].trim(), row.split(':')[1].trim()])
			} else if (row.split(':').length > 2) {
				if (row.split(':')[0].trim().toLowerCase() == 'fb link') {
					form.push([
						row.split(':')[0].trim(),
						row.split(':').filter(row => row.trim().toLowerCase() != 'fb link').join(":")
					])
				}
			} else {
				form.push(['', row.trim()])
			}
		}
	})
	return form;
}
function previewImage(elem) {
	createPreviewImageModal();
	const src = elem.src;

	// if (['png','jpeg','jpg','pdf'].includes(src.split(".").slice(-1))) {
	output = `<img src='${src}' class="w-100 border" />`;
	$('#imagePreviewModal .modal-body').html(output);
	// } else {
	// 	$('#imagePreviewModal .modal-body').html('');
	// }
	$('#imagePreviewModal').modal('show');
}
function createPreviewImageModal() {
	if ($('#imagePreviewModal').html() == undefined) {
		output = `<div id="imagePreviewModal" class="modal fade">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button class="close" type="button" data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-body"></div>
				</div>
			</div>
		</div>`;
		if ($('.container').html() != undefined) {
			$('.container').append(output);
		} else if ($('.container-lg').html() != undefined) {
			$('.container-lg').append(output);
		}
	}
}
function createDataNoticeModal(content = {
	title: null,
	body: null,
	footer: null,
}) {
	if ($('#dataNoticeModal').html() == undefined) {
		output = `<div id="dataNoticeModal" class="modal fade" role="modal">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title"></h5>
						<button class="close" type="button" data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-body"></div>
					<div class="modal-footer"></div>
				</div>
			</div>
		</div>`;
		if ($('.container').html() != undefined) {
			$('.container').append(output);
		} else if ($('.container-lg').html() != undefined) {
			$('.container-lg').append(output);
		}
	}

	if (Object.values(content).length > 0) {
		const form = $('#dataNoticeModal');
		form.find('.modal-title').html(checkString(content.title));
		form.find('.modal-body').html(checkString(content.body));
		form.find('.modal-footer').html(checkString(content.footer, ''));
		form.modal('show');
	}
}
function alertinator(status, title, desc, isDismissible = false) {
	let dismissBtn = "";
	if (isDismissible) {
		dismissBtn = `<button class="close" type="button" data-toggle="alert">&times;</button>`;
	}
	return `<div class="alert alert-${status} ${(isDismissible) ? 'alert-dismissible' : ''}">
        <div><b>${title}</b> ${desc}</div>
        ${dismissBtn}
    </div>`;
}