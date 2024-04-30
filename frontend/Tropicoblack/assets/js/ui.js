$(document).ready(function() {
    // Tooltip
    $('[data-toggle="tooltip"]').tooltip();
    $('[rel="tooltip"]').tooltip({ trigger: "hover" });
    // Sidebar
    $("#dismiss, .overlay").on("click", function() {
        $("#sidebar").removeClass("active");
        $(".overlay").removeClass("active");
    });
    $("#sidebarCollapse").on("click", function() {
        $("#sidebar").addClass("active");
        $(".overlay").addClass("active");
        $(".collapse.in").toggleClass("in");
        $("a[aria-expanded=true]").attr("aria-expanded", "false");
    });
    // Back to top
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $("#back-to-top").fadeIn();
        } else {
            $("#back-to-top").fadeOut();
        }
    });
    $("#back-to-top").click(function() {
        $("#back-to-top").tooltip("hide");
        $("body,html").animate({
                scrollTop: 0
            },
            800
        );
        return false;
    });
    // Search
    $("#search_input").keyup(function(e) {
        e.preventDefault();
        var searchTerm = $("#search_input")
            .val()
            .trim();
        if (searchTerm.length >= 3) {
            GLOBALOBJ.methods.filterGamesToShow(searchTerm);
        } else {
            if (e.which == 8) {
                GLOBALOBJ.methods.changeToCategory(GLOBALOBJ.data.categoryToShow);
            }
        }
    });
    $("#search_icon").click(function(e) {
        e.preventDefault();
        var searchTerm = $("#search_input")
            .val()
            .trim();
        if (searchTerm.length >= 3) {
            GLOBALOBJ.methods.filterGamesToShow(searchTerm);
        }
    });
    // Game Modal
    $("#game-window-modal").on("hidden.bs.modal", function() {
        $("#game-window-modal")
            .find("#game-window-modal-title")
            .empty();
        $("#game-window-modal")
            .find("#game-window-modal-iframe")
            .attr("src", "");
        $("#game-window-modal")
            .find("#game-window-modal-fullscreen")
            .attr("href", "");
        $("#game-window-modal").find("#game-window-modal-fullscreen").show();
        $("#game-window-modal").find("#game-window-modal-frame").height("65vh");
        $("#game-window-modal").find(".modal-content").exitFullscreen();
    });
    $("#game-window-modal a[rel*=fullscreen]").click(function(e) {

        e.preventDefault();
        // $("#game-window-modal").find("#game-window-modal-fullscreen").hide();
        // $("#game-window-modal").find("#game-window-modal-frame").height("100%");
        $("#game-window-modal").find(".modal-content").fullscreen(function() {
            $("#game-window-modal").find("#game-window-modal-fullscreen").show();
            $("#game-window-modal").find("#game-window-modal-frame").height("100%");
        });
    });
    // Footer
    $(".panel-group").on("hidden.bs.collapse", function(e) {
        $(e.target)
            .parent()
            .find("i.fas")
            .toggleClass("fa-plus fa-minus");
    });
    $(".panel-group").on("shown.bs.collapse", function(e) {
        $(e.target)
            .parent()
            .find("i.fas")
            .toggleClass("fa-plus fa-minus");
    });
    // Language Selector
    $(".selectpicker").selectpicker();
    $(".selectpicker").on("changed.bs.select", function(e, clickedIndex, isSelected, previousValue) {
        console.log(clickedIndex);
    });
    // categories
    $("body").on("click", "[data-category]", function(e) {
        e.preventDefault();
        GLOBALOBJ.methods.changeToCategory(
            $(this)
                .attr("data-category")
                .trim()
        );
    });
    $("body").on("click", "[data-provider-id]", function(e) {
        e.preventDefault();
        GLOBALOBJ.methods.changeToProvider(
            $(this)
                .attr("data-provider-id")
                .trim()
        );
    });
});

$(document).ready(function() {
    // Floating User Info
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            if ($(".user-info").length > 0 && $("#floating-user-info").children().length == 0) {
                $(".user-info")
                    .clone()
                    .appendTo("#floating-user-info");
                $("#floating-user-info").fadeIn();
            }
        } else {
            $("#floating-user-info").fadeOut();
            $("#floating-user-info").empty();
        }
    });
});
