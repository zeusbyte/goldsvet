window.odometerOptions = { auto: false };


var GLOBALOBJ = {
    uiElements: {
        mainLoader: $('<img src="/frontend/Tropicoblack/assets/images/ui/loader.svg" class="w-25 m-auto"/>'),
        notFound: $('<div class="w-100 mt-5 highlightText"><i class="fas fa-exclamation-triangle fa-10x"></i><br><h1>Not found</h1></div>'),
        mainContent: $("#mainContent"),
        mainVendors: $("#vendors"),
        mainBanners: $("#banners"),
        mainJackpot: $("#jackpots"),
        mainJackpot2: $("#jackpots2")
    },
    data: {
        bannersList: GLOBAL_BANNERS_LIST,
        providerListFull: GLOBAL_PROVIDERS_LIST,
        providerToShow: "",
        categoryToShow: "",
        gameListFull: GLOBAL_GAMES_LIST,
        gameListToShow: [],
        providerListToShow: []
    },
    methods: {
        createGameProvider: function() {
          $(function() {
              $('.lazy').Lazy();
          });
          return false;

            $(GLOBALOBJ.uiElements.mainVendors).empty();
            GLOBALOBJ.data.providerListToShow = [];
            var tmpCont = $("<ul/>", {
                class: "navbar-nav"
            });
            $(GLOBALOBJ.uiElements.mainVendors).append(tmpCont);
            for (var index = 0; index < GLOBALOBJ.data.gameListToShow.length; index++) {
                var element = GLOBALOBJ.data.gameListToShow[index];
                if (GLOBALOBJ.data.providerListToShow.indexOf(element.providerId) === -1 && typeof GLOBALOBJ.data.providerListFull[element.providerId] !== "undefined") {
                    GLOBALOBJ.data.providerListToShow.push(element.providerId);
                }
            }
            for (var index = 0; index < GLOBALOBJ.data.providerListToShow.length; index++) {
                var providerId = GLOBALOBJ.data.providerListToShow[index];
                $(tmpCont).append(
                    $("<li/>", {
                        class: "nav-item mr-2 ml-2 box",
                        "data-provider-id": GLOBALOBJ.data.providerListFull[providerId].id
                    }).append(
                        $("<a/>", {
                            href: "#"
                        }).append(
                            $("<img/>", {
                                class: "nav-item-img",
                                src: GLOBALOBJ.data.providerListFull[providerId].imageUrl
                            })
                        )
                    )
                );
            }
        },
        createGameBanners: function() {
            $(function() {
                $('.lazy').Lazy();
            });
            $(GLOBALOBJ.uiElements.mainBanners).empty();
            var tmpCont = $("<div/>", {
                class: "swiper-container"
            });
            var tmpWrapper = $("<div/>", {
                class: "swiper-wrapper"
            });
            tmpCont.append(tmpWrapper);
            for (var key in GLOBALOBJ.data.bannersList) {
                if (GLOBALOBJ.data.bannersList.hasOwnProperty(key)) {
                    var element = GLOBALOBJ.data.bannersList[key];
                    $(tmpWrapper).append(
                        $("<div/>", {
                            class: "swiper-slide"
                        }).append(
                            $("<div/>", {
                                class: "swiper-slide-child",
                                style: "background-image:url(" + element + ")"
                            })
                        )
                    );
                }
            }
            tmpCont.append($("<div/>", { class: "swiper-pagination" }));
            tmpCont.append($("<div/>", { class: "swiper-button-next" }));
            tmpCont.append($("<div/>", { class: "swiper-button-prev" }));
            $(GLOBALOBJ.uiElements.mainBanners).append($(tmpCont));
            new Swiper($(GLOBALOBJ.uiElements.mainBanners).find(".swiper-container"), {
                spaceBetween: 30,
                centeredSlides: true,
                loop: true,
                effect: "fade",
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false
                },
                pagination: {
                    el: $(GLOBALOBJ.uiElements.mainBanners).find(".swiper-pagination"),
                    clickable: true
                },
                navigation: {
                    nextEl: $(GLOBALOBJ.uiElements.mainBanners).find(".swiper-button-next"),
                    prevEl: $(GLOBALOBJ.uiElements.mainBanners).find(".swiper-button-prev")
                }
            });
        },
        changeToProvider: function(providerId) {
            $(function() {
                $('.lazy').Lazy();
            });

            $(GLOBALOBJ.uiElements.mainContent).html(GLOBALOBJ.uiElements.mainLoader);
            $(GLOBALOBJ.uiElements.mainVendors)
                .find("[data-provider-id]")
                .removeClass("active");
            if (Object.keys(GLOBALOBJ.data.providerListFull).indexOf(providerId) === -1) {
                $(GLOBALOBJ.uiElements.mainContent).html("Provider not found");
            } else {
                GLOBALOBJ.data.providerToShow = providerId;
                GLOBALOBJ.data.gameListToShow = $.grep(GLOBALOBJ.data.gameListFull, function(v) {
                    if (v.categoryName.lastIndexOf(",")) {
                        var tmpCat = v.categoryName.split(",");
                        for (var index = 0; index < tmpCat.length; index++) {
                            var element = tmpCat[index].trim();
                            if (element === GLOBALOBJ.data.categoryToShow) {
                                return v.providerId === providerId;
                            }
                        }
                        return false;
                    } else {
                        return v.categoryName === GLOBALOBJ.data.categoryToShow && v.providerId === providerId;
                    }
                });
                if (GLOBALOBJ.data.gameListToShow.length === 0) {
                    $(GLOBALOBJ.uiElements.mainContent).html(GLOBALOBJ.uiElements.notFound);
                } else {
                    $(GLOBALOBJ.uiElements.mainContent).empty();
                    $(GLOBALOBJ.uiElements.mainVendors)
                        .find("[data-provider-id=" + providerId + "]")
                        .addClass("active");
                    for (var i = 0; i < GLOBALOBJ.data.gameListToShow.length; i++) {
                        $(GLOBALOBJ.uiElements.mainContent).append(GLOBALOBJ.methods.createGameElement(GLOBALOBJ.data.gameListToShow[i]));
                    }
                }
            }
        },
        changeToCategory: function(category) {
            $(GLOBALOBJ.uiElements.mainContent).html(GLOBALOBJ.uiElements.mainLoader);
            GLOBALOBJ.data.providerListToShow = [];
            $("body")
                .find("[data-category]")
                .removeClass("active");
            $("body")
                .find("[data-category=" + category + "]")
                .addClass("active");
            GLOBALOBJ.data.providerToShow = category;
            GLOBALOBJ.data.gameListToShow = $.grep(GLOBALOBJ.data.gameListFull, function(v) {
                if (v.categoryName.lastIndexOf(",")) {
                    var tmpCat = v.categoryName.split(",");
                    for (var index = 0; index < tmpCat.length; index++) {
                        var element = tmpCat[index].trim();
                        if (element === category || category == "all") {
                            return true;
                        }
                    }
                    return false;
                } else {
                    return v.categoryName === category;
                }
            });
            if (GLOBALOBJ.data.gameListToShow.length === 0) {
                $(GLOBALOBJ.uiElements.mainContent).html(GLOBALOBJ.uiElements.notFound);
            } else {
                $(GLOBALOBJ.uiElements.mainContent).empty();
                for (var i = 0; i < GLOBALOBJ.data.gameListToShow.length; i++) {
                    $(GLOBALOBJ.uiElements.mainContent).append(GLOBALOBJ.methods.createGameElement(GLOBALOBJ.data.gameListToShow[i]));
                }
                GLOBALOBJ.data.categoryToShow = category.trim();
            }
            GLOBALOBJ.methods.createGameProvider();
        },
        filterGamesToShow: function(searchText) {
            searchText = searchText.toLowerCase().trim();
            $(GLOBALOBJ.uiElements.mainContent).html(GLOBALOBJ.uiElements.mainLoader);
            GLOBALOBJ.data.providerListToShow = [];
            $(GLOBALOBJ.uiElements.mainVendors)
                .find(".swiper-slide")
                .removeClass("selected");
            GLOBALOBJ.data.gameListToShow = $.grep(GLOBALOBJ.data.gameListFull, function(v) {
                return v.gameName.toLowerCase().includes(searchText);
            });
            if (GLOBALOBJ.data.gameListToShow.length === 0) {
                $(GLOBALOBJ.uiElements.mainContent).html(GLOBALOBJ.uiElements.notFound);
            } else {
                $(GLOBALOBJ.uiElements.mainContent).empty();
                for (var i = 0; i < GLOBALOBJ.data.gameListToShow.length; i++) {
                    $(GLOBALOBJ.uiElements.mainContent).append(GLOBALOBJ.methods.createGameElement(GLOBALOBJ.data.gameListToShow[i]));
                }
            }
            GLOBALOBJ.methods.createGameProvider();
        },
        launchGame: function(gameUrl, gameName) {
            if ($.isMobile()) {
                var win = window.open(gameUrl.trim(), "_blank");
                if (win) {
                    win.focus();
                } else {
                    alert("Please allow popups for this website");
                }
            } else {
                $("#game-window-modal").modal("show");
                $("#game-window-modal")
                    .find("#game-window-modal-title")
                    .html(gameName.trim());
                $("#game-window-modal")
                    .find("#game-window-modal-iframe")
                    .attr("src", gameUrl.trim());
                $("#game-window-modal")
                    .find("#game-window-modal-fullscreen")
                    .attr("href", gameUrl.trim());
            }
        },
        createGameElement: function(gameData) {



            return $("<div/>", {
                class: "col-12 m-auto game-container p-0",
                "data-game-url": gameData.launchUrl,
                "data-game-name": gameData.gameName
            })
                .append(
                    $("<div/>", {
                        class: "game-item m-0 lazy",
                        'data-src': gameData.imageUrl,
                        //style: 'background-image: url("' + gameData.imageUrl + '")'
                    })
                )
                .append(
                    $("<div/>", {
                        class: "game-title mb-2"
                    }).html(gameData.gameName)
                )
                .click(function(e) {
                    e.preventDefault();
                    var gameUrl = $(this)
                        .data("game-url")
                        .trim();
                    var gameName = $(this)
                        .data("game-name")
                        .trim();
                    if (gameUrl == "#" || gameUrl == "") {
                        $("#login-modal").modal("show");
                    } else {
                      window.location.href = gameData.launchUrl;
                    }
                });
        },
        acceptCookies: function() {
            localStorage.setItem("accept-cookies", true);
            $("#div-cookies").hide();
        },
        acceptCookiesCheck: function() {
            var userPreference = localStorage.getItem("accept-cookies");
            if (userPreference) {
                $("#div-cookies").hide();
            } else {
                $("#div-cookies").show();
            }
        },
        createJackpot: function() {
            for (var k in jackpotSettings) {
                if (
                    $(GLOBALOBJ.uiElements.mainJackpot)
                        .find(".odometer." + k)
                        .exists()
                ) {
                    new Odometer({
                        el: $(GLOBALOBJ.uiElements.mainJackpot).find(".odometer." + k)[0],
                        format: "(,ddd).dd",
                        duration: 6000,
                        theme: "default"
                    });
                    $(GLOBALOBJ.uiElements.mainJackpot)
                        .find(".odometer." + k)
                        .html(jackpotSettings[k].currentValue);
                }
            }
            setInterval(function() {
              return false;
                for (var k in jackpotSettings) {
                    jackpotSettings[k].currentValue += Math.random();
                    if (
                        $(GLOBALOBJ.uiElements.mainJackpot)
                            .find(".odometer." + k)
                            .exists()
                    ) {
                        $(GLOBALOBJ.uiElements.mainJackpot)
                            .find(".odometer." + k)
                            .html(jackpotSettings[k].currentValue);
                        if (jackpotSettings[k].isRed === true) {
                            $(GLOBALOBJ.uiElements.mainJackpot)
                                .find(".odometer." + k)
                                .css("color", "#ff0000");
                        } else {
                            $(GLOBALOBJ.uiElements.mainJackpot)
                                .find(".odometer." + k)
                                .css("color", "#ffffff");
                        }
                        if (
                            typeof jackpotSettings[k].details != "undefined" &&
                            typeof jackpotSettings[k].details.winner != "undefined" &&
                            typeof jackpotSettings[k].details.amount != "undefined" &&
                            jackpotSettings[k].details.winner != "" &&
                            jackpotSettings[k].details.amount != ""
                        ) {
                            var win_template = "";
                            win_template += "<span>"+BIGGER_WIN+":&nbsp;</span>";
                            win_template += "<span>" + jackpotSettings[k].details.date + "</span>";
                            win_template += "<h5 class='text-center'>" + jackpotSettings[k].details.bw_amount + "€</h5>";
                            win_template += "<span>"+NUMBER_OF_WINS+":&nbsp;</span>";
                            win_template += "<span>" + jackpotSettings[k].details.number_of_wins + "</span>";
                            win_template += "<br/>";
                            win_template += "<span>"+LAST_WINNER+":&nbsp;</span>";
                            win_template += "<span>" + jackpotSettings[k].details.last_winner_date + "</span>";
                            win_template += "<h6 class='text-center'>" + jackpotSettings[k].details.last_winner_username + "</h6>";
                            win_template += "<h5 class='text-center'>" + jackpotSettings[k].details.last_winner_amount + "€</h5>";

                            $(GLOBALOBJ.uiElements.mainJackpot)
                                .find(".odometer." + k)
                                .closest(".jackpot-container")
                                // .attr("title", "<h5 class='text-center'>Last Winner</h5><p>" + jackpotSettings[k].details.winner.trim() + " : " + jackpotSettings[k].details.amount.trim() + "</p>")
                                //.attr("title", win_template)
                                .tooltip({title: win_template, html: true });

                        } else {
                            $(GLOBALOBJ.uiElements.mainJackpot)
                                .find(".odometer." + k)
                                .closest(".jackpot-container")
                                .attr("title", "")
                                .tooltip({ html: true });
                        }
                    }
                }
            }, 6000);
        },
        createJackpot2: function() {
            for (var k in jackpotSettings) {
                if (
                    $(GLOBALOBJ.uiElements.mainJackpot2)
                        .find(".pisoglentis." + k)
                        .exists()
                ) {
                    new Odometer({
                        el: $(GLOBALOBJ.uiElements.mainJackpot2).find(".pisoglentis." + k)[0],
                        format: "(,ddd).dd",
                        duration: 6000,
                        theme: "default"
                    });
                    $(GLOBALOBJ.uiElements.mainJackpot2)
                        .find(".pisoglentis." + k)
                        .html(jackpotSettings[k].currentValue);
                }
            }
            setInterval(function() {
                for (var k in jackpotSettings) {
                    jackpotSettings[k].currentValue += Math.random();
                    if (
                        $(GLOBALOBJ.uiElements.mainJackpot2)
                            .find(".pisoglentis." + k)
                            .exists()
                    ) {
                        $(GLOBALOBJ.uiElements.mainJackpot2)
                            .find(".pisoglentis." + k)
                            .html(jackpotSettings[k].currentValue);
                        if (jackpotSettings[k].isRed === true) {
                            $(GLOBALOBJ.uiElements.mainJackpot2)
                                .find(".pisoglentis." + k)
                                .css("color", "#ff0000");
                        } else {
                            $(GLOBALOBJ.uiElements.mainJackpot2)
                                .find(".pisoglentis." + k)
                                .css("color", "#ffffff");
                        }
                        if (
                            typeof jackpotSettings[k].details != "undefined" &&
                            typeof jackpotSettings[k].details.winner != "undefined" &&
                            typeof jackpotSettings[k].details.amount != "undefined" &&
                            jackpotSettings[k].details.winner != "" &&
                            jackpotSettings[k].details.amount != ""
                        ) {
                            $(GLOBALOBJ.uiElements.mainJackpot2)
                                .find(".pisoglentis." + k)
                                .closest(".jackpot-container")
                                .attr("title", "<h5 class='text-center'>Last Winner</h5><p>" + jackpotSettings[k].details.winner + " : " + jackpotSettings[k].details.amount + "</p>")
                                .tooltip({ html: true });

                        } else {
                            $(GLOBALOBJ.uiElements.mainJackpot2)
                                .find(".pisoglentis." + k)
                                .closest(".jackpot-container")
                                .attr("title", "")
                                .tooltip({ html: true });
                        }
                    }
                }
            }, 6000);
        }
    }
};

$(document).ready(function() {


    var startingCategory = "SLOTS";
    if ($.urlQueryParameter("category") != null) {
        startingCategory = $.urlQueryParameter("category").toUpperCase();
    }
    // Cookies
    GLOBALOBJ.methods.acceptCookiesCheck();
    // Category
    GLOBALOBJ.methods.changeToCategory(startingCategory);
    // Banners
    GLOBALOBJ.methods.createGameBanners();
    // Jackpot
    GLOBALOBJ.methods.createJackpot();
    GLOBALOBJ.methods.createJackpot2();
});
