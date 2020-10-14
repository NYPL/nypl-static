let javascriptLoader = {
  isFunction: function (input) {
    return 'function' === typeof input
  },

  initialize: function () {
    this.loadOptInMonster()

    this.defer('ga_cross_domain', this.loadCrossDomain, function () {
      return javascriptLoader.isFunction(window['ga'])
    })
  },

  defer: function (name, runAfterTrue, testForTrue) {
    if (!this.isFunction(runAfterTrue)) throw 'runAfterTrue is not a function'
    if (!this.isFunction(testForTrue)) throw 'runUntilTrue is not a function'

    if (testForTrue()) {
      runAfterTrue()
    } else {
      setTimeout(function () { javascriptLoader.defer(name, runAfterTrue, testForTrue) }, 50);
    }
  },

  loadOptInMonster: function () {
    let optInMonsterLoader = {
      initialize: function () {
        this.addScript(),
          javascriptLoader.defer("accessibility", this.addOptInMonsterAccessibility, function () {
            return !0;
          });
      },

      addScript: function () {
        let script = document.createElement("script");

        script.setAttribute("type", "text/javascript"),
        script.setAttribute("src", "https://a.optmnstr.com/app/js/api.min.js"),
        script.setAttribute("data-account", "1044"),
        script.setAttribute("data-user", "12468"),
        script.setAttribute("async", ""),

        document.body.appendChild(script);
      },

      addOptInMonsterAccessibility: function () {

        document.addEventListener("om.Campaign.load", function (event) {
          let campaignDiv = document.querySelector("#om-" + event.detail.Campaign.id);
          campaignDiv.setAttribute("aria-label", "Promotional"),
          campaignDiv.setAttribute("role", "complementary"),
          campaignDiv.querySelector("." + event.detail.Campaign.ns + "-CloseButton").setAttribute("aria-label", "Close Promotional region"),
          campaignDiv.querySelector("button").removeAttribute("aria-live");
        }),

        document.addEventListener("om.Campaign.close", function (event) {
          let campaignDiv = document.querySelector("#om-" + event.detail.Campaign.id);
          campaignDiv.setAttribute("aria-hidden", "true"), (campaignDiv.style.display = "none");
        });

      },
    }

    optInMonsterLoader.initialize()
  },

  loadCrossDomain: function () {
    ga("require", "linker"),
    ga("linker:autoLink", ["convio.net"]),
    ga("set", "anonymizeIp", !0);
  },
};
javascriptLoader.initialize();
