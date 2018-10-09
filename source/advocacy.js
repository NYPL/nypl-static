let javascriptLoader = {
  isFunction: function(input) {
    return 'function' === typeof input
  },

  initialize: function () {
    this.loadOptInMonster()

    this.defer('ga_cross_domain', this.loadCrossDomain, function () {
      return javascriptLoader.isFunction(window['ga'])
    })
  },

  getLoadedJquery: function() {
    if (this.isFunction(window['jQuery'])) {
      return window['jQuery']
    }

    if (this.isFunction(window['optimizely']['$'])) {
      return window['optimizely']['$']
    }

    return null
  },

  defer: function (name, runAfterTrue, testForTrue) {
    if (!this.isFunction(runAfterTrue)) throw 'runAfterTrue is not a function'
    if (!this.isFunction(testForTrue)) throw 'runUntilTrue is not a function'

    if (testForTrue()) {
      runAfterTrue()
    } else {
      setTimeout(function() { javascriptLoader.defer(name, runAfterTrue, testForTrue) }, 50);
    }
  },

  loadOptInMonster: function () {
    let optInMonsterLoader = {
      initialize: function () {
        this.addScript()

        javascriptLoader.defer('accessibility', this.addOptInMonsterAccessibility, function () {
          return javascriptLoader.isFunction(javascriptLoader.getLoadedJquery())
        })
      },

      addScript: function () {
        let script = document.createElement('script')

        script.setAttribute('type', 'text/javascript')
        script.setAttribute('src', 'https://a.optmnstr.com/app/js/api.min.js')
        script.setAttribute('data-account', '1044')
        script.setAttribute('data-user', '12468')
        script.setAttribute('async', '')

        document.body.appendChild(script)
      },

      addOptInMonsterAccessibility: function () {
        let loadedJquery = javascriptLoader.getLoadedJquery()

        if (!loadedJquery) {
          console.error('Unable to add OptinMonster accessibility (no jQuery found)')
          return false
        }

        document.addEventListener('om.Campaign.load', function (event) {
          let campaignDiv = loadedJquery('#om-' + event.detail.Campaign.id)

          campaignDiv
            .attr('aria-label', 'Promotional')
            .attr('role', 'complementary')
            .find('.' + event.detail.Campaign.ns + '-CloseButton').attr('aria-label', 'Close Promotional region')

          campaignDiv
            .find('button').removeAttr('aria-live')
        })

        document.addEventListener('om.Campaign.close', function (event) {
          loadedJquery('#om-' + event.detail.Campaign.id).attr('aria-hidden', 'true')
        })
      },
    }

    optInMonsterLoader.initialize()
  },

  loadCrossDomain: function () {
    ga('require', 'linker')
    ga('linker:autoLink', ['convio.net'])
    ga('set', 'anonymizeIp', !0)
  }
}

javascriptLoader.initialize()
