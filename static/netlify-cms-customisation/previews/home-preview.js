const HomePreview = createClass({
  render: function () {
    const { entry, getAsset, widgetsFor } = this.props;

    return h(
      "div",
      { className: "container" },
      h(
        "div",
        { className: "row align-center" },
        h(
          "div",
          { className: "col-7" },
          h("h1", {}, entry.getIn(["data", "title"])),
          h("p", {}, entry.getIn(["data", "heroText"])),

          h(
            "div",
            { className: "home-overview" },

            widgetsFor("homeOverview").map(function (item) {
              return h(
                "div",
                { className: "home-overview__item" },
                h("h6", {}, `${item.getIn(["data", "title"])}`),
                h("p", {}, `${item.getIn(["data", "text"])}`)
              );
            })
          )
        ),

        h(
          "div",
          { className: "col-5" },
          h("img", { src: entry.getIn(["data", "heroImgFullHd"]) })
        )
      ),

      h(
        "section",
        {},

        h(
          "h2",
          { className: "text-center" },
          entry.getIn(["data", "financialsTitle"])
        ),

        h(
          "div",
          { className: "financial-institutes" },

          widgetsFor("financialInstitutes").map(function (item) {
            return h(
              "figure",
              { className: "financial-institutes__item" },

              h("img", { src: `${item.getIn(["data", "imageUrlDesk"])}` })
            );
          })
        )
      ),

      h(
        "section",
        {},

        h(
          "h2",
          { className: "text-center" },
          entry.getIn(["data", "assetsTitle"])
        ),

        h(
          "p",
          { className: "text-center" },
          entry.getIn(["data", "assetsText"])
        ),

        h("img", { src: entry.getIn(["data", "assetsImgDesktop"]) })
      ),

      h(
        "section",
        {},

        h("h2", {}, entry.getIn(["data", "secureTitle"])),

        h("p", {}, entry.getIn(["data", "secureText"]))
      )

      // h(
      //   "div",
      //   { className: "row" },
      //
      //   )
      // )
    );
  },
});

CMS.registerPreviewTemplate("home", HomePreview);
