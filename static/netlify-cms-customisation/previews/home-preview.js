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

        h(
          "div",
          { className: "row" },

          h(
            "div",
            { className: "col-6" },
            h("h2", {}, entry.getIn(["data", "secureTitle"])),

            h("p", {}, entry.getIn(["data", "secureText"]))
          ),

          h(
            "div",
            { className: "col-6" },

            h("img", { src: entry.getIn(["data", "secureImgFullHd"]) })
          )
        )
      ),

      h(
        "section",
        {},

        h(
          "div",
          { className: "row" },

          h(
            "div",
            { className: "col-6" },

            h("img", { src: entry.getIn(["data", "coverFinancialsImgFullHd"]) })
          ),

          h(
            "div",
            { className: "col-6" },
            h("h2", {}, entry.getIn(["data", "coverFinancialsTitle"])),

            h("p", {}, entry.getIn(["data", "coverFinancialsText"]))
          )
        )
      ),

      h(
        "section",
        {},

        h(
          "div",
          { className: "row align-center flex-col" },

          h(
            "div",
            { className: "col-6" },
            h(
              "h2",
              { className: "text-center" },
              entry.getIn(["data", "benchmarkTitle"])
            ),

            h(
              "p",
              { className: "text-center" },
              entry.getIn(["data", "benchmarkText"])
            )
          ),

          h(
            "div",
            { className: "col-7" },

            h("img", { src: entry.getIn(["data", "benchmarkImgFullHd"]) })
          )
        )
      ),

      h(
        "section",
        {},

        h(
          "h2",
          { className: "text-center" },
          entry.getIn(["data", "feedbackTitle"])
        ),

        h(
          "div",
          { className: "feedbacks" },

          widgetsFor("feedbacks").map(function (item) {
            return h(
              "div",
              { className: "feedbacks__item" },

              h(
                "div",
                { className: "feedback" },

                h("p", {}, `${item.getIn(["data", "feedbackText"])}`),
                h("h6", {}, `${item.getIn(["data", "feedbackName"])}`)
              )
            );
          })
        )
      ),

      h(
        "section",
        {},

        h(
          "div",
          { className: "row align-center flex-col" },

          h(
            "div",
            { className: "col-6" },
            h(
              "h2",
              { className: "text-center" },
              entry.getIn(["data", "historyTitle"])
            ),

            h(
              "p",
              { className: "text-center" },
              entry.getIn(["data", "historyText"])
            )
          ),

          h(
            "div",
            { className: "col-7" },

            h("video", {
              src: entry.getIn(["data", "historyVideo"]),
              poster: entry.getIn(["data", "historyVideoPoster"]),
            })
          )
        )
      ),

      h(
        "section",
        {},

        h("h2", {}, entry.getIn(["data", "faqTitle"])),

        h(
          "div",
          { className: "row" },

          h(
            "div",
            { className: "col-6" },

            widgetsFor("faqFirstColumn").map(function (item) {
              return h(
                "div",
                { className: "faq-item" },
                h("h4", {}, item.getIn(["data", "question"])),

                h("p", {}, item.getIn(["data", "answer"]))
              );
            })
          ),

          h(
            "div",
            { className: "col-6" },

            widgetsFor("faqSecondColumn").map(function (item) {
              return h(
                "div",
                { className: "faq-item" },
                h("h4", {}, item.getIn(["data", "question"])),

                h("p", {}, item.getIn(["data", "answer"]))
              );
            })
          )
        )
      ),

      h(
        "section",
        {},

        h(
          "div",
          { className: "row align-center" },

          h(
            "div",
            { className: "col-6" },

            h("img", { src: entry.getIn(["data", "pricingImgFullHd"]) })
          ),

          h(
            "div",
            { className: "col-6" },
            h("h2", {}, entry.getIn(["data", "pricingTitle"])),

            h("p", {}, entry.getIn(["data", "pricingText"]))
          )
        )
      ),

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
