$(document).ready(function () {
	check_mobile();
	load_list();
});

function check_mobile() {
	const detectDeviceType = () =>
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		)
			? "Mobile"
			: "Desktop";
	if (detectDeviceType() == "Mobile") {
		are_u_sure_gonna_open_this_web();
	} else {
		call_data();
	}
}

function are_u_sure_gonna_open_this_web() {
	if (localStorage.getItem("not_first_time_huh") == null) {
		alert(
			"It looks like you're accessing the website via a mobile device. This website has pictures of many models. Recommend using unlimited mobile data."
		);
		localStorage.setItem("not_first_time_huh", "yeah..");
	}
	call_data();
}

page = 0;
function call_data(v) {
	if (!v) {
		v = "";
	}

/* 	$.post(
		"https://ashiralol.github.io/datalist.html",	
		{
			filter: v,
			offset: page,
		},

		function (data, status) {
			$("#box_content").html(data);
			load_list();				
		},
		"html"
	); */

/* 	postData("datalist.html", {  }).then((data) => {
		$("#box_content").html(data);
		load_list();		
}); */

}


async function postData(url = "", data = {}) {
	// Default options are marked with *
	const response = await fetch(url, {
	  method: "POST", // *GET, POST, PUT, DELETE, etc.
	  mode: "cors", // no-cors, *cors, same-origin
	  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
	  credentials: "same-origin", // include, *same-origin, omit
	  headers: {
		"Content-Type": "application/json",
		// 'Content-Type': 'application/x-www-form-urlencoded',
	  },
	  redirect: "follow", // manual, *follow, error
	  referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
	  body: JSON.stringify(data), // body data type must match "Content-Type" header
	});
	return response.text(); // parses JSON response into native JavaScript objects
  }



function clear_fev_list() {
	localStorage.removeItem("list");
	$(".model_botton").removeClass("fev");
}


function do_filter() {

	set_filter = $("#input_box_tag").val();
	$(".model_box").addClass("do_filter_hide");

	
	owner_list = document.querySelectorAll(".owner_name");

	owner_list.forEach(function (index) {
		var get_owner_name = $(index).html();

		if (get_owner_name.toLowerCase().search(set_filter.toLowerCase()) > 0) {
			$(index).closest(".model_box").removeClass("do_filter_hide");
		}

		if (set_filter == "") {
			$(index).closest(".model_box").removeClass("do_filter_hide");
		}
	});


	name_item = document.querySelectorAll(".name_item");	

	name_item.forEach(function (index) {
		var get_name_item = $(index).html();

		

		if (get_name_item.toLowerCase().search(set_filter.toLowerCase()) > 0) {
			$(index).closest(".model_box").removeClass("do_filter_hide");
			/* console.log(get_name_item+" "+set_filter); */
		}

		if (set_filter == "") {
			$(index).closest(".model_box").removeClass("do_filter_hide");
		}
	});	



}

function load_list() {
	let locallist_ary = [];

	if (localStorage.getItem("list") !== null) {
		locallist_ary = JSON.parse(localStorage.getItem("list"));
	}

	for (let i = locallist_ary.length - 1; i >= 0; i--) {
		$("#fav_id_" + locallist_ary[i]).addClass("fev");
	}
}

function save_list(v) {
	let locallist_ary = [];

	var val_save = v.dataset.id;
	var find_dup = 0;

	if (localStorage.getItem("list") !== null) {
		locallist_ary = JSON.parse(localStorage.getItem("list"));
	}

	for (let i = locallist_ary.length - 1; i >= 0; i--) {
		if (locallist_ary[i] === val_save) {
			locallist_ary.splice(i, 1);
			find_dup = 1;
		}
	}

	if (find_dup == 0) {
		locallist_ary.push(val_save);
		$("#" + v.id).addClass("fev");
	} else {
		$("#" + v.id).removeClass("fev");
	}

	/* console.log(v.id); */

	locallist_ary = JSON.stringify(locallist_ary);
	localStorage.setItem("list", locallist_ary);

	/* console.log(val_save);
	console.log(locallist_ary); */

	show_list = document.querySelectorAll(".fev");
}

/* function next_page() {
	page++;
	call_data();
}

function prev_page() {
	if (page != 0) {
		page--;
		call_data();
	}
} */

var only_myfev_toggle_s = 0;

var show_list;

function only_myfev_toggle() {
	if (only_myfev_toggle_s == 0) {
		show_list = document.querySelectorAll(".fev");

		/* $(".model_box").css("display", "none"); */
		$(".model_box").addClass("do_fev_hide");		

		show_list.forEach(function (index) {
			/* console.log($(index).closest(".model_box")); */
			$(index).closest(".model_box").removeClass("do_fev_hide");
		});
		only_myfev_toggle_s = 1;
	} else {
		$(".model_box").removeClass("do_fev_hide");
		only_myfev_toggle_s = 0;		
	}


	if(show_list.length==0&& only_myfev_toggle_s==1){
		$("#fev_toggle_empty").addClass("show_el");
	}else{
		$("#fev_toggle_empty").removeClass("show_el");
	}


}
