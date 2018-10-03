let javascriptLoader = {
  initialize: function() {
    this.loadOptInMonster()

    this.loadCrossDomain()
  },

  loadOptInMonster: function() {
    let optInMonsterLoader = {
      initialize: function() {
        this.addScript()

        this.addOptInMonsterAccessibility()
      },

      addScript: function() {
        let script = document.createElement('script')

        script.setAttribute('type', 'text/javascript')
        script.setAttribute('src', 'https://a.optmnstr.com/app/js/api.min.js')
        script.setAttribute('data-account', '1044')
        script.setAttribute('data-user', '12468')
        script.setAttribute('async', '')

        document.body.appendChild(script)
      },

      addOptInMonsterAccessibility: function() {
        if (window.jQuery) {
          document.addEventListener('om.Campaign.load', function(event) {
            let campaignDiv = jQuery('#om-' + event.detail.Campaign.id)

            campaignDiv
              .attr('aria-label', 'Promotional')
              .attr('role', 'complementary')
              .find('.boston-CloseButton').attr('aria-label', 'Close Promotional region')

            campaignDiv
              .find('button').removeAttr('aria-live')
          })

          document.addEventListener('om.Campaign.close', function(event) {
            jQuery('#om-' + event.detail.Campaign.id).attr('aria-hidden', 'true')
          })
        }
      },
    }

    optInMonsterLoader.initialize()
  },

  loadCrossDomain: function() {
    ga('require', 'linker')
    ga('linker:autoLink', ['convio.net'])
    ga('set', 'anonymizeIp', !0)
  }
}

javascriptLoader.initialize()
