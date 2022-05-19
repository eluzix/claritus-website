const AboutPreview = createClass({
  render: function () {
    const { entry, widgetFor, widgetsFor } = this.props;

    return h(
      "div",
      { className: "container" },

      h(
        "section",
        {},

        h(
          "div",
          { className: "row align-center" },
          h(
            "div",
            { className: "col-5" },
            h("h1", {}, entry.getIn(["data", "introTitle"])),
            h("p", {}, entry.getIn(["data", "introDescription"]))
          ),

          h(
            "div",
            { className: "col-7" },
            h("img", { src: entry.getIn(["data", "introImgDesktop"]) })
          )
        )
      ),

      h(
        "section",
        {},

        h(
          "div",
          { className: "row justify-center" },
          h(
            "div",
            { className: "col-8" },

            h("div", { className: "about-content" }, widgetFor("body"))
          )
        )
      ),

      h(
        "section",
        {},

        h(
          "h2",
          { className: "text-center" },
          entry.getIn(["data", "teamTitle"])
        ),

        h("div", { className: "team-text" }, entry.getIn(["data", "teamText"])),

        h(
          "div",
          { className: "team" },

          widgetsFor("teamMembers").map(function (item) {
            return h(
              "div",
              { className: "teammate" },

              h("img", { src: `${item.getIn(["data", "photo"])}` }),
              h("h5", {}, item.getIn(["data", "name"])),
              h("p", {}, item.getIn(["data", "position"]))
            );
          })
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

            h(
              "p",
              { className: "about-content" },
              entry.getIn(["data", "ourStoryFirstCol"])
            )
          ),

          h(
            "div",
            { className: "col-6" },

            h(
              "p",
              { className: "about-content" },
              entry.getIn(["data", "ourStorySecondCol"])
            )
          )
        )
      )
    );
  },
});

const SecurityPreview = createClass({
  render: function () {
    const { entry, widgetFor, widgetsFor } = this.props;

    return h(
      "div",
      { className: "container" },

      h(
        "section",
        {},

        h(
          "div",
          { className: "row align-center" },
          h(
            "div",
            { className: "col-5" },
            h("h1", {}, entry.getIn(["data", "title"])),
            h("p", {}, entry.getIn(["data", "description"]))
          ),

          h(
            "div",
            { className: "col-7" },
            h("img", { src: entry.getIn(["data", "heroImgFullHd"]) })
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

            h("img", { src: entry.getIn(["data", "protectedImg"]) })
          ),

          h(
            "div",
            { className: "col-6" },
            h("h2", {}, entry.getIn(["data", "protectedTitle"])),

            h("p", {}, entry.getIn(["data", "protectedText"]))
          )
        )
      )
    );
  },
});

CMS.registerPreviewTemplate("about-us", AboutPreview);
CMS.registerPreviewTemplate("security", SecurityPreview);
