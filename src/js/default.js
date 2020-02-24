// Default:
// =====================================================================================================================

import $ from "jquery";

$(document).ready(function() {
	// Browsers
	let is_opera = !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0,
		is_Edge = navigator.userAgent.indexOf("Edge") > -1,
		is_chrome = !!window.chrome && !is_opera && !is_Edge,
		is_explorer =
			typeof document !== "undefined" && !!document.documentMode && !is_Edge,
		is_firefox = typeof window.InstallTrigger !== "undefined",
		is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);


});
